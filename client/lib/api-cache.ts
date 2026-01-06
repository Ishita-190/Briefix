// Simple in-memory cache for API responses
type CacheEntry = {
  data: any;
  timestamp: number;
  expiresIn: number;
};
class ApiCache {
  private cache = new Map<string, CacheEntry>();
  private defaultTTL = 30 * 60 * 1000; // 30 minutes default TTL
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
  
  // Helper function to get age-appropriate response
  const getAgeAppropriateResponse = (adultResponse: string, level: string) => {
  if (level === "12-year-old") {
    // Simplify for 12-year-olds: shorter sentences, simpler words, fewer points
    let simpleResponse = adultResponse
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
      .replace(/Section \d+/g, 'the law')
      .replace(/Article \d+/g, 'the constitution')
      .replace(/CrPC/g, 'criminal law')
      .replace(/₹/g, 'rupees')
      .replace(/lakhs/g, 'hundreds of thousands')
      .replace(/crore/g, 'millions');
    // Split into lines and shorten long lists (keep only 2-3 items max)
    const lines = simpleResponse.split('\n').filter(l => l.trim() !== '');
    const shortened = lines.map(l => {
      if (l.startsWith('-') || /^\d+\./.test(l)) {
        return l; // keep simple list items
      }
      return l;
    });
    // For very long lists, just keep first 3 points
    const finalText = shortened
      .join('\n')
      .replace(/((?:- .*\n){4,})/g, (match) => {
        const items = match.trim().split('\n');
        return items.slice(0, 3).join('\n') + "\n- (and more, but ask a grown-up to explain)";
      });
    return "Here's a simple explanation:\n\n" + finalText +
      "\n\nNote: If this feels hard to understand, that's okay. Please ask a grown-up you trust to guide you.";
  } else if (level === "15-year-old") {
    // Keep most formatting but simplify complex legal terms
    let teenResponse = adultResponse
      .replace(/Section (\d+)/g, 'Section $1 (a part of the law)')
      .replace(/Article (\d+)/g, 'Article $1 (a part of the constitution)')
      .replace(/\bCrPC\b/g, 'Criminal Procedure Code (rules for criminal cases)')
      .replace(/₹/g, '₹')
      .replace(/\blakhs\b/g, 'lakhs (about ₹100,000)')
      .replace(/\bcrore\b/g, 'crore (about ₹10,000,000)');
    return "Here's a clear explanation in simple terms:\n\n" + teenResponse +
      "\n\nNote: If you want to understand this better, you can ask a teacher, parent, or an older friend to explain more.";
  }
  return adultResponse; // Keep original for lawyer level
};
  
  // ===== EXPANDED KEYWORD SETS =====
  
  // Arrest Rights Keywords
  const arrestKeywords = [
    "arrest", "arrested", "detained", "taken into custody", "police custody", 
    "police taking", "held by police", "caught by police", "apprehended",
    "apprehend", "captured", "in custody", "behind bars", "locked up",
    "handcuffed", "under arrest", "police took me", "taken away"
  ];
  const rightsKeywords = [
    "rights", "legal rights", "law", "legal protection", "entitlements",
    "protection", "legal help", "legal aid", "what are my rights", "my rights",
    "legal entitlements", "constitutional rights", "fundamental rights",
    "legal safeguards", "legal recourse", "legal options"
  ];
  
  // Search Warrant Keywords
  const searchKeywords = [
    "search", "raids", "house search", "home search", "property search",
    "police search", "inspection", "confiscation", "seizure", "raid",
    "searched", "searching", "inspect", "seize", "seized", "confiscate",
    "raided", "entered my home", "came to my house", "looking for evidence"
  ];
  const warrantKeywords = [
    "warrant", "court order", "permission from court", "authorization", "legal document",
    "permission", "authorization", "legal paper", "document", "search order",
    "warrant required", "without warrant", "need warrant", "search permission"
  ];
  
  // FIR Keywords
  const firKeywords = [
    "fir", "first information report", "register complaint", "complaint police", "file fir",
    "police complaint", "report crime", "lodge complaint", "file case", "register case",
    "how to file fir", "report incident", "police report", "complaint registration",
    "lodge fir", "register fir", "complaint procedure"
  ];
  
  // Bail Keywords
  const bailKeywords = [
    "bail", "get bail", "release from jail", "anticipatory bail", "regular bail",
    "interim bail", "after arrest", "bail bond", "surety", "bail application",
    "apply for bail", "bail hearing", "bail granted", "bail denied", "get out of jail",
    "released", "release", "temporary release", "bail procedure"
  ];
  
