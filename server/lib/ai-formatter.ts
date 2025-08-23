import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function formatLegalResponse(
  rawAnswer: string,
  userQuery: string,
  level: string,
  category?: string,
  sources?: any[],
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemPrompt = `You are an intelligent legal assistant integrated into a prototype website. 
Your task is to format legal information clearly, accurately, and concisely for ${level} level understanding.

When given legal content, format it with these structured sections:

1. **Definition / Explanation**
2. **Relevant IPC Section(s) or Law**
3. **Example / Case (if applicable)**
4. **Precaution / Advice** (if relevant)

Rules:
- Keep the tone appropriate for ${level}
- If content mentions constitutional rights, include them in the law section
- Use simple language for younger audiences, more formal for lawyers
- Keep answers under 200 words unless more detail is needed
- Always format with clear headings and bullet points
- Preserve any urgency indicators from the original content
- If the query is unclear, acknowledge this politely
- If outside legal scope, respond helpfully but briefly

Original User Query: "${userQuery}"
Content Category: ${category || "General Legal"}
Target Audience: ${level}`;

    const prompt = `${systemPrompt}

Please format this legal content according to the structured format above:

${rawAnswer}

Remember to:
- Maintain the factual accuracy of the original content
- Adapt language complexity for ${level}
- Include specific IPC sections if mentioned
- Add practical advice where appropriate
- Keep formatting clean with proper headings`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("[AI Formatter] Error:", error);
    // Fallback to original content if AI fails
    return rawAnswer;
  }
}

export async function formatEmergencyResponse(
  rawAnswer: string,
  userQuery: string,
  level: string,
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const emergencyPrompt = `🚨 URGENT LEGAL MATTER - You are formatting a response for someone who may need immediate legal help.

User Query: "${userQuery}"
Target Audience: ${level}

Format this urgent legal guidance with:

**⚠️ IMMEDIATE ACTION NEEDED**
1. **What This Means**
2. **Your Rights** 
3. **Steps to Take NOW**
4. **Get Legal Help**

Keep it clear, direct, and actionable for ${level}:

${rawAnswer}`;

    const result = await model.generateContent(emergencyPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("[AI Emergency Formatter] Error:", error);
    return rawAnswer;
  }
}
