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

function topMatches(query: string, k = 5) {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .filter((w) => w.length > 1);
  const scored = CORPUS.map((item) => ({
    item,
    score: score(item.text, terms),
  }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
  return scored;
}

function summarize(text: string, maxSentences = 3) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return sentences.slice(0, maxSentences).join(" ");
}

function rewriteForLevel(text: string, level: string) {
  const base = summarize(
    text,
    level === "lawyer" ? 5 : level === "15-year-old" ? 4 : 3,
  );
  if (level === "12-year-old") {
    // simpler words and shorter lines
    return (
      base
        .replace(/contract/gi, "agreement")
        .replace(/obligation/gi, "requirement")
        .replace(/proceedings?/gi, "process") +
      " This is a simple explanation to help you understand."
    );
  }
  if (level === "15-year-old") {
    return (
      base +
      " Key ideas are simplified and focused on what matters in practice."
    );
  }
  // lawyer
  return (
    base +
    " This overview focuses on material elements, scope, and typical limitations."
  );
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
  const matches = topMatches(query, 5);
  if (!matches.length) {
    return res.status(200).json({
      answer: rewriteForLevel(
        "No direct match found in the dataset. However, generally speaking, the law addresses this topic through principles, definitions, and procedures that vary by jurisdiction.",
        level,
      ),
      sources: [],
    });
  }
  const stitched = matches.map((m) => m.item.text).join(" ");
  const answer = rewriteForLevel(stitched, level);
  const sources = matches.map((m) => ({
    id: m.item.id,
    title: m.item.title,
    section: m.item.section,
    score: Math.round(m.score * 1000) / 1000,
  }));
  res.json({ answer, sources });
};
