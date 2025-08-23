import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleDemo } from '../server/routes/demo';
import { handleAnswer } from '../server/routes/answer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url, method } = req;
  const path = url?.replace('/api/serverless', '') || '';

  try {
    // Route to appropriate handler
    if (path === '/ping' && method === 'GET') {
      const ping = process.env.PING_MESSAGE ?? 'ping';
      return res.status(200).json({ message: ping });
    }

    if (path === '/demo' && method === 'GET') {
      // Create mock Express-like objects for Vercel
      const mockReq = {} as any;
      const mockRes = {
        json: (data: any) => res.status(200).json(data)
      } as any;

      return handleDemo(mockReq, mockRes);
    }

    if (path === '/answer' && method === 'POST') {
      // Ensure Gemini API key is available
      if (!process.env.GEMINI_API_KEY) {
        console.warn('[Vercel Function] GEMINI_API_KEY not found, responses will not be AI-formatted');
      }

      const mockReq = {
        body: req.body,
        query: req.query
      } as any;

      const mockRes = {
        json: (data: any) => res.status(200).json(data),
        status: (code: number) => ({
          json: (data: any) => res.status(code).json(data)
        })
      } as any;

      return await handleAnswer(mockReq, mockRes);
    }

    return res.status(404).json({ error: 'Not Found' });

  } catch (error) {
    console.error('Vercel Function error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
