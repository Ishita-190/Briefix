import type { Context } from "@netlify/functions";
import { handleDemo } from "../../server/routes/demo";
import { handleAnswer } from "../../server/routes/answer";

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const path = url.pathname.replace("/.netlify/functions/api", "");
  const method = req.method;

  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // Handle preflight requests
  if (method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  try {
    // ---- PING ----
    if (path === "/ping" && method === "GET") {
      const ping = process.env.PING_MESSAGE ?? "ping";
      return new Response(JSON.stringify({ message: ping }), {
        status: 200,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    // ---- DEMO ----
    if (path === "/demo" && method === "GET") {
      return await new Promise((resolve) => {
        const mockReq = {} as any;
        const mockRes = {
          json: (data: any) => {
            console.log("Demo response:", data);
            resolve(
              new Response(JSON.stringify(data), {
                status: 200,
                headers: { ...headers, "Content-Type": "application/json" },
              }),
            );
          },
        } as any;

        handleDemo(mockReq, mockRes);
      });
    }

    // ---- ANSWER ----
    if (path === "/answer" && method === "POST") {
      let body: any;
      try {
        body = await req.json();
      } catch (err) {
        console.error("Failed to parse request body:", err);
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
          status: 400,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }

      console.log("Incoming /answer body:", body);

      return await new Promise((resolve) => {
        const mockReq = { body, query: {} } as any;

        const mockRes = {
          json: (data: any) => {
            console.log("Answer response:", data);
            resolve(
              new Response(JSON.stringify(data), {
                status: 200,
                headers: { ...headers, "Content-Type": "application/json" },
              }),
            );
          },
          status: (code: number) => ({
            json: (data: any) => {
              console.error("Answer error:", code, data);
              resolve(
                new Response(JSON.stringify(data), {
                  status: code,
                  headers: { ...headers, "Content-Type": "application/json" },
                }),
              );
            },
          }),
        } as any;

        handleAnswer(mockReq, mockRes).catch((err: any) => {
          console.error("handleAnswer threw:", err);
          resolve(
            new Response(JSON.stringify({ error: "Internal Server Error" }), {
              status: 500,
              headers: { ...headers, "Content-Type": "application/json" },
            }),
          );
        });
      });
    }

    // ---- NOT FOUND ----
    return new Response("Not Found", {
      status: 404,
      headers,
    });
  } catch (error) {
    console.error("Function error (top-level):", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/*",
};
