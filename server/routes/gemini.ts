import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Validation schema
const BodySchema = z.object({
  query: z.string().min(1),
  level: z.enum(["12-year-old", "15-year-old", "lawyer"]).optional(),
});

export async function handler(event: any) {
  try {
    // Parse and validate request body
    const body = JSON.parse(event.body || "{}");
    const { query, level = "15-year-old" } = BodySchema.parse(body);

    // Create prompt based on complexity level
    let prompt = `You are a helpful legal assistant. `;
    
    switch (level) {
      case "12-year-old":
        prompt += `Explain the following legal question in simple terms that a 12-year-old would understand: "${query}"`;
        break;
      case "15-year-old":
        prompt += `Explain the following legal question clearly and accurately for a 15-year-old: "${query}"`;
        break;
      case "lawyer":
        prompt += `Provide a detailed legal analysis of: "${query}"`;
        break;
    }

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: text,
        sources: [],
        category: "legal",
        urgency: "normal"
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Failed to generate response. Please try again later.",
        fallback: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
}
