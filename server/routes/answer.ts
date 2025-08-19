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
import { simplifyForAge, addExamples } from "../lib/age-simplification";
import { loadCorpusData } from "../lib/corpus-data";

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
    }

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
