import type { Context } from "@netlify/functions";
import { handleDemo } from "../../server/routes/demo.js";
import { handleAnswer } from "../../server/routes/answer.js";

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

  // Handle preflight
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
      const data = await handleDemo();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    // ---- ANSWER ----
    if (path === "/answer" && method === "POST") {
      let body: any;
      try {
        body = await req.json();
      } catch (err) {
        console.error("Invalid JSON:", err);
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
          status: 400,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }

      console.log("Incoming /answer body:", body);

      try {
        const data = await handleAnswer(body);
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      } catch (err) {
        console.error("handleAnswer failed:", err);
        return new Response(
          JSON.stringify({ error: "Internal Server Error" }),
          {
            status: 500,
            headers: { ...headers, "Content-Type": "application/json" },
          }
        );
      }
    }

    // ---- NOT FOUND ----
    return new Response("Not Found", { status: 404, headers });
  } catch (err) {
    console.error("Top-level error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
};

export const config = { path: "/api/*" };
