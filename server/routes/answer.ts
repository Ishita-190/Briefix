import type { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import { z } from "zod";
import {
  getKnowledgeBaseAnswer,
  classifyQuery,
  GENERAL_LEGAL_GUIDANCE,
} from "../lib/legal-knowledge";
import {
  getConstitutionalReferences,
  formatConstitutionalReferences,
  formatStatutoryBasis,
  getStatutoryBasis,
} from "../lib/constitutional-law";
import {
  simplifyForAge,
  addExamples,
  needsExtraSimplification,
} from "../lib/age-simplification";

// Very small in-memory index built from public/ipc.json
// Expected schema: Array<{ id?: string; title?: string; section?: string; text: string }>

type CorpusItem = {
  id?: string;
  title?: string;
  section?: string;
  text: string;
};

let CORPUS: CorpusItem[] = [];

function loadCorpusOnce() {
  if (CORPUS.length) return;
  try {
    const p = path.join(process.cwd(), "public", "ipc.json");
    const raw = fs.readFileSync(p, "utf8");
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      CORPUS = data
        .map((d) => ({
          id: d.Section ? `Section ${d.Section}` : d.id,
          title: d.section_title || d.title,
          section: d.chapter
            ? `Chapter ${d.chapter}: ${d.chapter_title}`
            : d.section,
          text: String(d.section_desc || d.text || "")
            .replace(/\s+/g, " ")
            .trim(),
        }))
        .filter((d) => d.text);
    } else if (data && typeof data === "object" && Array.isArray(data.items)) {
      CORPUS = data.items
        .map((d: any) => ({
          id: d.Section ? `Section ${d.Section}` : d.id,
          title: d.section_title || d.title,
          section: d.chapter
            ? `Chapter ${d.chapter}: ${d.chapter_title}`
            : d.section,
          text: String(d.section_desc || d.text || "")
            .replace(/\s+/g, " ")
            .trim(),
        }))
        .filter((d: CorpusItem) => d.text);
    }
  } catch (e) {
    console.error("Failed to load public/ipc.json:", e);
    CORPUS = [];
  }
}

