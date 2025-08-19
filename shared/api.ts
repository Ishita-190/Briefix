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

export const fetchIPCData = async (): Promise<IPCDocument> => {
  const res = await fetch("/ipc.json");
  const data: IPCDocument = await res.json();
  return data;
};

export const queryIPC = async (query: string): Promise<DemoResponse> => {
  const data = await fetchIPCData();

  const answers: string[] = [];
  data.pages.forEach((page) => {
    page.blocks.forEach((block) => {
      if (block.text.toLowerCase().includes(query.toLowerCase())) {
        answers.push(block.text);
      }
    });
  });

  return {
    message: answers.length ? answers.join("\n\n") : "No relevant info found.",
  };
};
