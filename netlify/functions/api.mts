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
        const prompt = `You are an expert legal assistant. Answer this legal question with specific, actionable advice: "${query}"

Provide:
1. A clear, direct answer
2. Specific steps or actions to take
3. Important warnings or considerations
4. When to seek professional help

Keep it practical and helpful for someone at a ${level} understanding level.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (!text || text.trim().length < 10) {
          throw new Error('Empty response from Gemini');
        }

        return new Response(JSON.stringify({
          answer: text,
          sources: [{ title: "AI Legal Assistant", type: "ai_generated" }],
          category: "legal_guidance",
          urgency: "medium"
        }), { status: 200, headers });

      } catch (error) {
        console.error('Gemini API Error:', error);
        
        const queryLower = query.toLowerCase();
        let fallbackAnswer;
        
        if (queryLower.includes('arrest') || queryLower.includes('police')) {
          fallbackAnswer = `**Your Rights When Arrested:**\n\n• Right to remain silent\n• Right to an attorney\n• Right to know charges against you\n• Right to a phone call\n\n**What to do:**\n1. Stay calm and don't resist\n2. Say "I want to speak to a lawyer"\n3. Don't answer questions without attorney present\n4. Document everything that happens\n\n**Important:** These rights apply immediately upon arrest.`;
        } else if (queryLower.includes('contract') || queryLower.includes('agreement')) {
          fallbackAnswer = `**Before Signing Any Contract:**\n\n• Read everything carefully\n• Understand all terms and conditions\n• Check for hidden fees or clauses\n• Know your cancellation rights\n\n**Red flags:**\n- Pressure to sign immediately\n- Unclear or confusing language\n- Missing important details\n\n**Always:** Get legal advice for important contracts.`;
        } else {
          fallbackAnswer = `For your question about "${query}", I recommend:\n\n1. **Consult a qualified attorney** who specializes in this area\n2. **Document everything** related to your situation\n3. **Research local laws** as they vary by location\n4. **Don't delay** if this is time-sensitive\n\nLegal matters require personalized advice based on your specific circumstances.`;
        }

        return new Response(JSON.stringify({
          answer: fallbackAnswer,
          sources: [{ title: "Legal Guidance", type: "fallback" }],
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