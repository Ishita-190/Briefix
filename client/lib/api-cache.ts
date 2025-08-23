// Simple in-memory cache for API responses
type CacheEntry = {
  data: any;
  timestamp: number;
  expiresIn: number;
};

class ApiCache {
  private cache = new Map<string, CacheEntry>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes default

  // Generate cache key from query and options
  private getCacheKey(query: string, options?: Record<string, any>): string {
    const normalized = query.toLowerCase().trim();
    const optionsKey = options ? JSON.stringify(options) : "";
    return `${normalized}:${optionsKey}`;
  }

  // Get cached response if valid
  get<T>(query: string, options?: Record<string, any>): T | null {
    const key = this.getCacheKey(query, options);
    const entry = this.cache.get(key);

    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.expiresIn) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  // Set cached response
  set<T>(
    query: string,
    data: T,
    options?: Record<string, any>,
    ttl?: number,
  ): void {
    const key = this.getCacheKey(query, options);
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      expiresIn: ttl || this.defaultTTL,
    };

    this.cache.set(key, entry);
  }

  // Clear specific cache entry
  delete(query: string, options?: Record<string, any>): void {
    const key = this.getCacheKey(query, options);
    this.cache.delete(key);
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
  }

  // Get cache stats
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

export const apiCache = new ApiCache();

// Fallback responses for when API is not available
function getFallbackResponse(query: string, level: string = "15-year-old") {
  const queryLower = query.toLowerCase();
  
  // Legal concept explanations
  if (queryLower.includes("misdemeanor") || queryLower.includes("felony")) {
    return {
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
    return {
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
    return {
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
    return {
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
    return {
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
    return {
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
  } else if (queryLower.includes("divorce") || queryLower.includes("custody")) {
    return {
      answer: `**Divorce and Custody Proceedings:**

**Divorce Process:**
1. **File a petition** - Start the divorce process
2. **Serve papers** - Notify your spouse
3. **Discovery** - Exchange financial information
4. **Negotiation** - Try to reach agreement
5. **Trial** - If no agreement, court decides

**Child Custody:**
- **Legal custody**: Right to make major decisions
- **Physical custody**: Where child lives
- **Joint custody**: Both parents share responsibilities
- **Sole custody**: One parent has primary responsibility

**Factors courts consider:**
- Child's best interests
- Parent's ability to care for child
- Child's relationship with each parent
- Stability and continuity
- Any history of abuse or neglect

**Child Support:**
- Based on income of both parents
- Considers child's needs
- Can be modified if circumstances change

**Property Division:**
- Marital property is divided fairly
- Separate property usually stays with original owner
- Consider length of marriage, contributions, needs

**Important:** Divorce and custody cases are complex. Always consult with a family law attorney.`,
      sources: [
        { title: "Family Law", type: "legal_concept" },
        { title: "Divorce and Custody Guide", type: "procedure" }
      ],
      category: "family_law",
      urgency: "high"
    };
  } else if (queryLower.includes("contract") || queryLower.includes("agreement")) {
    return {
      answer: `**Understanding Contracts and Agreements:**

**What makes a contract valid:**
- **Offer and acceptance** - Both parties agree
- **Consideration** - Something of value exchanged
- **Capacity** - Both parties are legally able to contract
- **Legality** - Purpose must be legal
- **Mutual intent** - Both parties intend to be bound

**Types of contracts:**
- **Written contracts** - Most formal, best protection
- **Oral contracts** - Valid but harder to prove
- **Implied contracts** - Created by actions, not words

**Common contract issues:**
- **Breach of contract** - One party doesn't fulfill obligations
- **Misrepresentation** - False statements made
- **Duress** - Forced to sign under pressure
- **Unconscionability** - Extremely unfair terms

**Before signing a contract:**
- Read it completely
- Understand all terms
- Ask questions about unclear parts
- Consider having a lawyer review it
- Don't sign under pressure

**If you have a contract dispute:**
- Document everything
- Try to resolve informally first
- Consider mediation
- Consult with a contract lawyer
- Be aware of time limits for legal action

**Remember:** A contract is a legally binding agreement. Take it seriously and get help if you're unsure.`,
      sources: [
        { title: "Contract Law", type: "legal_concept" },
        { title: "Contract Basics", type: "guidance" }
      ],
      category: "contract_law",
      urgency: "medium"
    };
  } else {
    // General legal guidance for other questions
    return {
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

**Important:** While I can provide general information, legal advice should come from a qualified attorney who knows your specific circumstances.`,
      sources: [
        { title: "Legal Consultation Guide", type: "guidance" },
        { title: "General Legal Information", type: "resource" }
      ],
      category: "general_guidance",
      urgency: "medium"
    };
  }
}

// Enhanced API function with caching and fallback
export async function getCachedAnswer(
  question: string,
  level: string = "15-year-old",
  useCache: boolean = true,
): Promise<{
  answer: string;
  sources: any[];
  category?: string;
  urgency?: string;
}> {
  const options = { level };

  // Try cache first
  if (useCache) {
    const cached = apiCache.get<{
      answer: string;
      sources: any[];
      category?: string;
      urgency?: string;
    }>(question, options);
    if (cached) {
      return cached;
    }
  }

  try {
    // Try to call the API first
    const response = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: question,
        level: level,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      
      // Cache the successful response
      if (useCache) {
        apiCache.set(question, data, options);
      }
      
      return data;
    } else {
      console.log("API call failed, using fallback response");
      throw new Error("API call failed");
    }
  } catch (err) {
    console.log("Using fallback response for:", question);
    
    // Use fallback response when API fails
    const fallbackResponse = getFallbackResponse(question, level);
    
    // Cache the fallback response
    if (useCache) {
      apiCache.set(question, fallbackResponse, options);
    }
    
    return fallbackResponse;
  }
}
