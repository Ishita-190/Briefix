import { DemoResponse } from "@shared/api";

export async function handler(event: any) {
  const response: DemoResponse = {
    message: "Hello from Netlify Function",
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
}
