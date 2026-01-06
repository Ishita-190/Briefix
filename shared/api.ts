// shared/api.ts

export interface DemoResponse {
  message: string;
}

export interface IPCBlock {
  text: string;
}

export interface IPCPage {
  blocks: IPCBlock[];
}

export interface IPCDocument {
  pages: IPCPage[];
}

/**
 * Fetches the IPC JSON data from the public folder
 */
export const fetchIPCData = async (): Promise<IPCDocument> => {
  try {
    const res = await fetch("/ipc.json"); // client-side fetch
    if (!res.ok) throw new Error("Failed to fetch ipc.json");
    const data: IPCDocument = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching IPC data:", err);
    return { pages: [] }; // return empty document on error
  }
};

/**
 * Searches the IPC document for blocks containing the query
 */
export const queryIPC = async (query: string): Promise<DemoResponse> => {
  try {
    const data = await fetchIPCData();

    const answers: string[] = [];

    // Normalize function to ignore case and punctuation
    const normalize = (text: string) =>
      text.toLowerCase().replace(/[^\w\s]/g, "");

    const queryNormalized = normalize(query);

    data.pages.forEach((page) => {
      page.blocks.forEach((block) => {
        if (normalize(block.text).includes(queryNormalized)) {
          answers.push(block.text);
        }
      });
    });

    return {
      message: answers.length
        ? answers.join("\n\n")
        : "Sorry, I couldn't find any relevant information.",
    };
  } catch (err) {
    console.error("Error querying IPC data:", err);
    return { message: "Sorry, I couldn't fetch the document data." };
  }
};
