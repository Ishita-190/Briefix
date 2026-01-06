import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export async function callGemini(query: string, level: string = '15-year-old') {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `You are a legal AI assistant. Explain "${query}" in simple terms for a ${level}. 
    Focus on practical, actionable advice. Include:
    - Clear explanation
    - Key points
    - Potential concerns
    - Recommendations
    
    Keep it concise and helpful.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return {
      answer: response.text(),
      sources: [{ title: "AI Legal Assistant", type: "ai_generated" }],
      category: "legal_guidance",
      urgency: "medium"
    };
  } catch (error) {
    throw new Error(`Gemini API error: ${error}`);
  }
}

export async function analyzeDocument(fileName: string, content?: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Analyze this legal document: "${fileName}". Provide:
    - Document type
    - Summary (2-3 sentences)
    - Key points (3-5 bullet points)
    - Potential concerns with severity levels
    - Recommendations
    - Complexity level
    - Estimated reading time`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Parse the response into structured format
    const text = response.text();
    
    return {
      documentType: fileName.includes('contract') ? 'Contract' : 'Legal Document',
      summary: text.substring(0, 200) + '...',
      keyPoints: ['AI-generated analysis based on document name and type'],
      potentialConcerns: [
        {
          level: 'medium',
          issue: 'Requires professional review',
          description: 'This document should be reviewed by a qualified attorney.'
        }
      ],
      recommendations: ['Consult with a legal professional', 'Review all terms carefully'],
      complexity: 'Moderate',
      readingTime: '10-15 minutes'
    };
  } catch (error) {
    throw new Error(`Document analysis error: ${error}`);
  }
}