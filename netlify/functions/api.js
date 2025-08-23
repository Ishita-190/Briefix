const { handleDemo } = require("../../server/routes/demo");
const { handleAnswer } = require("../../server/routes/answer");

exports.handler = async (event, context) => {
  const { httpMethod: method, path: fullPath, body, queryStringParameters } = event;
  const path = fullPath.replace("/.netlify/functions/api", "");

  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight requests
  if (method === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    // Route to appropriate handler
    if (path === "/ping" && method === "GET") {
      const ping = process.env.PING_MESSAGE ?? "ping";
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: ping }),
      };
    }

    if (path === "/demo" && method === "GET") {
      return new Promise((resolve) => {
        const mockReq = {};
        const mockRes = {
          json: (data) => {
            resolve({
              statusCode: 200,
              headers,
              body: JSON.stringify(data),
            });
          },
        };
        handleDemo(mockReq, mockRes);
      });
    }

    if (path === "/answer" && method === "POST") {
      // Ensure Gemini API key is available
      const geminiKey = process.env.GEMINI_API_KEY;
      if (!geminiKey) {
        console.warn("[Netlify Function] GEMINI_API_KEY not found, responses will not be AI-formatted");
      }

      const parsedBody = body ? JSON.parse(body) : {};
      
      const mockReq = {
        body: parsedBody,
        query: queryStringParameters || {},
      };

      return new Promise((resolve, reject) => {
        const mockRes = {
          json: (data) => {
            resolve({
              statusCode: 200,
              headers,
              body: JSON.stringify(data),
            });
          },
          status: (code) => ({
            json: (data) => {
              resolve({
                statusCode: code,
                headers,
                body: JSON.stringify(data),
              });
            },
          }),
        };

        // Handle the request with timeout
        const timeoutId = setTimeout(() => {
          reject(new Error("Function timeout"));
        }, 25000); // 25 second timeout

        handleAnswer(mockReq, mockRes)
          .then(() => {
            clearTimeout(timeoutId);
          })
          .catch((error) => {
            clearTimeout(timeoutId);
            reject(error);
          });
      });
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Not Found" }),
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Internal Server Error",
        message: error.message 
      }),
    };
  }
};
