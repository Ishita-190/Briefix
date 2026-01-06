import type { Context } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export default async (req: Request, context: Context) => {
  try {
    const url = new URL(req.url);
    const path = url.pathname.replace("/.netlify/functions/api", "");
    const method = req.method;

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Content-Type": "application/json",
    };

    if (method === "OPTIONS") {
      return new Response(null, { status: 200, headers });
    }

    // GEMINI ENDPOINT
    if (path === "/gemini" && method === "POST") {
      const body = await req.json();
      const { query, level = "15-year-old" } = body;

      if (!query || query.trim().length < 3) {
        return new Response(JSON.stringify({
          answer: "Please provide a more specific question.",
          sources: [],
          category: "general",
          urgency: "low"
        }), { status: 200, headers });
      }

      try {
        let prompt = `You are a helpful legal assistant. `;
        switch (level) {
          case "12-year-old":
            prompt += `Explain "${query}" in simple terms for a 12-year-old.`;
            break;
          case "15-year-old":
            prompt += `Explain "${query}" clearly for a 15-year-old.`;
            break;
          case "lawyer":
            prompt += `Provide detailed legal analysis of: "${query}"`;
            break;
          default:
            prompt += `Explain "${query}" clearly.`;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({
          answer: text,
          sources: [{ title: "AI Legal Assistant", type: "ai_generated" }],
          category: "legal_guidance",
          urgency: "medium"
        }), { status: 200, headers });

      } catch (error) {
        return new Response(JSON.stringify({
          answer: `I understand you're asking about "${query}". For specific legal matters, please consult with a qualified attorney who can provide advice based on your situation.`,
          sources: [{ title: "Legal Consultation Guide", type: "guidance" }],
          category: "general_guidance",
          urgency: "medium"
        }), { status: 200, headers });
      }
    }

    // DOCUMENT ANALYSIS
    if (path === "/analyze-document" && method === "POST") {
      const body = await req.json();
      const { fileName } = body;

      if (!fileName) {
        return new Response(JSON.stringify({ error: "File name required" }), 
          { status: 400, headers });
      }

      const analysis = {
        documentType: fileName.includes("contract") ? "Contract" : "Legal Document",
        summary: "This document contains legal terms and conditions that require careful review.",
        keyPoints: [
          "Contains binding legal obligations",
          "Requires careful review before signing",
          "May have specific terms and conditions"
        ],
        potentialConcerns: [{
          level: "medium",
          issue: "Professional review recommended",
          description: "This document should be reviewed by a qualified attorney."
        }],
        recommendations: [
          "Consult with a legal professional",
          "Read all terms carefully",
          "Ask questions about unclear provisions"
        ],
        complexity: "Moderate",
        readingTime: "10-15 minutes"
      };

      return new Response(JSON.stringify(analysis), { status: 200, headers });
    }

    return new Response(JSON.stringify({ 
      error: "Not Found",
      availableEndpoints: ["/gemini", "/analyze-document"]
    }), { status: 404, headers });

  } catch (err) {
    return new Response(JSON.stringify({ 
      error: "Internal Server Error",
      message: err instanceof Error ? err.message : "Unknown error"
    }), { status: 500, headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }});
  }
};

export const config = { path: "/api/*" };