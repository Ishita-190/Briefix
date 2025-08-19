import type { RequestHandler } from "express";
import { z } from "zod";
import {
  getKnowledgeBaseAnswer,
  classifyQuery,
  getQueryIntent,
  ENHANCED_LEGAL_GUIDANCE,
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
import { loadCorpusData, type CorpusItem } from "../lib/corpus-data";


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
  const corpus = loadCorpusData();
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .filter((w) => w.length > 1);

  console.log(`[Search] Query terms: ${JSON.stringify(terms)}`);

  const scored = corpus.map((item) => ({
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

    // Use intelligent query understanding for better responses
    const queryIntent = getQueryIntent(query);
    const specificGuidance =
      ENHANCED_LEGAL_GUIDANCE[
        queryIntent.specificGuidance as keyof typeof ENHANCED_LEGAL_GUIDANCE
      ];

    return res.status(200).json({
      answer: rewriteForLevel(specificGuidance, level),
      sources: [
        {
          title: `${queryIntent.intent === "emergency" ? "Emergency " : ""}Legal Guidance`,
          type: "guidance",
          category: queryIntent.intent,
        },
      ],
      category: queryIntent.intent,
      urgency: queryIntent.urgency,
      needsLawyer: queryIntent.needsLawyer,
    });
  }

  const matches = topMatches(query, 3);
  if (!matches.length) {
    // Use intelligent query understanding for better responses
    const queryIntent = getQueryIntent(query);
    const specificGuidance =
      ENHANCED_LEGAL_GUIDANCE[
        queryIntent.specificGuidance as keyof typeof ENHANCED_LEGAL_GUIDANCE
      ];

    // For very specific questions, provide more targeted guidance
    let contextualAnswer = specificGuidance;

    if (queryIntent.intent === "general") {
      // Add context about what we searched and alternative suggestions
      contextualAnswer = `I searched our legal database for information about "${query}" but couldn't find specific information in the Indian Penal Code (which covers criminal law).

**This might be because:**
- Your question relates to civil law, not criminal law
- It involves specialized legal areas
- It requires interpretation of specific facts

${specificGuidance}

**For your specific question about "${query}", consider:**
- Consulting a lawyer specializing in the relevant area
- Checking if it's a civil matter (contracts, property, business)
- Looking into administrative or regulatory requirements
- Contacting relevant government agencies if applicable`;
    }

    return res.status(200).json({
      answer: rewriteForLevel(contextualAnswer, level),
      sources: [
        {
          title: `${queryIntent.intent === "emergency" ? "Emergency " : ""}Legal Guidance`,
          type: "guidance",
          category: queryIntent.intent,
        },
      ],
      category: queryIntent.intent,
      urgency: queryIntent.urgency,
      needsLawyer: queryIntent.needsLawyer,
    });
  }

  // Take only the best match for cleaner responses
  const bestMatch = matches[0];

  // Make sure the match is actually relevant
  if (bestMatch.score < 1) {
    // Use intelligent query understanding for low-relevance matches
    const queryIntent = getQueryIntent(query);
    const specificGuidance =
      ENHANCED_LEGAL_GUIDANCE[
        queryIntent.specificGuidance as keyof typeof ENHANCED_LEGAL_GUIDANCE
      ];

    const contextualAnswer = `I found some related information in the Indian Penal Code, but it doesn't directly answer your question about "${query}".

**This suggests your question might involve:**
- Civil law matters (not covered by the Indian Penal Code)
- Specialized legal areas requiring expert interpretation
- Procedural or administrative issues
- Constitutional or regulatory matters

${specificGuidance}

**For your specific situation, I recommend:**
- Consulting a lawyer familiar with the relevant legal area
- Checking if this involves civil court procedures
- Researching relevant state or federal regulations
- Contacting appropriate government agencies if applicable`;

    return res.status(200).json({
      answer: rewriteForLevel(contextualAnswer, level),
      sources: [
        {
          title: "Legal Guidance - No Direct Match",
          type: "guidance",
          category: queryIntent.intent,
        },
      ],
      category: queryIntent.intent,
      urgency: queryIntent.urgency,
      needsLawyer: queryIntent.needsLawyer,
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