  // Anticipatory Bail Keywords
  const anticipatoryKeywords = [
    "anticipatory bail", "bail before arrest", "prevent arrest", "protection from arrest",
    "fear of arrest", "pre-arrest bail", "pre arrest", "before arrest", "avoid arrest",
    "preventive bail", "arrest protection", "anticipatory", "pre arrest protection"
  ];
  
  // Legal Notice Keywords
  const legalNoticeKeywords = [
    "legal notice", "lawyer notice", "advocate notice", "legal letter", "notice from lawyer",
    "received notice", "legal document", "court notice", "official notice", "legal warning",
    "notice received", "lawyer's notice", "legal communication", "formal notice"
  ];
  
  // Police Misconduct Keywords
  const policeMisconductKeywords = [
    "police misconduct", "police complaint", "police harassment", "police brutality",
    "police corruption", "file complaint against police", "police misbehavior",
    "police abuse", "police violence", "police wrongdoing", "report police",
    "police complaint procedure", "police grievance", "police misconduct report"
  ];
  
  // Police Custody Keywords
  const policeCustodyKeywords = [
    "custody", "police custody", "custody time", "how long in custody", "police remand",
    "custody period", "in custody", "detention period", "custody rules", "custody limits",
    "time in custody", "custody duration", "how long can police keep"
  ];
  
  // Landlord Eviction Keywords
  const landlordEvictionKeywords = [
    "landlord", "evict", "eviction", "evicted", "eviction notice", "thrown out",
    "kicked out", "landlord removing me", "vacate notice", "asked to leave",
    "forced to leave", "eviction process", "eviction rights", "tenant eviction"
  ];
  
  // Security Deposit Keywords
  const securityDepositKeywords = [
    "security deposit", "tenant", "deposit", "deposit return", "get deposit back",
    "landlord keeping deposit", "deposit not returned", "security deposit refund",
    "rental deposit", "deposit refund", "deposit issues", "landlord deposit"
  ];
  
  // Property Title Keywords
  const propertyTitleKeywords = [
    "property", "title", "property title", "title search", "property verification",
    "check property", "property documents", "clear title", "title deed", "property ownership",
    "buying property", "property purchase", "title verification", "property due diligence"
  ];
  
  // Termination Notice Keywords
  const terminationKeywords = [
    "terminate", "termination", "notice", "fired", "sacked", "dismissed",
    "terminated", "lost job", "job termination", "employment termination", "layoff",
    "fired from job", "let go", "employment ended", "job ended"
  ];
  
  // Salary Withhold Keywords
  const salaryKeywords = [
    "salary", "withhold", "salary not paid", "unpaid salary", "employer not paying",
    "salary due", "salary pending", "wages not paid", "salary withheld", "payment due",
    "unpaid wages", "salary issues", "employer not releasing salary"
  ];
  
  // Divorce Grounds Keywords
  const divorceKeywords = [
    "divorce", "grounds", "divorce grounds", "divorce reasons", "divorce cause",
    "reasons for divorce", "file for divorce", "divorce procedure", "divorce process",
    "divorce law", "divorce eligibility", "divorce requirements"
  ];
  
  // Alimony/Custody Keywords
  const alimonyCustodyKeywords = [
    "alimony", "divorce", "separation", "custody", "maintenance", "children",
    "child support", "child custody", "custody of child", "divorce settlement",
    "separation agreement", "child maintenance", "parental rights", "child access"
  ];
  
  // Consumer Complaint Keywords
  const consumerKeywords = [
    "consumer complaint", "consumer forum", "consumer court", "file complaint",
    "product complaint", "service complaint", "defective product", "consumer rights",
    "consumer protection", "consumer issue", "complaint against company", "service problem"
  ];
  
  // Verbal Agreement Keywords
  const verbalAgreementKeywords = [
    "verbal agreement", "oral agreement", "spoken agreement", "verbal contract",
    "oral contract", "agreement without writing", "spoken contract", "verbal understanding",
    "oral understanding", "verbal promise", "oral promise"
  ];
  
