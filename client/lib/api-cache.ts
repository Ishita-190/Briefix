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
  
  // ===== GENERAL RIGHTS & CRIMINAL LAW =====
  if (queryLower.includes("arrested") && queryLower.includes("rights")) {
    return {
      answer: `**Your Rights When Arrested by Police in India:**

**Immediate Rights:**
- **Right to know the reason** for arrest (Article 22(1))
- **Right to remain silent** - You don't have to answer questions
- **Right to legal representation** - You can ask for a lawyer
- **Right to inform family/friend** about your arrest
- **Right to medical examination** if needed

**What Police Must Do:**
- Inform you of the grounds of arrest
- Take you to the nearest magistrate within 24 hours
- Allow you to contact a lawyer
- Provide you with a copy of the arrest memo

**What You Should Do:**
- Stay calm and don't resist arrest
- Ask for the reason for arrest
- Request to call a lawyer immediately
- Ask to inform your family
- Don't sign any documents without reading
- Remember: "I want to speak to my lawyer"

**Important:** These rights apply to everyone, including foreigners. If your rights are violated, document everything and contact a lawyer immediately.`,
      sources: [
        { title: "Constitutional Rights - Article 22", type: "constitutional" },
        { title: "Criminal Procedure Code", type: "legal_concept" }
      ],
      category: "criminal_law",
      urgency: "high"
    };
  } else if (queryLower.includes("search") && queryLower.includes("warrant")) {
    return {
      answer: `**Police Search Without Warrant - Your Rights:**

**When Police CAN Search Without Warrant:**
- **Arrest situations** - During lawful arrest
- **Hot pursuit** - Chasing a suspect
- **Consent given** - If you voluntarily allow
- **Emergency situations** - To prevent crime or injury
- **Vehicle searches** - If there's reasonable suspicion

**When Police CANNOT Search Without Warrant:**
- **Your home** - Unless you consent or it's an emergency
- **Private property** - Without proper authorization
- **Personal belongings** - Without reasonable cause

**Your Rights During Search:**
- **Ask to see the warrant** (if they claim to have one)
- **Refuse consent** - You can say "I do not consent to this search"
- **Witness requirement** - Two independent witnesses should be present
- **Receipt for seized items** - You must get a list of items taken
- **Right to remain silent** - Don't answer questions

**What to Do:**
- Stay calm and respectful
- Ask "Do you have a warrant?"
- If no warrant, say "I do not consent to this search"
- Document everything that happens
- Contact a lawyer immediately if rights are violated

**Remember:** Always consult a lawyer if you believe your rights were violated.`,
      sources: [
        { title: "Criminal Procedure Code - Section 100", type: "legal_concept" },
        { title: "Constitutional Rights", type: "constitutional" }
      ],
      category: "criminal_law",
      urgency: "high"
    };
  } else if (queryLower.includes("fir") || queryLower.includes("first information report")) {
    return {
      answer: `**How to File an FIR (First Information Report):**

**What is an FIR:**
- First Information Report is the initial complaint to police
- It sets the criminal law in motion
- Must be filed at the police station where the crime occurred

**How to File an FIR:**
1. **Go to the police station** where the crime occurred
2. **Ask for the duty officer** or station house officer
3. **Narrate your complaint** clearly and completely
4. **Provide all details** - date, time, place, people involved
5. **Sign the complaint** after reading it carefully
6. **Get a copy** of the FIR with stamp and signature

**What to Include in FIR:**
- Your name and address
- Date and time of incident
- Place where it happened
- Names of accused (if known)
- Description of what happened
- Names of witnesses (if any)

**If Police Refuse to Register FIR:**
- **Ask for written refusal** with reasons
- **File complaint to Superintendent of Police**
- **Approach the Magistrate** under Section 156(3) CrPC
- **Contact a lawyer** for legal assistance

**Important:** 
- Don't leave without getting a copy of the FIR
- Keep the FIR number safe for future reference
- You can file an FIR even if you don't know the accused

**Remember:** FIR is your right - police cannot refuse without valid reasons.`,
      sources: [
        { title: "Criminal Procedure Code - Section 154", type: "legal_concept" },
        { title: "Police Manual", type: "procedure" }
      ],
      category: "criminal_law",
      urgency: "high"
    };
  } else if (queryLower.includes("bail") && queryLower.includes("arrested")) {
    return {
      answer: `**How to Get Bail When Arrested:**

**Types of Bail:**
1. **Regular Bail** - After arrest, before trial
2. **Anticipatory Bail** - Before arrest (preventive)
3. **Interim Bail** - Temporary bail during proceedings

**Regular Bail Process:**
1. **File bail application** in the appropriate court
2. **Hire a lawyer** (recommended for better chances)
3. **Present arguments** for why bail should be granted
4. **Court decides** based on various factors

**Factors Courts Consider:**
- **Nature of offence** - Serious crimes get stricter scrutiny
- **Evidence against you** - Strong evidence may deny bail
- **Criminal history** - Previous convictions matter
- **Flight risk** - Will you appear for trial?
- **Witness tampering** - Risk of influencing witnesses
- **Public safety** - Risk to society if released

**Grounds for Bail:**
- **Bailable offences** - Right to bail
- **Non-bailable offences** - Court's discretion
- **Reasonable grounds** to believe you're not guilty
- **No risk** of absconding or tampering with evidence

**What to Do:**
- **Contact a lawyer immediately** after arrest
- **Gather character certificates** and references
- **Show strong community ties** (family, job, property)
- **Demonstrate you'll appear** for trial
- **Be prepared to give sureties** if required

**Important:** Bail is not acquittal - you must attend all court hearings.`,
      sources: [
        { title: "Criminal Procedure Code - Sections 436-450", type: "legal_concept" },
        { title: "Bail Guidelines", type: "procedure" }
      ],
      category: "criminal_law",
      urgency: "high"
    };
  } else if (queryLower.includes("anticipatory bail")) {
    return {
      answer: `**Anticipatory Bail - Protection Before Arrest:**

**What is Anticipatory Bail:**
- Protection against arrest before it happens
- Granted when you fear wrongful arrest
- Prevents harassment and protects reputation

**When to Apply:**
- **Fear of false arrest** in a case
- **Political vendetta** or personal enmity
- **Business disputes** leading to criminal complaints
- **Matrimonial disputes** with false allegations
- **Property disputes** with criminal complaints

**How to Apply:**
1. **File application** in High Court or Sessions Court
2. **Show reasonable apprehension** of arrest
3. **Provide grounds** why arrest is not justified
4. **Submit supporting documents**
5. **Court hears both sides** and decides

**Factors Courts Consider:**
- **Nature of allegations** - Seriousness of offence
- **Evidence available** - Strength of case against you
- **Your background** - Criminal history, character
- **Genuineness of fear** - Real apprehension vs. delaying tactics
- **Public interest** - Impact on investigation

**Conditions Usually Imposed:**
- **Cooperate with investigation**
- **Not leave the country** without permission
- **Not contact witnesses** or co-accused
- **Appear before police** when called
- **Not commit similar offences**

**Advantages:**
- **Protects from arrest** during investigation
- **Maintains reputation** and dignity
- **Allows normal life** while case is pending
- **Reduces harassment** and mental stress

**Important:** Apply before arrest - once arrested, you need regular bail.`,
      sources: [
        { title: "Criminal Procedure Code - Section 438", type: "legal_concept" },
        { title: "Supreme Court Guidelines", type: "precedent" }
      ],
      category: "criminal_law",
      urgency: "medium"
    };
  } else if (queryLower.includes("landlord") && queryLower.includes("evict")) {
    return {
      answer: `**Landlord Eviction Rights in India:**

**When Landlord CAN Evict:**
- **Non-payment of rent** for 2+ months
- **Subletting without permission**
- **Using property for illegal purposes**
- **Causing nuisance** to neighbors
- **Property damage** beyond normal wear
- **Landlord needs property** for personal use
- **Renovation/repair** requiring vacant possession

**Proper Eviction Process:**
1. **Notice period required** - Usually 30-90 days
2. **Written notice** with reasons for eviction
3. **Reasonable time** to vacate
4. **Court order** if tenant refuses to leave
5. **No force** - Cannot use physical force

**Tenant Rights:**
- **Right to notice** before eviction
- **Right to challenge** eviction in court
- **Right to reasonable time** to find alternative accommodation
- **Right to security deposit** return
- **Right to peaceful possession** until court order

**What to Do If Threatened with Eviction:**
1. **Check your lease agreement** for terms
2. **Pay rent on time** if that's the issue
3. **Get legal notice** in writing
4. **Consult a lawyer** immediately
5. **File case** if eviction is illegal
6. **Document everything** - notices, payments, communications

**Illegal Eviction Tactics to Watch For:**
- **Cutting electricity/water** supply
- **Changing locks** without notice
- **Threatening behavior** or harassment
- **Removing belongings** without permission
- **Physical force** or intimidation

**Remember:** Landlords cannot evict without following proper legal procedure.`,
      sources: [
        { title: "Rent Control Laws", type: "legal_concept" },
        { title: "Tenant Rights", type: "rights" }
      ],
      category: "property_law",
      urgency: "high"
    };
  } else if (queryLower.includes("terminate") && queryLower.includes("notice")) {
    return {
      answer: `**Employee Termination Rights in India:**

**Legal Termination Requirements:**
- **Written notice** required (usually 30-90 days)
- **Valid reasons** for termination
- **Proper procedure** must be followed
- **Severance pay** in many cases
- **No discrimination** based on protected categories

**Valid Reasons for Termination:**
- **Poor performance** after warnings and improvement time
- **Misconduct** - theft, fraud, violence, harassment
- **Absenteeism** without proper leave
- **Breach of company policies**
- **Redundancy** - job no longer exists
- **Business closure** or restructuring

**Employee Rights:**
- **Notice period** or pay in lieu
- **Severance pay** (if applicable)
- **Gratuity** (after 5 years of service)
- **Leave encashment** for unused leaves
- **Experience certificate** and relieving letter
- **No discrimination** based on caste, religion, gender, etc.

**What to Do If Terminated:**
1. **Get termination letter** in writing
2. **Ask for reasons** in writing
3. **Check if notice period** was given
4. **Calculate dues** - salary, leave, gratuity
5. **Get experience certificate**
6. **Consult a lawyer** if termination seems unfair

**Unfair Termination Grounds:**
- **No valid reason** provided
- **No notice period** given
- **Discrimination** based on protected categories
- **Retaliation** for whistleblowing
- **Pregnancy** or maternity leave
- **Union activities** or organizing

**Legal Remedies:**
- **File complaint** with Labor Commissioner
- **Approach Industrial Tribunal** (for covered establishments)
- **File civil suit** for damages
- **Approach High Court** for writ petition

**Important:** Document everything and get legal advice if termination seems unfair.`,
      sources: [
        { title: "Industrial Disputes Act", type: "legal_concept" },
        { title: "Payment of Gratuity Act", type: "legal_concept" }
      ],
      category: "employment_law",
      urgency: "high"
    };
  } else if (queryLower.includes("divorce") && queryLower.includes("grounds")) {
    return {
      answer: `**Grounds for Divorce in India:**

**Mutual Consent Divorce:**
- **Both parties agree** to divorce
- **Living separately** for 1+ years
- **No coercion** or pressure
- **Settlement** of all issues (maintenance, custody, property)
- **Faster process** - 6-18 months

**Fault-Based Grounds (Hindu Marriage Act):**
1. **Adultery** - Extra-marital relationship
2. **Cruelty** - Physical or mental cruelty
3. **Desertion** - Abandonment for 2+ years
4. **Conversion** to another religion
5. **Mental disorder** making cohabitation impossible
6. **Venereal disease** in communicable form
7. **Renunciation** of world (sanyas)
8. **Presumption of death** - missing for 7+ years

**Special Grounds for Wife:**
- **Bigamy** by husband
- **Rape, sodomy, or bestiality** by husband
- **Non-resumption of cohabitation** after maintenance order
- **Marriage before 15 years** of age

**Process for Divorce:**
1. **File petition** in appropriate court
2. **Serve notice** to other party
3. **Attempt reconciliation** (mandatory in some cases)
4. **Present evidence** and arguments
5. **Court decision** based on grounds and evidence

**Required Documents:**
- **Marriage certificate**
- **Address proof** of both parties
- **Evidence** supporting grounds for divorce
- **Witness statements** (if applicable)
- **Financial documents** for maintenance/alimony

**Important Considerations:**
- **Child custody** arrangements
- **Maintenance/alimony** calculations
- **Property division** and settlement
- **Future remarriage** implications
- **Social and family** impact

**Remember:** Divorce is a serious decision - consider counseling and mediation before filing.`,
      sources: [
        { title: "Hindu Marriage Act", type: "legal_concept" },
        { title: "Special Marriage Act", type: "legal_concept" }
      ],
      category: "family_law",
      urgency: "high"
    };
  } else if (queryLower.includes("consumer complaint")) {
    return {
      answer: `**How to File a Consumer Complaint:**

**What is Consumer Complaint:**
- Dispute with seller/service provider
- Defective products or poor services
- Unfair trade practices
- Overcharging or hidden charges

**Where to File:**
1. **District Consumer Forum** - Claims up to ₹20 lakhs
2. **State Commission** - Claims ₹20 lakhs to ₹1 crore
3. **National Commission** - Claims above ₹1 crore

**How to File Complaint:**
1. **Draft complaint** with all details
2. **Attach supporting documents**
3. **Pay filing fee** (varies by claim amount)
4. **Submit to appropriate forum**
5. **Attend hearings** when called

**Required Information:**
- **Your details** - name, address, contact
- **Opposite party details** - seller/service provider
- **Description of problem** - what went wrong
- **Relief sought** - refund, replacement, compensation
- **Supporting documents** - bills, receipts, correspondence

**Supporting Documents:**
- **Purchase receipts** and bills
- **Warranty cards** and guarantees
- **Correspondence** with seller
- **Photos/videos** of defective product
- **Expert reports** (if applicable)
- **Bank statements** showing payment

**Relief You Can Claim:**
- **Refund** of money paid
- **Replacement** of defective product
- **Repair** of product at seller's cost
- **Compensation** for mental harassment
- **Punitive damages** for unfair practices

**Process Timeline:**
- **Filing** - Same day
- **Notice to opposite party** - 1-2 weeks
- **Response time** - 30-45 days
- **Hearing and decision** - 3-6 months
- **Appeal period** - 30 days

**Advantages of Consumer Forum:**
- **No lawyer required** in most cases
- **Faster resolution** than civil courts
- **Lower costs** than regular courts
- **Consumer-friendly** procedures
- **Can claim compensation** for harassment

**Remember:** Keep all documents and correspondence for evidence.`,
      sources: [
        { title: "Consumer Protection Act", type: "legal_concept" },
        { title: "Consumer Rights", type: "rights" }
      ],
      category: "consumer_law",
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
