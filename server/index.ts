import "dotenv/config";
import express from "express";
import cors from "cors";
import { handler as demoHandler } from "./routes/demo";
import { handler as answerHandler } from "./routes/answer";
import { handler as geminiHandler } from "./routes/gemini";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Wrapper functions to convert Netlify handler format to Express format
  app.get("/api/demo", async (req, res) => {
    try {
      const result = await demoHandler({});
      res.status(result.statusCode).json(JSON.parse(result.body));
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/answer", async (req, res) => {
    try {
      const result = await answerHandler({ body: JSON.stringify(req.body) });
      res.status(result.statusCode).json(JSON.parse(result.body));
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Gemini API route
  app.post("/api/gemini", async (req, res) => {
    try {
      const result = await geminiHandler({ 
        body: JSON.stringify(req.body),
        headers: req.headers 
      });
      
      // Set CORS headers
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      });
      
      res.status(result.statusCode).json(JSON.parse(result.body));
    } catch (error) {
      console.error('Error in Gemini handler:', error);
      res.status(500).json({ 
        error: "Failed to process request with Gemini API",
        fallback: true
      });
    }
  });

  return app;
}