function score(text: string, terms: string[]): number {
  const hay = text.toLowerCase();
  let s = 0;
  for (const t of terms) {
    if (!t) continue;
    // term frequency weighting
    const re = new RegExp(`\\b${escapeRegExp(t)}\\b`, "g");
    const matches = hay.match(re);
    s += matches ? matches.length * 2 : 0; // Increase weight for exact matches

    // Partial matches get lower score
    if (hay.includes(t)) {
      s += 0.5;
    }
  }
  // Bonus for shorter, more focused passages
  if (s > 0) {
    s += Math.min(2, 300 / Math.max(50, text.length));
  }
  return s;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function topMatches(query: string, k = 3) {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .filter((w) => w.length > 1);

  console.log(`[Search] Query terms: ${JSON.stringify(terms)}`);

  const scored = CORPUS.map((item) => ({
    item,
    score: score(item.text, terms),
  }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  console.log(`[Search] Found ${scored.length} matches`);
  scored.forEach((match, i) => {
    console.log(
      `[Search] Match ${i + 1}: ID=${match.item.id}, Score=${match.score.toFixed(2)}, Title=${match.item.title}`,
    );
  });

  return scored;
}

function summarize(text: string, maxSentences = 2) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => s.length > 10) // Filter out very short sentences
    .filter((s) => !s.toLowerCase().includes("repealed")) // Filter out repealed sections
    .filter((s) => s.length < 500); // Avoid overly long sentences
  return sentences.slice(0, maxSentences).join(" ");
}

function rewriteForLevel(
  text: string,
  level: string,
  category?: string,
  query?: string,
) {
  // For knowledge base content, use advanced simplification system
  if (text.includes("**") || text.includes("\n")) {
    // This is formatted knowledge base content
    let content = text;

    // Add constitutional references if relevant
    if (query) {
      const constitutionalRefs = getConstitutionalReferences(query);
      const statutoryBasis = getStatutoryBasis(query);

      if (constitutionalRefs.length > 0) {
        content += formatConstitutionalReferences(constitutionalRefs);
      }

      if (statutoryBasis.length > 0) {
        content += formatStatutoryBasis(statutoryBasis);
      }
    }

    if (level === "12-year-old" || level === "15-year-old") {
      let simplified = simplifyForAge(content, level);

      // Add relevant examples for the topic
      if (category) {
        simplified = addExamples(simplified, level, category.toLowerCase());
      }

      return simplified;
    }
    // lawyer level - return full content with constitutional references
    return (
      content + "\n\n(Professional legal reference with constitutional basis)"
    );
  }

  // For IPC content, clean up as before
  let cleaned = text
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b(Repealed by[^.]*\.)\s*/g, "") // Remove repeated "Repealed by" text
    .replace(/\b(S\.\s*\d+\s*and\s*Sch\.)\s*/g, "") // Remove schedule references
    .replace(/^[^A-Z]*/, "") // Remove incomplete sentences at the start
    .replace(/[^.!?]*$/, ""); // Remove incomplete sentences at the end

  // Ensure we have at least one complete sentence
  if (!cleaned || cleaned.length < 20) {
    cleaned = text.substring(0, 200) + (text.length > 200 ? "..." : "");
  }

  const base = summarize(
    cleaned,
    level === "lawyer" ? 2 : 1, // Reduce to avoid very long responses
  );

  if (level === "12-year-old") {
    return (
      base
        .replace(/shall be punished/gi, "can be punished")
        .replace(/imprisonment/gi, "jail time")
        .replace(/offender/gi, "person who breaks the law")
        .replace(/voluntarily/gi, "on purpose") +
      " (From Indian Penal Code - simplified)"
    );
  }
  if (level === "15-year-old") {
    return base + " (From Indian Penal Code)";
  }
  // lawyer
  return base + " (IPC Reference)";
}

const BodySchema = z.object({
  query: z.string().min(1),
  level: z.enum(["12-year-old", "15-year-old", "lawyer"]).optional(),
});

