import fs from "fs";
import path from "path";

export type CorpusItem = {
  id?: string;
  title?: string;
  section?: string;
  text: string;
};

let CORPUS: CorpusItem[] = [];
let corpusLoaded = false;

export function loadCorpusData(): CorpusItem[] {
  if (corpusLoaded) {
    return CORPUS;
  }

  try {
    // Try multiple possible paths for different deployment environments
    const possiblePaths = [
      // Local development
      path.join(process.cwd(), "public", "ipc.json"),
      // Build environments
      path.join(__dirname, "..", "..", "..", "public", "ipc.json"),
      path.join(__dirname, "..", "..", "public", "ipc.json"),
      // Netlify build directory
      "/opt/build/repo/public/ipc.json",
      "/opt/buildhome/public/ipc.json",
      // Relative paths
      "./public/ipc.json",
      "../public/ipc.json",
      "../../public/ipc.json",
    ];

    let dataFound = false;
    let rawData: string = "";

    for (const tryPath of possiblePaths) {
      try {
        if (fs.existsSync(tryPath)) {
          rawData = fs.readFileSync(tryPath, "utf8");
          console.log(`[Corpus] Successfully loaded from: ${tryPath}`);
          dataFound = true;
          break;
        }
      } catch (e) {
        // Continue to next path
        continue;
      }
    }

    if (!dataFound) {
      console.error("[Corpus] Could not find ipc.json in any expected location");
      console.error("[Corpus] Tried paths:", possiblePaths);
      console.error("[Corpus] Current working directory:", process.cwd());
      console.error("[Corpus] __dirname:", __dirname);
      
      // List available files for debugging
      try {
        const cwdFiles = fs.readdirSync(process.cwd());
        console.error("[Corpus] Files in cwd:", cwdFiles.slice(0, 20));
      } catch (e) {
        console.error("[Corpus] Could not list cwd files:", e);
      }
      
      corpusLoaded = true;
      return CORPUS; // Return empty array
    }

    const data = JSON.parse(rawData);
    
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

    console.log(`[Corpus] Loaded ${CORPUS.length} items`);
    corpusLoaded = true;
    return CORPUS;
    
  } catch (e) {
    console.error("[Corpus] Failed to load and parse data:", e);
    corpusLoaded = true;
    return CORPUS; // Return empty array
  }
}

export function getCorpusSize(): number {
  return CORPUS.length;
}

export function resetCorpus(): void {
  CORPUS = [];
  corpusLoaded = false;
}
