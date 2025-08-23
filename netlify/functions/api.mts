import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const path = url.pathname.replace("/.netlify/functions/api", "");
  const method = req.method;

  console.log("=== Netlify Function Debug ===");
  console.log("Full URL:", req.url);
  console.log("Pathname:", url.pathname);
  console.log("Processed path:", path);
  console.log("Method:", method);
  console.log("Headers:", Object.fromEntries(req.headers.entries()));

  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // Handle preflight
  if (method === "OPTIONS") {
    console.log("Handling OPTIONS preflight");
    return new Response(null, { status: 200, headers });
  }

  try {
    // ---- PING ----
    if (path === "/ping" && method === "GET") {
      console.log("Handling /ping request");
      const ping = process.env.PING_MESSAGE ?? "ping";
      return new Response(JSON.stringify({ message: ping }), {
        status: 200,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    // ---- DEMO ----
    if (path === "/demo" && method === "GET") {
      console.log("Handling /demo request");
      const response = {
        message: "Hello from Netlify Function - Legal AI Assistant is ready!",
      };
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    // ---- ANSWER ----
    if (path === "/answer" && method === "POST") {
      console.log("Handling /answer request");
      let body: any;
      try {
        body = await req.json();
        console.log("Request body:", body);
      } catch (err) {
        console.error("Invalid JSON:", err);
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
          status: 400,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }

      const { query, level = "15-year-old" } = body;
      console.log("Query:", query, "Level:", level);

      if (!query || query.trim().length < 3) {
        console.log("Query too short, returning error");
        return new Response(JSON.stringify({
          answer: "Please provide a more specific question about legal concepts or procedures.",
          sources: [],
          category: "general",
          urgency: "low"
        }), {
          status: 200,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }

      // Enhanced response based on query content
      const queryLower = query.toLowerCase();
      let response: any;

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
      } else if (queryLower.includes("rights") && queryLower.includes("police")) {
        response = {
          answer: `**Your Rights During a Police Stop:**

**You have the right to:**
- Remain silent (5th Amendment)
- Ask if you're free to leave
- Refuse consent to search (unless they have a warrant)
- Request a lawyer if arrested
- Know why you're being detained

**What you should do:**
- Stay calm and respectful
- Keep your hands visible
- Don't resist or argue
- Ask "Am I free to leave?"
- If arrested, say "I want to speak to a lawyer"

**What you DON'T have to do:**
- Answer questions beyond basic identification
- Consent to searches without a warrant
- Allow police into your home without a warrant
- Submit to field sobriety tests (though refusing may have consequences)

**Important:** These rights apply to everyone, regardless of citizenship status. If your rights are violated, document everything and contact a lawyer.`,
          sources: [
            { title: "Constitutional Rights", type: "constitutional" },
            { title: "Police Interaction Guide", type: "rights" }
          ],
          category: "constitutional_rights",
          urgency: "high"
        };
      } else if (queryLower.includes("bankruptcy")) {
        response = {
          answer: `**Bankruptcy** is a legal process that helps people who can't pay their debts get a fresh start.

**Types of Bankruptcy:**

**Chapter 7 (Liquidation):**
- Sells your non-exempt property to pay creditors
- Discharges most debts
- Takes 3-6 months to complete
- You can keep essential items (clothing, basic furniture, tools)

**Chapter 13 (Reorganization):**
- Creates a 3-5 year repayment plan
- You keep your property
- Pay back a portion of your debts
- Good for people with regular income

**What Bankruptcy CAN do:**
- Stop creditor harassment
- Stop wage garnishment
- Discharge credit card debt
- Stop foreclosure (temporarily)
- Give you a fresh financial start

**What Bankruptcy CAN'T do:**
- Discharge student loans (usually)
- Discharge recent taxes
- Discharge child support/alimony
- Protect co-signers

**Before filing:**
- Consult with a bankruptcy attorney
- Consider alternatives (debt consolidation, credit counseling)
- Understand the long-term impact on your credit`,
          sources: [
            { title: "Bankruptcy Law", type: "legal_concept" },
            { title: "Financial Relief Options", type: "guidance" }
          ],
          category: "bankruptcy",
          urgency: "medium"
        };
      } else if (queryLower.includes("sued") || queryLower.includes("lawsuit")) {
        response = {
          answer: `**If you're being sued, here's what you need to do:**

**Immediate Steps:**
1. **Don't ignore it** - You must respond within the deadline (usually 20-30 days)
2. **Read the papers carefully** - Understand what you're being sued for
3. **Contact a lawyer immediately** - This is crucial
4. **Document everything** - Keep copies of all papers and communications

**What the papers mean:**
- **Complaint**: Explains why you're being sued
- **Summons**: Tells you when to respond
- **Service**: How you received the papers

**Your options:**
- **Respond and defend** - Fight the lawsuit
- **Settle** - Agree to pay or compromise
- **Default** - Don't respond (NOT recommended - you'll lose)

**How to respond:**
- File an "Answer" with the court
- Deny or admit each allegation
- Raise any defenses you have
- Meet all deadlines

**Common defenses:**
- Statute of limitations (too much time has passed)
- Lack of jurisdiction
- Improper service
- Factual disputes

**Important:** Never ignore a lawsuit. Even if you think it's unfair, you must respond or you'll lose by default.`,
          sources: [
            { title: "Civil Procedure", type: "legal_concept" },
            { title: "Responding to Lawsuits", type: "guidance" }
          ],
          category: "civil_law",
          urgency: "high"
        };
      } else if (queryLower.includes("restraining order") || queryLower.includes("protection order")) {
        response = {
          answer: `**Restraining Orders (Protection Orders):**

**What they do:**
- Order someone to stay away from you
- Prohibit contact (calls, texts, social media)
- Can order them to move out of shared home
- Can include children and pets

**Types:**
- **Emergency/Temporary**: Immediate protection (24-72 hours)
- **Permanent**: Longer-term protection (1-5 years)
- **Criminal**: Issued after criminal charges

**How to get one:**
1. **Go to courthouse** - Family court or domestic violence court
2. **Fill out forms** - Explain why you need protection
3. **See a judge** - Usually same day for emergency orders
4. **Serve the other person** - They must be notified

**What you need to prove:**
- You're in immediate danger
- The person has harmed or threatened you
- You have a relationship (spouse, ex, family, roommate)

**If you're served with one:**
- **Don't violate it** - Even if you disagree
- **Get a lawyer** - You can fight it in court
- **Document everything** - Keep records of violations
- **Stay away** - No contact means NO contact

**Violations are serious:**
- Can result in arrest
- Criminal charges
- Jail time

**Resources:**
- Domestic violence hotlines
- Legal aid organizations
- Court self-help centers`,
          sources: [
            { title: "Domestic Violence Law", type: "legal_concept" },
            { title: "Protection Order Guide", type: "procedure" }
          ],
          category: "domestic_violence",
          urgency: "high"
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
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    // ---- NOT FOUND ----
    console.log("No matching route found, returning 404");
    return new Response("Not Found", { status: 404, headers });
  } catch (err) {
    console.error("Top-level error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
};

export const config = { path: "/api/*" };
