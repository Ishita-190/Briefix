import "dotenv/config";
import express from "express";
import cors from "cors";
import { handler as demoHandler } from "./routes/demo";
import { handler as answerHandler } from "./routes/answer";

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

  return app;
}
