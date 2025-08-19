// This file provides a fallback data loading mechanism for environments
// where file system access is limited (like Netlify Functions)

import { type CorpusItem } from "./corpus-data";

export async function loadEmbeddedData(): Promise<CorpusItem[]> {
  try {
    // For Netlify Functions, we need to use dynamic import to access data
    // This will be bundled at build time
    const { default: data } = await import("../../public/ipc.json");

    if (Array.isArray(data)) {
      return data
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

    return [];
  } catch (e) {
    console.error("[EmbeddedData] Failed to load embedded data:", e);
    return [];
  }
}
