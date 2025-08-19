import type { Context } from "@netlify/functions";
import { handleDemo } from "../../server/routes/demo";
import { handleAnswer } from "../../server/routes/answer";

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const path = url.pathname.replace('/.netlify/functions/api', '');
  const method = req.method;

  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  try {
    // Route to appropriate handler
    if (path === '/ping' && method === 'GET') {
      const ping = Netlify.env.get('PING_MESSAGE') ?? 'ping';
      return new Response(JSON.stringify({ message: ping }), {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }

    if (path === '/demo' && method === 'GET') {
      // Create mock Express-like objects
      const mockReq = {} as any;
      const mockRes = {
        json: (data: any) => {
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' }
          });
        }
      } as any;

      return await new Promise((resolve) => {
        mockRes.json = (data: any) => {
          resolve(new Response(JSON.stringify(data), {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' }
          }));
        };
        handleDemo(mockReq, mockRes);
      });
    }

    if (path === '/answer' && method === 'POST') {
      const body = await req.json();
      
      const mockReq = {
        body,
        query: {}
      } as any;

      return await new Promise((resolve, reject) => {
        const mockRes = {
          json: (data: any) => {
            resolve(new Response(JSON.stringify(data), {
              status: 200,
              headers: { ...headers, 'Content-Type': 'application/json' }
            }));
          },
          status: (code: number) => ({
            json: (data: any) => {
              resolve(new Response(JSON.stringify(data), {
                status: code,
                headers: { ...headers, 'Content-Type': 'application/json' }
              }));
            }
          })
        } as any;

        handleAnswer(mockReq, mockRes).catch(reject);
      });
    }

    return new Response('Not Found', { 
      status: 404, 
      headers 
    });

  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/*"
};
