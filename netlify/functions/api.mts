import type { Context } from "@netlify/functions";
import { createServer } from "../../server";

// Create the Express server instance
const app = createServer();

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const path = url.pathname.replace('/.netlify/functions/api', '');
  
  // Handle the request using our Express app
  return new Promise((resolve) => {
    const mockReq = {
      method: req.method,
      url: path,
      headers: Object.fromEntries(req.headers.entries()),
      body: req.body,
    };
    
    const mockRes = {
      statusCode: 200,
      headers: {},
      body: '',
      json: function(data: any) {
        this.headers['content-type'] = 'application/json';
        this.body = JSON.stringify(data);
        return this;
      },
      status: function(code: number) {
        this.statusCode = code;
        return this;
      },
      setHeader: function(name: string, value: string) {
        this.headers[name.toLowerCase()] = value;
      },
      end: function(data?: string) {
        if (data) this.body = data;
        resolve(new Response(this.body, {
          status: this.statusCode,
          headers: this.headers
        }));
      }
    };

    // Handle the request with our Express app
    app.handle(mockReq as any, mockRes as any, () => {
      resolve(new Response('Not Found', { status: 404 }));
    });
  });
};

export const config = {
  path: "/api/*"
};