  // ===== GENERAL RIGHTS & CRIMINAL LAW =====
  if (arrestKeywords.some(kw => queryLower.includes(kw)) && 
      rightsKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `
    Your Rights When Arrested by Police in India:
    Immediate Rights:
    - Right to know the reason for arrest (Article 22(1))
    - Right to remain silent
    - Right to legal representation
    - Right to inform family/friend about your arrest
    - Right to medical examination if needed
    What Police Must Do:
    - Inform you of the grounds of arrest
    - Take you to the nearest magistrate within 24 hours
    - Allow you to contact a lawyer
    - Provide you with a copy of the arrest memo
    
    What You Should Do:
    - Stay calm and don't resist arrest
    - Ask for the reason for arrest
    - Request to call a lawyer immediately
    - Ask to inform your family
    - Don't sign any documents without reading
    - Remember: "I want to speak to my lawyer"
    
    Important: These rights apply to everyone, including foreigners. If your rights are violated, document everything and contact a lawyer immediately.
    `;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Constitutional Rights - Article 22", type: "constitutional" },
        { title: "Criminal Procedure Code", type: "legal_concept" }
      ],
      category: "criminal_law",
      urgency: "high"
    };
  } else if (searchKeywords.some(kw => queryLower.includes(kw)) &&
             warrantKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `
Police Search Without Warrant - Your Rights:
When Police CAN Search Without Warrant:
- Arrest situations: During lawful arrest
- Hot pursuit: Chasing a suspect
- Consent given: If you voluntarily allow
- Emergency situations: To prevent crime or injury
- Vehicle searches: If there's reasonable suspicion
When Police CANNOT Search Without Warrant:
- Your home: Unless you consent or it's an emergency
- Private property: Without proper authorization
- Personal belongings: Without reasonable cause
Your Rights During Search:
- Ask to see the warrant (if they claim to have one)
- Refuse consent: You can say "I do not consent to this search"
- Witness requirement: Two independent witnesses should be present
- Receipt for seized items: You must get a list of items taken
- Right to remain silent: Don't answer questions
What to Do:
- Stay calm and respectful
- Ask "Do you have a warrant?"
- If no warrant, say "I do not consent to this search"
- Document everything that happens
- Contact a lawyer immediately if rights are violated
Remember: Always consult a lawyer if you believe your rights were violated.
`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Constitutional Rights - Article 21", type: "constitutional" },
        { title: "Criminal Procedure Code", type: "legal_concept" }
      ],
      category: "criminal_law",
      urgency: "high"
    };
  } else if (firKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `How to File an FIR (First Information Report):
What is an FIR:
- First Information Report is the initial complaint to police
- It sets the criminal law in motion
- Must be filed at the police station where the crime occurred
How to File an FIR:
1. Go to the police station where the crime occurred
2. Ask for the duty officer or station house officer
3. Narrate your complaint clearly and completely
4. Provide all details - date, time, place, people involved
5. Sign the complaint after reading it carefully
6. Get a copy of the FIR with stamp and signature
What to Include in FIR:
- Your name and address
- Date and time of incident
- Place where it happened
- Names of accused (if known)
- Description of what happened
- Names of witnesses (if any)
If Police Refuse to Register FIR:
- Ask for written refusal with reasons
- File complaint to Superintendent of Police
- Approach the Magistrate under Section 156(3) CrPC
- Contact a lawyer for legal assistance
Important: 
- Don't leave without getting a copy of the FIR
- Keep the FIR number safe for future reference
- You can file an FIR even if you don't know the accused
Remember: FIR is your right - police cannot refuse without valid reasons.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Criminal Procedure Code - Section 154", type: "legal_concept" },
        { title: "Police Manual", type: "procedure" }
      ],
      category: "criminal_law",
      urgency: "high"
    };
  } else if (bailKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `How to Get Bail When Arrested:
Types of Bail:
1. Regular Bail - After arrest, before trial
2. Anticipatory Bail - Before arrest (preventive)
3. Interim Bail - Temporary bail during proceedings
Regular Bail Process:
1. File bail application in the appropriate court
2. Hire a lawyer (recommended for better chances)
3. Present arguments for why bail should be granted
4. Court decides based on various factors
Factors Courts Consider:
Nature of offence - Serious crimes get stricter scrutiny
Evidence against you - Strong evidence may deny bail
Criminal history - Previous convictions matter
Flight risk - Will you appear for trial?
Witness tampering - Risk of influencing witnesses
Public safety - Risk to society if released
Grounds for Bail:
Bailable offences - Right to bail
Non-bailable offences - Court's discretion
Reasonable grounds to believe you're not guilty
No risk of absconding or tampering with evidence
What to Do:
Contact a lawyer immediately after arrest
Gather character certificates and references
Show strong community ties (family, job, property)
Demonstrate that you'll appear for trial
Be prepared to give sureties if required
Important: Bail is not acquittal - you must attend all court hearings.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Criminal Procedure Code - Sections 436-450", type: "legal_concept" },
        { title: "Bail Guidelines", type: "procedure" }
      ],
      category: "criminal_law",
      urgency: "high"
    };
  } else if (anticipatoryKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `Anticipatory Bail - Protection Before Arrest:
What is Anticipatory Bail:
- Protection against arrest before it happens
- Granted when you fear wrongful arrest
- Prevents harassment and protects reputation
When to Apply:
- Fear of false arrest in a case
- Political vendetta or personal enmity
- Business disputes leading to criminal complaints
- Matrimonial disputes with false allegations
- Property disputes with criminal complaints
How to Apply:
1. File application in High Court or Sessions Court
2. Show reasonable apprehension of arrest
3. Provide grounds why arrest is not justified
4. Submit supporting documents
5. Court hears both sides and decides
Factors Courts Consider:
- Nature of allegations - Seriousness of offence
- Evidence available - Strength of case against you
- Your background - Criminal history, character
- Genuineness of fear - Real apprehension vs. delaying tactics
- Public interest - Impact on investigation
Conditions Usually Imposed:
- Cooperate with investigation
- Not leave the country without permission
- Not contact witnesses or co-accused
- Appear before police when called
- Not commit similar offences
Advantages:
- Protects from arrest during investigation
- Maintains reputation and dignity
- Allows normal life while case is pending
- Reduces harassment and mental stress
Important: Apply before arrest - once arrested, you need regular bail.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Criminal Procedure Code - Section 438", type: "legal_concept" },
        { title: "Supreme Court Guidelines", type: "precedent" }
      ],
      category: "criminal_law",
      urgency: "medium"
    };
  } else if (legalNoticeKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `What to Do When You Receive a Legal Notice:
What is a Legal Notice:
- Formal communication from lawyer/opposite party
- Usually sent before filing a case
- Gives you opportunity to respond or settle
Types of Legal Notices:
- Cease and Desist - Stop doing something
- Demand Notice - Pay money or perform action
- Eviction Notice - Vacate property
- Employment Notice - Termination or warning
- Divorce Notice - Intent to file for divorce
Immediate Steps:
1. Don't panic - Legal notices are common
2. Read carefully - Understand what's being demanded
3. Note the deadline - Usually 15-30 days to respond
4. Don't ignore - Always respond within deadline
5. Consult a lawyer - Get professional advice
How to Respond:
1. Send reply through your lawyer
2. Address each point mentioned in notice
3. Provide your side of the story
4. Include supporting documents
5. Send by registered post with acknowledgment
What NOT to Do:
- Don't ignore the notice
- Don't respond emotionally or aggressively
- Don't admit liability without legal advice
- Don't delay beyond the deadline
- Don't communicate directly with opposite party
When to Take Legal Action:
- False allegations in the notice
- Unreasonable demands being made
- Threatening language or harassment
- Notice sent without basis
Remember: Legal notices are serious - always respond through a lawyer.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Civil Procedure Code", type: "legal_concept" },
        { title: "Legal Notice Guidelines", type: "procedure" }
      ],
      category: "civil_law",
      urgency: "high"
    };
  } else if (policeMisconductKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `How to File Complaint Against Police Misconduct:
Types of Police Misconduct:
- Physical assault or torture
- Illegal detention beyond 24 hours
- Refusing to register FIR
- Demanding bribes or money
- Harassment or intimidation
- Fabricating evidence
- Unlawful search or seizure
Where to File Complaint:
1. Superintendent of Police (SP) - District level
2. Deputy Inspector General (DIG) - Regional level
3. Inspector General (IG) - State level
4. State Human Rights Commission - For human rights violations
5. National Human Rights Commission - For serious violations
6. Magistrate - Under Section 156(3) CrPC
How to File Complaint:
1. Write detailed complaint with all facts
2. Include evidence - photos, videos, medical reports
3. Mention witnesses if any
4. Send by registered post with acknowledgment
5. Keep copy of complaint and receipt
6. Follow up regularly
Required Information:
- Your details - name, address, contact
- Police officer details - name, rank, station
- Date and time of incident
- Detailed description of what happened
- Evidence - documents, photos, witnesses
- Relief sought - action against officer, compensation
Evidence to Collect:
- Medical reports if injured
- Photos/videos of incident or injuries
- Witness statements in writing
- Correspondence with police
- Receipts for any payments demanded
- Audio recordings if available
Legal Remedies:
- Criminal complaint against police officer
- Writ petition in High Court
- Civil suit for damages
- Human rights complaint for violations
- Public Interest Litigation (PIL)
Important: Document everything and file complaint immediately after incident.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Police Act", type: "legal_concept" },
        { title: "Human Rights Protection", type: "rights" }
      ],
      category: "criminal_law",
      urgency: "high"
    };
  } else if (policeCustodyKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `Police Custody Time Limits in India:
Maximum Custody Periods:
- Police Custody - Maximum 15 days total
- Judicial Custody - Can be extended by court
- First Production - Before magistrate within 24 hours
- Remand Extension - Court can extend judicial custody
Police Custody Rules:
- 24-hour rule - Must produce before magistrate within 24 hours
- 15-day limit - Total police custody cannot exceed 15 days
- Reasons required - Court must give reasons for extending custody
- Legal aid - Right to free legal representation
- Medical check - Right to medical examination
Your Rights During Custody:
- Right to know why you're in custody
- Right to lawyer - Free legal aid if needed
- Right to medical care if required
- Right to inform family about arrest
- Right to meet lawyer in private
- Right to food and basic amenities
What Police Must Do:
- Produce before magistrate within 24 hours
- Inform grounds of arrest
- Allow legal representation
- Provide basic facilities - food, water, toilet
- Maintain custody diary with all details
- Allow family visits as per rules
Judicial Custody Process:
1. First production - Before magistrate within 24 hours
2. Remand hearing - Court decides custody extension
3. Arguments - Both sides present their case
4. Court order - Extends or denies custody
5. Regular review - Custody reviewed periodically
Bail During Custody:
- Bailable offences - Right to bail
- Non-bailable offences - Court's discretion
- Anticipatory bail - Can apply before arrest
- Regular bail - After arrest, during custody
Important: Police cannot keep you beyond 24 hours without court order.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Criminal Procedure Code - Section 167", type: "legal_concept" },
        { title: "Constitutional Rights - Article 22", type: "constitutional" }
      ],
      category: "criminal_law",
      urgency: "high"
    };
  } else if (landlordEvictionKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `Landlord Eviction Rights in India:
When Landlord CAN Evict:
- Non-payment of rent for 2+ months
- Subletting without permission
- Using property for illegal purposes
- Causing nuisance to neighbors
- Property damage beyond normal wear
- Landlord needs property for personal use
- Renovation/repair requiring vacant possession
Proper Eviction Process:
1. Notice period required - Usually 30-90 days
2. Written notice with reasons for eviction
3. Reasonable time to vacate
4. Court order if tenant refuses to leave
5. No force - Cannot use physical force
Tenant Rights:
- Right to notice before eviction
- Right to challenge eviction in court
- Right to reasonable time to find alternative accommodation
- Right to security deposit return
- Right to peaceful possession until court order
What to Do If Threatened with Eviction:
1. Check your lease agreement for terms
2. Pay rent on time if that's the issue
3. Get legal notice in writing
4. Consult a lawyer immediately
5. File case if eviction is illegal
6. Document everything - notices, payments, communications
Illegal Eviction Tactics to Watch For:
- Cutting electricity/water supply
- Changing locks without notice
- Threatening behavior or harassment
- Removing belongings without permission
- Physical force or intimidation
Remember: Landlords cannot evict without following proper legal procedure.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Rent Control Laws", type: "legal_concept" },
        { title: "Tenant Rights", type: "rights" }
      ],
      category: "property_law",
      urgency: "high"
    };
  } else if (securityDepositKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `Tenant Rights for Security Deposit:
Landlord's Obligations:
- Return deposit within 30-60 days of vacating
- Provide written statement of deductions (if any)
- Return full amount if no damage beyond normal wear
- Cannot withhold without valid reasons
Valid Reasons for Deductions:
- Unpaid rent or utility bills
- Damage beyond normal wear and tear
- Cleaning costs if property left dirty
- Repair costs for tenant-caused damage
- Breach of lease terms
What to Do Before Vacating:
1. Give proper notice as per lease agreement
2. Clean the property thoroughly
3. Take photos/videos of condition
4. Get landlord's inspection in writing
5. Pay all outstanding bills
6. Return all keys and access cards
If Landlord Refuses to Return Deposit:
1. Send written demand with deadline
2. Keep all documentation - lease, receipts, photos
3. File complaint with Rent Control Authority
4. Approach Consumer Court (deposit is covered under consumer law)
5. Send legal notice through lawyer
6. File civil suit if necessary
Documentation to Keep:
- Lease agreement with deposit terms
- Rent receipts showing deposit payment
- Photos/videos of property condition
- Communication records with landlord
- Utility bill receipts showing payments
Consumer Court Remedy:
- File complaint under Consumer Protection Act
- Faster resolution than civil courts
- Can claim compensation for mental harassment
- No need for lawyer in most cases
Remember: Security deposit is your money - landlords cannot keep it without valid reasons.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Consumer Protection Act", type: "legal_concept" },
        { title: "Rent Control Laws", type: "legal_concept" }
      ],
      category: "property_law",
      urgency: "medium"
    };
  } else if (propertyTitleKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `How to Check Property Title Before Buying:
Documents to Verify:
1. Sale Deed - Current owner's purchase document
2. Mother Deed - Original property document
3. Encumbrance Certificate - Shows all transactions
4. Property Tax Receipts - Current tax payments
5. Building Approval - Municipal/development authority approval
6. Land Use Certificate - Zoning and land use permission
Steps to Verify Title:
1. Visit Sub-Registrar Office - Check registration records
2. Get Encumbrance Certificate - Shows all transactions for 30+ years
3. Verify Chain of Ownership - Check all previous owners
4. Check for Pending Litigation - Court cases or disputes
5. Verify Land Use - Residential, commercial, agricultural
6. Check Building Approvals - If constructed property
Red Flags to Watch For:
- Missing documents in the chain
- Gaps in ownership history
- Pending court cases or disputes
- Multiple claimants to the property
- Encroachment or boundary issues
- Unauthorized construction
- Land use violations
Professional Help Needed:
- Lawyer - To verify legal documents
- Chartered Accountant - For financial verification
- Architect/Engineer - For construction verification
- Local Agent - For area-specific information
Important Checks:
- Seller's identity and ownership proof
- Property measurements and boundaries
- Outstanding dues - taxes, maintenance, loans
- Society/Association membership (if applicable)
- Future development plans in the area
Remember: Never buy property without proper title verification - it's the most important step.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Registration Act", type: "legal_concept" },
        { title: "Property Law", type: "legal_concept" }
      ],
      category: "property_law",
      urgency: "high"
    };
  } else if (terminationKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `Employee Termination Rights in India:
Legal Termination Requirements:
- Written notice required (usually 30-90 days)
- Valid reasons for termination
- Proper procedure must be followed
- Severance pay in many cases
- No discrimination based on protected categories
Valid Reasons for Termination:
- Poor performance after warnings and improvement time
- Misconduct - theft, fraud, violence, harassment
- Absenteeism without proper leave
- Breach of company policies
- Redundancy - job no longer exists
- Business closure or restructuring
Employee Rights:
- Notice period or pay in lieu
- Severance pay (if applicable)
- Gratuity (after 5 years of service)
- Leave encashment for unused leaves
- Experience certificate and relieving letter
- No discrimination based on caste, religion, gender, etc.
What to Do If Terminated:
1. Get termination letter in writing
2. Ask for reasons in writing
3. Check if notice period was given
4. Calculate dues - salary, leave, gratuity
5. Get experience certificate
6. Consult a lawyer if termination seems unfair
Unfair Termination Grounds:
- No valid reason provided
- No notice period given
- Discrimination based on protected categories
- Retaliation for whistleblowing
- Pregnancy or maternity leave
- Union activities or organizing
Legal Remedies:
- File complaint with Labor Commissioner
- Approach Industrial Tribunal (for covered establishments)
- File civil suit for damages
- Approach High Court for writ petition
Important: Document everything and get legal advice if termination seems unfair.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Industrial Disputes Act", type: "legal_concept" },
        { title: "Payment of Gratuity Act", type: "legal_concept" }
      ],
      category: "employment_law",
      urgency: "high"
    };
  } else if (salaryKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `Employer Cannot Withhold Salary Illegally:
When Salary Can Be Withheld:
- Court order or attachment
- Employee absconding without notice
- Company closure due to financial issues
- Disciplinary action with proper procedure
- Recovery of advances or loans (with consent)
When Salary CANNOT Be Withheld:
- As punishment without proper procedure
- For poor performance without warnings
- For personal disputes or disagreements
- For refusing illegal work
- For union activities or organizing
- For filing complaints against employer
Employee Rights:
- Timely payment of salary (usually monthly)
- Full payment unless valid deductions
- Written explanation for any deductions
- Payslip showing all deductions
- No arbitrary deductions without notice
What to Do If Salary Withheld:
1. Send written demand for salary
2. Keep attendance records and work proof
3. File complaint with Labor Commissioner
4. Approach Industrial Tribunal (if applicable)
5. Send legal notice through lawyer
6. File civil suit for recovery
Legal Remedies:
- Labor Commissioner - Fast resolution
- Industrial Tribunal - For covered establishments
- Civil Court - For recovery of dues
- High Court - For writ petition
- Criminal complaint - For cheating/fraud
Documentation Needed:
- Employment contract or appointment letter
- Salary slips and payment records
- Attendance records and work proof
- Communication with employer
- Bank statements showing payments
Remember: Salary is your right - employers cannot withhold it without valid legal reasons.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Payment of Wages Act", type: "legal_concept" },
        { title: "Minimum Wages Act", type: "legal_concept" }
      ],
      category: "employment_law",
      urgency: "high"
    };
  } else if (divorceKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `Grounds for Divorce in India:
Mutual Consent Divorce:
- Both parties agree to divorce
- Living separately for 1+ years
- No coercion or pressure
- Settlement of all issues (maintenance, custody, property)
- Faster process - 6-18 months
Fault-Based Grounds (Hindu Marriage Act):
1. Adultery - Extra-marital relationship
2. Cruelty - Physical or mental cruelty
3. Desertion - Abandonment for 2+ years
4. Conversion to another religion
5. Mental disorder making cohabitation impossible
6. Venereal disease in communicable form
7. Renunciation of world (sanyas)
8. Presumption of death - missing for 7+ years
Special Grounds for Wife:
- Bigamy by husband
- Rape, sodomy, or bestiality by husband
- Non-resumption of cohabitation after maintenance order
- Marriage before 15 years of age
Process for Divorce:
1. File petition in appropriate court
2. Serve notice to other party
3. Attempt reconciliation (mandatory in some cases)
4. Present evidence and arguments
5. Court decision based on grounds and evidence
Required Documents:
- Marriage certificate
- Address proof of both parties
- Evidence supporting grounds for divorce
- Witness statements (if applicable)
- Financial documents for maintenance/alimony
Important Considerations:
- Child custody arrangements
- Maintenance/alimony calculations
- Property division and settlement
- Future remarriage implications
- Social and family impact
Remember: Divorce is a serious decision - consider counseling and mediation before filing.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Hindu Marriage Act", type: "legal_concept" },
        { title: "Special Marriage Act", type: "legal_concept" }
      ],
      category: "family_law",
      urgency: "high"
    };
  } else if (alimonyCustodyKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `Child Custody in India:
Types of Custody:
1. Physical Custody - Where child lives
2. Legal Custody - Decision-making authority
3. Joint Custody - Both parents share responsibilities
4. Sole Custody - One parent has primary responsibility
Factors Courts Consider:
Child's best interests (paramount consideration)
Child's age and preference (if old enough)
Parent's ability to care for child
Financial stability of each parent
Living conditions and environment
Child's relationship with each parent
Stability and continuity in child's life
Any history of abuse or neglect
Custody Arrangements:
Primary custody - Child lives with one parent
Visitation rights - Regular time with other parent
Shared custody - Equal time with both parents
Supervised visitation - If safety concerns exist
Mother's Rights:
Presumption in favor of mother for young children
Equal rights to custody and guardianship
Right to maintenance for child's upbringing
Right to make decisions about child's welfare
Father's Rights:
Equal consideration for custody
Right to visitation and involvement
Right to participate in child's upbringing
Right to challenge custody decisions
Child's Rights:
Right to maintain relationship with both parents
Right to proper care and upbringing
Right to education and healthcare
Right to express preferences (if mature enough)
Modification of Custody:
Change in circumstances of either parent
Child's best interests require change
Parent's inability to care for child
Child's preference (if older)
Remember: Custody decisions focus on child's welfare, not parent's rights.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Guardian and Wards Act", type: "legal_concept" },
        { title: "Hindu Minority and Guardianship Act", type: "legal_concept" }
      ],
      category: "family_law",
      urgency: "high"
    };
  } else if (consumerKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `How to File a Consumer Complaint:
What is Consumer Complaint:
- Dispute with seller/service provider
- Defective products or poor services
- Unfair trade practices
- Overcharging or hidden charges
Where to File:
1. District Consumer Forum - Claims up to ₹20 lakhs
2. State Commission - Claims ₹20 lakhs to ₹1 crore
3. National Commission - Claims above ₹1 crore
How to File Complaint:
1. Draft complaint with all details
2. Attach supporting documents
3. Pay filing fee (varies by claim amount)
4. Submit to appropriate forum
5. Attend hearings when called
Required Information:
Your details - name, address, contact
Opposite party details - seller/service provider
Description of problem - what went wrong
Relief sought - refund, replacement, compensation
Supporting documents - bills, receipts, correspondence
Supporting Documents:
Purchase receipts and bills
Warranty cards and guarantees
Correspondence with seller
Photos/videos of defective product
Expert reports (if applicable)
Bank statements showing payment
Relief You Can Claim:
- Refund of money paid
- Replacement of defective product
- Repair of product at seller's cost
- Compensation for mental harassment
- Punitive damages for unfair practices
Process Timeline:
- Filing - Same day
- Notice to opposite party - 1-2 weeks
- Response time - 30-45 days
- Hearing and decision - 3-6 months
- Appeal period - 30 days
Advantages of Consumer Forum:
- No lawyer required in most cases
- Faster resolution than civil courts
- Lower costs than regular courts
- Consumer-friendly procedures
- Can claim compensation for harassment
Remember: Keep all documents and correspondence for evidence.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Consumer Protection Act", type: "legal_concept" },
        { title: "Consumer Rights", type: "rights" }
      ],
      category: "consumer_law",
      urgency: "medium"
    };
  } else if (verbalAgreementKeywords.some(kw => queryLower.includes(kw))) {
    const adultResponse = `Verbal Agreements - Legal Validity in India:
Are Verbal Agreements Binding?
- YES - Verbal agreements are legally binding
- Same legal force as written agreements
- Enforceable in court if proven
- Subject to same laws as written contracts
Requirements for Valid Verbal Agreement:
- Offer and acceptance - Both parties agree
- Consideration - Something of value exchanged
- Legal purpose - Agreement must be lawful
- Capacity - Both parties must be competent
- Mutual intent - Both intend to be bound
Challenges with Verbal Agreements:
- Difficult to prove - No written evidence
- Memory issues - People forget details
- Misunderstandings - Different interpretations
- Witness dependency - Need witnesses to prove
- Enforcement problems - Harder to enforce
When Verbal Agreements Work:
- Simple transactions - Small purchases, services
- Trusted relationships - Family, close friends
- Immediate performance - Cash transactions
- Customary practices - Regular business dealings
When Written is Better:
- Large amounts - Significant money involved
- Complex terms - Detailed conditions
- Long-term agreements - Extended commitments
- Property transactions - Real estate deals
- Business contracts - Commercial agreements
How to Prove Verbal Agreement:
- Witness testimony - People who heard the agreement
- Performance evidence - Actions showing agreement
- Correspondence - Emails, messages, letters
- Payment records - Bank transfers, receipts
- Circumstantial evidence - Surrounding circumstances
Tips for Verbal Agreements:
- Record conversations (with consent)
- Send follow-up messages confirming terms
- Keep witnesses present during discussions
- Document performance - payments, deliveries
- Convert to written when possible
Remember: While verbal agreements are binding, written agreements are always safer and easier to enforce.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
      sources: [
        { title: "Indian Contract Act", type: "legal_concept" },
        { title: "Contract Law", type: "legal_concept" }
      ],
      category: "contract_law",
      urgency: "medium"
    };
  } else {
    // General legal guidance for other questions
    const adultResponse = `I understand you're asking about "${query}". This is an important legal question that deserves a thorough answer.
Here's what I can tell you:
Legal matters can be complex and the specific answer depends on your unique situation, location, and circumstances. What might be true in one case may not apply to another.
My recommendation:
1. Consult with a qualified lawyer who specializes in this area of law
2. Research your specific jurisdiction's laws - laws vary by state/country
3. Document everything related to your situation
4. Don't rely solely on online information for important legal decisions
For your specific question about "${query}":
- This may involve multiple areas of law
- The answer could depend on your specific facts
- There might be recent changes in the law
- Your location could affect the outcome
Next steps:
- Schedule a consultation with a lawyer
- Bring all relevant documents
- Be prepared to discuss your specific situation
- Ask about costs and payment options
Important: While I can provide general information, legal advice should come from a qualified attorney who knows your specific circumstances.`;
    return {
      answer: getAgeAppropriateResponse(adultResponse, level),
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
  error?: boolean;
  fallback?: boolean;
}> {
  const cacheKey = `${question}:${level}`;
  // Try to get from cache first if enabled
  if (useCache) {
    const cached = apiCache.get<{
      answer: string;
      sources: any[];
      category?: string;
      urgency?: string;
    }>(cacheKey);
    if (cached) {
      console.log("Using cached response for:", question);
      return cached;
    }
  }
  try {
    // Try to fetch from API
    const response = await fetch('/.netlify/functions/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: question,
        level: level
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Cache the successful response
    if (useCache) {
      apiCache.set(cacheKey, data);
    }
    
    return {
      answer: data.answer,
      sources: data.sources || [],
      category: data.category,
      urgency: data.urgency
    };
  } catch (error) {
    console.error('Error calling API, using fallback:', error);
    
    // Get fallback response when API fails
    const fallbackResponse = getFallbackResponse(question, level);
    
    // Cache the fallback response with shorter TTL (5 minutes)
    if (useCache) {
      apiCache.set(cacheKey, fallbackResponse, undefined, 5 * 60 * 1000);
    }
    
    return {
      ...fallbackResponse,
      fallback: true
    };
  }
}
