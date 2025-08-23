import { z } from "zod";
import {
  getKnowledgeBaseAnswer,
  getQueryIntent,
  ENHANCED_LEGAL_GUIDANCE,
} from "../lib/legal-knowledge";
import {
  getConstitutionalReferences,
  formatConstitutionalReferences,
  formatStatutoryBasis,
  getStatutoryBasis,
} from "../lib/constitutional-law";
<<<<<<< HEAD
import {
  simplifyForAge,
  addExamples,
  needsExtraSimplification,
} from "../lib/age-simplification";
import { loadCorpusData, type CorpusItem } from "../lib/corpus-data";
import {
  formatLegalResponse,
  formatEmergencyResponse,
} from "../lib/ai-formatter";

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

  const scored = corpus
    .map((item) => ({
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
=======
import { simplifyForAge, addExamples } from "../lib/age-simplification";
import { loadCorpusData } from "../lib/corpus-data";
>>>>>>> refs/remotes/origin/main

// --- Validation schema ---
const BodySchema = z.object({
  query: z.string().min(1),
  level: z.enum(["12-year-old", "15-year-old", "lawyer"]).optional(),
});

// --- Netlify handler ---
export async function handler(event: any) {
  try {
    const body = JSON.parse(event.body || "{}");
    const parsed = BodySchema.safeParse(body);

    if (!parsed.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid request body" }),
      };
    }

<<<<<<< HEAD
    // Get the base answer from existing logic
    const baseAnswer = rewriteForLevel(
      knowledgeAnswer.answer,
      level,
      knowledgeAnswer.category,
      query, // Pass query to get constitutional references
    );

    // Format with AI for structured response
    let formattedAnswer: string;
    try {
      if (knowledgeAnswer.urgency === "high") {
        formattedAnswer = await formatEmergencyResponse(
          baseAnswer,
          query,
          level,
        );
      } else {
        formattedAnswer = await formatLegalResponse(
          baseAnswer,
          query,
          level,
          knowledgeAnswer.category,
          enhancedSources,
        );
      }
    } catch (error) {
      console.error(
        "[Answer API] AI formatting failed, using base answer:",
        error,
      );
      formattedAnswer = baseAnswer;
    }

    return res.json({
      answer: formattedAnswer,
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
  const corpus = loadCorpusData();
  console.log(`[Answer API] Searching IPC corpus (size: ${corpus.length})`);

  if (!corpus.length) {
    console.error("[Answer API] Knowledge base is empty - check ipc.json file");

    // Use intelligent query understanding for better responses
    const queryIntent = getQueryIntent(query);
    const specificGuidance =
      ENHANCED_LEGAL_GUIDANCE[
        queryIntent.specificGuidance as keyof typeof ENHANCED_LEGAL_GUIDANCE
      ];

    // Get base guidance answer
    const baseGuidance = rewriteForLevel(specificGuidance, level);

    // Format with AI
    let formattedGuidance: string;
    try {
      if (queryIntent.urgency === "high") {
        formattedGuidance = await formatEmergencyResponse(
          baseGuidance,
          query,
          level,
        );
      } else {
        formattedGuidance = await formatLegalResponse(
          baseGuidance,
          query,
          level,
          queryIntent.intent,
        );
      }
    } catch (error) {
      console.error(
        "[Answer API] AI formatting failed for guidance, using base:",
        error,
      );
      formattedGuidance = baseGuidance;
    }

    return res.status(200).json({
      answer: formattedGuidance,
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
=======
    const { query, level = "15-year-old" } = parsed.data;
    console.log(`[Answer API] Query: "${query}", Level: ${level}`);

    if (query.trim().length < 3) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          answer:
            "Please provide a more specific question about legal concepts or procedures.",
          sources: [],
        }),
      };
>>>>>>> refs/remotes/origin/main
    }

    // --- Knowledge base check ---
    const knowledgeAnswer = getKnowledgeBaseAnswer(query);
    if (knowledgeAnswer) {
      const hasConstitutionalRefs = knowledgeAnswer.constitutionalReferences;
      let enhancedSources = knowledgeAnswer.sources;

      if (hasConstitutionalRefs) {
        enhancedSources = [
          ...knowledgeAnswer.sources,
          {
            title:
              "Indian Constitution - Fundamental Rights & Directive Principles",
            type: "constitutional" as const,
          },
        ];
      }

<<<<<<< HEAD
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

    // Get contextual answer
    const baseContextual = rewriteForLevel(contextualAnswer, level);

    // Format with AI
    let formattedContextual: string;
    try {
      if (queryIntent.urgency === "high") {
        formattedContextual = await formatEmergencyResponse(
          baseContextual,
          query,
          level,
        );
      } else {
        formattedContextual = await formatLegalResponse(
          baseContextual,
          query,
          level,
          queryIntent.intent,
        );
      }
    } catch (error) {
      console.error(
        "[Answer API] AI formatting failed for contextual, using base:",
        error,
      );
      formattedContextual = baseContextual;
    }

    return res.status(200).json({
      answer: formattedContextual,
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
  const baseIPCAnswer = rewriteForLevel(
    cleanText,
    level,
    "Indian Penal Code",
    query,
  );

  // Format IPC answer with AI
  let formattedIPCAnswer: string;
  try {
    formattedIPCAnswer = await formatLegalResponse(
      baseIPCAnswer,
      query,
      level,
      "Indian Penal Code",
      [bestMatch.item],
    );
  } catch (error) {
    console.error(
      "[Answer API] AI formatting failed for IPC, using base:",
      error,
    );
    formattedIPCAnswer = baseIPCAnswer;
  }

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
=======
      return {
        statusCode: 200,
        body: JSON.stringify({
          answer: knowledgeAnswer.answer, // can wrap with rewriteForLevel() if you want
          sources: enhancedSources,
          category: knowledgeAnswer.category,
          urgency: knowledgeAnswer.urgency,
          constitutionalBasis: hasConstitutionalRefs,
        }),
      };
>>>>>>> refs/remotes/origin/main
    }

<<<<<<< HEAD
  res.json({
    answer: formattedIPCAnswer,
    sources,
    category: "Indian Penal Code",
    urgency: "medium",
  });
};
=======
    // --- IPC Corpus fallback ---
    const corpus = loadCorpusData();
    console.log(`[Answer API] Searching IPC corpus (size: ${corpus.length})`);

    if (!corpus.length) {
      const queryIntent = getQueryIntent(query);
      const specificGuidance =
        ENHANCED_LEGAL_GUIDANCE[
          queryIntent.specificGuidance as keyof typeof ENHANCED_LEGAL_GUIDANCE
        ];

      return {
        statusCode: 200,
        body: JSON.stringify({
          answer: specificGuidance,
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
        }),
      };
    }

    // TODO: add your IPC matching + summarization logic here
    // just make sure to return { statusCode, body: JSON.stringify(...) }

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: "No direct match found, please try again.",
        sources: [],
      }),
    };
  } catch (err) {
    console.error("Error in answer function:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
>>>>>>> refs/remotes/origin/main
