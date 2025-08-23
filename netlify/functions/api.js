// Simple JavaScript version of the API function
exports.handler = async function(event, context) {
  console.log("=== Netlify Function Debug ===");
  console.log("Event:", JSON.stringify(event, null, 2));
  console.log("Context:", JSON.stringify(context, null, 2));

  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    console.log("Handling OPTIONS preflight");
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }

  try {
    const path = event.path.replace("/.netlify/functions/api", "");
    const method = event.httpMethod;

    console.log("Path:", path);
    console.log("Method:", method);

    // ---- TEST ENDPOINT ----
    if (path === "/test" && method === "GET") {
      console.log("Handling /test request");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: "Netlify function is working!",
          timestamp: new Date().toISOString(),
          path: path,
          method: method
        })
      };
    }

    // ---- PING ----
    if (path === "/ping" && method === "GET") {
      console.log("Handling /ping request");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: "pong",
          timestamp: new Date().toISOString()
        })
      };
    }

    // ---- DEMO ----
    if (path === "/demo" && method === "GET") {
      console.log("Handling /demo request");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: "Hello from Netlify Function - Legal AI Assistant is ready!",
          timestamp: new Date().toISOString()
        })
      };
    }

    // ---- ANSWER ----
    if (path === "/answer" && method === "POST") {
      console.log("Handling /answer request");
      
      let body;
      try {
        body = JSON.parse(event.body);
        console.log("Request body:", body);
      } catch (err) {
        console.error("Invalid JSON:", err);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: "Invalid JSON",
            details: err.message
          })
        };
      }

      const { query, level = "15-year-old" } = body;
      console.log("Query:", query, "Level:", level);

      if (!query || query.trim().length < 3) {
        console.log("Query too short, returning error");
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            answer: "Please provide a more specific question about legal concepts or procedures.",
            sources: [],
            category: "general",
            urgency: "low"
          })
        };
      }

      // Enhanced response based on query content
      const queryLower = query.toLowerCase();
      let response;

      // Legal concept explanations
      if (queryLower.includes("misdemeanor") || queryLower.includes("felony")) {
        response = {
          answer: `A **misdemeanor** is a less serious crime that typically results in fines, probation, or jail time of less than one year. Examples include petty theft, simple assault, and traffic violations.

A **felony** is a more serious crime that can result in imprisonment for more than one year, and in some cases, life imprisonment or even the death penalty. Examples include murder, rape, robbery, and drug trafficking.

The main differences are:
- **Severity**: Felonies are more serious than misdemeanors
- **Punishment**: Felonies carry longer prison sentences
- **Rights**: Felony convictions can result in loss of voting rights and gun ownership
- **Employment**: Felony convictions can make it harder to find employment`,
          sources: [
            { title: "Criminal Law Basics", type: "legal_concept" },
            { title: "Misdemeanor vs Felony", type: "comparison" }
          ],
          category: "criminal_law",
          urgency: "medium"
        };
      } else if (queryLower.includes("lawyer") || queryLower.includes("attorney")) {
        response = {
          answer: `You typically need a lawyer when:

**Criminal Cases:**
- You're charged with a crime
- You're under investigation
- You need to understand your rights

**Civil Cases:**
- You're being sued or want to sue someone
- You're involved in a contract dispute
- You're dealing with family law issues (divorce, custody)

**Business Matters:**
- Starting a business
- Employment disputes
- Real estate transactions

**Other Situations:**
- Estate planning (wills, trusts)
- Bankruptcy
- Immigration issues

**When you DON'T need a lawyer:**
- Simple traffic tickets
- Small claims court (usually under $5,000)
- Basic legal forms (with proper research)

**How to find a lawyer:**
- Ask friends and family for recommendations
- Contact your local bar association
- Use online legal directories
- Consider legal aid if you can't afford one`,
          sources: [
            { title: "When to Hire a Lawyer", type: "guidance" },
            { title: "Legal Representation Guide", type: "resource" }
          ],
          category: "legal_guidance",
          urgency: "medium"
        };
      } else {
        // General legal guidance for other questions
        response = {
          answer: `I understand you're asking about "${query}". This is an important legal question that deserves a thorough answer.

**Here's what I can tell you:**
Legal matters can be complex and the specific answer depends on your unique situation, location, and circumstances. What might be true in one case may not apply to another.

**My recommendation:**
1. **Consult with a qualified lawyer** who specializes in this area of law
2. **Research your specific jurisdiction's laws** - laws vary by state/country
3. **Document everything** related to your situation
4. **Don't rely solely on online information** for important legal decisions

**For your specific question about "${query}":**
- This may involve multiple areas of law
- The answer could depend on your specific facts
- There might be recent changes in the law
- Your location could affect the outcome

**Next steps:**
- Schedule a consultation with a lawyer
- Bring all relevant documents
- Be prepared to discuss your specific situation
- Ask about costs and payment options

Remember: While I can provide general information, legal advice should come from a qualified attorney who knows your specific circumstances.`,
          sources: [
            { title: "Legal Consultation Guide", type: "guidance" },
            { title: "General Legal Information", type: "resource" }
          ],
          category: "general_guidance",
          urgency: "medium"
        };
      }

      console.log("Sending response:", response);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(response)
      };
    }

    // ---- NOT FOUND ----
    console.log("No matching route found, returning 404");
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: "Not Found",
        message: "The requested endpoint was not found",
        availableEndpoints: ["/test", "/ping", "/demo", "/answer"]
      })
    };
  } catch (err) {
    console.error("Top-level error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal Server Error",
        message: err.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