export const handleAnswer: RequestHandler = (req, res) => {
  const parsed = BodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  const { query, level = "15-year-old" } = parsed.data;

  console.log(`[Answer API] Query: "${query}", Level: ${level}`);

  // Filter out very short or generic queries
  if (query.trim().length < 3) {
    return res.status(200).json({
      answer:
        "Please provide a more specific question about legal concepts or procedures.",
      sources: [],
    });
  }

  // First, try the comprehensive knowledge base
  const knowledgeAnswer = getKnowledgeBaseAnswer(query);
  if (knowledgeAnswer) {
    console.log(
      `[Answer API] Found knowledge base answer for category: ${knowledgeAnswer.category}`,
    );

    // Check if this answer should include constitutional references
    const hasConstitutionalRefs = knowledgeAnswer.constitutionalReferences;
    let enhancedSources = knowledgeAnswer.sources;

    if (hasConstitutionalRefs) {
      // Add constitutional reference source
      enhancedSources = [
        ...knowledgeAnswer.sources,
        {
          title:
            "Indian Constitution - Fundamental Rights & Directive Principles",
          type: "constitutional" as const,
        },
      ];
    }

    return res.json({
      answer: rewriteForLevel(
        knowledgeAnswer.answer,
        level,
        knowledgeAnswer.category,
        query, // Pass query to get constitutional references
      ),
      sources: enhancedSources.map((source) => ({
        title: source.title,
        type: source.type,
        category: knowledgeAnswer.category,
        urgency: knowledgeAnswer.urgency,
      })),
      category: knowledgeAnswer.category,
      urgency: knowledgeAnswer.urgency,
      constitutionalBasis: hasConstitutionalRefs,
    });
  }

  // If not found in knowledge base, try IPC data
  loadCorpusOnce();
  console.log(`[Answer API] Searching IPC corpus (size: ${CORPUS.length})`);

  if (!CORPUS.length) {
    console.error("[Answer API] Knowledge base is empty - check ipc.json file");
    // Provide general legal guidance as fallback
    const fallbackAnswer = `I don't have access to the Indian Penal Code database right now, but I can provide general legal guidance.

${GENERAL_LEGAL_GUIDANCE.generalAdvice}

**For your specific question, I recommend:**
- Consulting with a qualified attorney
- Contacting your local bar association for referrals
- Seeking legal aid if you qualify for free assistance`;

    return res.status(200).json({
      answer: rewriteForLevel(fallbackAnswer, level),
      sources: [
        {
          title: "General Legal Guidance",
          type: "guidance",
          category: "General",
        },
      ],
      category: "General Guidance",
    });
  }

  const matches = topMatches(query, 3);
  if (!matches.length) {
    // Provide general legal guidance as fallback
    const queryType = classifyQuery(query);
    let fallbackAnswer = "";

    if (
      query.toLowerCase().includes("lawyer") ||
      query.toLowerCase().includes("attorney")
    ) {
      fallbackAnswer = GENERAL_LEGAL_GUIDANCE.findLawyer;
    } else {
      fallbackAnswer = `I couldn't find specific information about "${query}" in the Indian Penal Code (criminal law database). 

${GENERAL_LEGAL_GUIDANCE.generalAdvice}

**For your specific question, I recommend:**
- Consulting with a qualified attorney
- Contacting your local bar association for referrals
- Seeking legal aid if you qualify for free assistance`;
    }

    return res.status(200).json({
      answer: rewriteForLevel(fallbackAnswer, level),
      sources: [
        {
          title: "General Legal Guidance",
          type: "guidance",
          category: "General",
        },
      ],
      category: "General Guidance",
    });
  }

  // Take only the best match for cleaner responses
  const bestMatch = matches[0];

  // Make sure the match is actually relevant
  if (bestMatch.score < 1) {
    return res.status(200).json({
      answer: rewriteForLevel(
        `I couldn't find a specific section in the Indian Penal Code that directly answers your question about "${query}". 

The Indian Penal Code primarily covers criminal offenses. For civil matters, contracts, or legal procedures, you may need guidance from other legal sources.

**I recommend:**
- Consulting with a qualified attorney
- Contacting your local bar association for referrals
- Seeking legal aid if you qualify for assistance`,
        level,
      ),
      sources: [
        {
          title: "General Legal Guidance",
          type: "guidance",
          category: "General",
        },
      ],
      category: "General Guidance",
    });
  }

  const cleanText = summarize(bestMatch.item.text, level === "lawyer" ? 3 : 2);
  const answer = rewriteForLevel(cleanText, level, "Indian Penal Code", query);
  const sources = [
    {
      id: bestMatch.item.id,
      title: bestMatch.item.title,
      section: bestMatch.item.section,
      score: Math.round(bestMatch.score * 1000) / 1000,
    },
  ];

  // Check if query relates to constitutional law topics
  const constitutionalRefs = getConstitutionalReferences(query);
  if (constitutionalRefs.length > 0) {
    sources.push({
      id: "constitutional-ref",
      title: "Indian Constitution - Related Provisions",
      section: "Fundamental Rights & Directive Principles",
      score: 1.0,
    });
  }

  // Add additional sources only if they're significantly relevant
  matches.slice(1).forEach((match) => {
    if (match.score > bestMatch.score * 0.7) {
      // Only if 70% as relevant as best match
      sources.push({
        id: match.item.id,
        title: match.item.title,
        section: match.item.section,
        score: Math.round(match.score * 1000) / 1000,
      });
    }
  });

  res.json({
    answer,
    sources,
    category: "Indian Penal Code",
    urgency: "medium",
  });
};
