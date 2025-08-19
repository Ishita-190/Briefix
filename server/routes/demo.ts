import type { Handler } from "@netlify/functions";
import { DemoResponse } from "@shared/api";

export const handler: Handler = async (event, context) => {
  const response: DemoResponse = {
    message: "Hello from Netlify Function",
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
