import type { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import { z } from "zod";

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
          section: d.chapter ? `Chapter ${d.chapter}: ${d.chapter_title}` : d.section,
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
          section: d.chapter ? `Chapter ${d.chapter}: ${d.chapter_title}` : d.section,
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
    s += matches ? matches.length : 0;
  }
  // small bonus for shorter passages
  return s > 0 ? s + Math.min(1, 200 / Math.max(20, text.length)) : 0;
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
    console.log(`[Search] Match ${i + 1}: ID=${match.item.id}, Score=${match.score.toFixed(2)}, Title=${match.item.title}`);
  });

  return scored;
}

function summarize(text: string, maxSentences = 2) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => s.length > 10); // Filter out very short sentences
  return sentences.slice(0, maxSentences).join(" ");
}

function rewriteForLevel(text: string, level: string) {
  // Clean up the text first
  const cleaned = text
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b(Repealed by[^.]*\.)\s*/g, "") // Remove repeated "Repealed by" text
    .replace(/\b(S\.\s*\d+\s*and\s*Sch\.)\s*/g, ""); // Remove schedule references

  const base = summarize(
    cleaned,
    level === "lawyer" ? 3 : level === "15-year-old" ? 2 : 2,
  );

  if (level === "12-year-old") {
    // simpler words and shorter lines
    return (
      base
        .replace(/shall be punished/gi, "can be punished")
        .replace(/imprisonment/gi, "jail time")
        .replace(/offender/gi, "person who breaks the law")
        .replace(/voluntarily/gi, "on purpose") +
      " (This is explained in simple terms)"
    );
  }
  if (level === "15-year-old") {
    return base + " (Key legal concepts explained for practical understanding)";
  }
  // lawyer
  return base + " (Legal reference from Indian Penal Code)";
}

const BodySchema = z.object({
  query: z.string().min(1),
  level: z.enum(["12-year-old", "15-year-old", "lawyer"]).optional(),
});

export const handleAnswer: RequestHandler = (req, res) => {
  loadCorpusOnce();
  const parsed = BodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  const { query, level = "15-year-old" } = parsed.data;

  console.log(`[Answer API] Query: "${query}", Level: ${level}, Corpus size: ${CORPUS.length}`);

  if (!CORPUS.length) {
    console.error("[Answer API] Knowledge base is empty - check ipc.json file");
    return res
      .status(200)
      .json({ answer: "Knowledge base is empty.", sources: [] });
  }
  const matches = topMatches(query, 3);
  if (!matches.length) {
    return res.status(200).json({
      answer: rewriteForLevel(
        "No direct match found in the Indian Penal Code for this query. Please try rephrasing your question or ask about specific legal concepts like theft, assault, contracts, or procedures.",
        level,
      ),
      sources: [],
    });
  }

  // Take only the best match for cleaner responses
  const bestMatch = matches[0];
  const cleanText = summarize(bestMatch.item.text, level === "lawyer" ? 4 : 2);
  const answer = rewriteForLevel(cleanText, level);
  const sources = [{
    id: bestMatch.item.id,
    title: bestMatch.item.title,
    section: bestMatch.item.section,
    score: Math.round(bestMatch.score * 1000) / 1000,
  }];

  // Add additional sources only if they're significantly relevant
  matches.slice(1).forEach((match) => {
    if (match.score > bestMatch.score * 0.7) { // Only if 70% as relevant as best match
      sources.push({
        id: match.item.id,
        title: match.item.title,
        section: match.item.section,
        score: Math.round(match.score * 1000) / 1000,
      });
    }
  });
  res.json({ answer, sources });
};
