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

      // ===== GENERAL RIGHTS & CRIMINAL LAW =====
      if (queryLower.includes("arrested") && queryLower.includes("rights")) {
        response = {
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
        response = {
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
        response = {
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
        response = {
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
        response = {
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

      // ===== PROPERTY & TENANCY =====
      } else if (queryLower.includes("landlord") && queryLower.includes("evict")) {
        response = {
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
      } else if (queryLower.includes("security deposit") && queryLower.includes("tenant")) {
        response = {
          answer: `**Tenant Rights for Security Deposit:**

**Landlord's Obligations:**
- **Return deposit** within 30-60 days of vacating
- **Provide written statement** of deductions (if any)
- **Return full amount** if no damage beyond normal wear
- **Cannot withhold** without valid reasons

**Valid Reasons for Deductions:**
- **Unpaid rent** or utility bills
- **Damage beyond normal wear** and tear
- **Cleaning costs** if property left dirty
- **Repair costs** for tenant-caused damage
- **Breach of lease terms**

**What to Do Before Vacating:**
1. **Give proper notice** as per lease agreement
2. **Clean the property** thoroughly
3. **Take photos/videos** of condition
4. **Get landlord's inspection** in writing
5. **Pay all outstanding bills**
6. **Return all keys** and access cards

**If Landlord Refuses to Return Deposit:**
1. **Send written demand** with deadline
2. **Keep all documentation** - lease, receipts, photos
3. **File complaint** with Rent Control Authority
4. **Approach Consumer Court** (deposit is covered under consumer law)
5. **Send legal notice** through lawyer
6. **File civil suit** if necessary

**Documentation to Keep:**
- **Lease agreement** with deposit terms
- **Rent receipts** showing deposit payment
- **Photos/videos** of property condition
- **Communication records** with landlord
- **Utility bill receipts** showing payments

**Consumer Court Remedy:**
- **File complaint** under Consumer Protection Act
- **Faster resolution** than civil courts
- **Can claim compensation** for mental harassment
- **No need for lawyer** in most cases

**Remember:** Security deposit is your money - landlords cannot keep it without valid reasons.`,
          sources: [
            { title: "Consumer Protection Act", type: "legal_concept" },
            { title: "Rent Control Laws", type: "legal_concept" }
          ],
          category: "property_law",
          urgency: "medium"
        };
      } else if (queryLower.includes("property") && queryLower.includes("title")) {
        response = {
          answer: `**How to Check Property Title Before Buying:**

**Documents to Verify:**
1. **Sale Deed** - Current owner's purchase document
2. **Mother Deed** - Original property document
3. **Encumbrance Certificate** - Shows all transactions
4. **Property Tax Receipts** - Current tax payments
5. **Building Approval** - Municipal/development authority approval
6. **Land Use Certificate** - Zoning and land use permission

**Steps to Verify Title:**
1. **Visit Sub-Registrar Office** - Check registration records
2. **Get Encumbrance Certificate** - Shows all transactions for 30+ years
3. **Verify Chain of Ownership** - Check all previous owners
4. **Check for Pending Litigation** - Court cases or disputes
5. **Verify Land Use** - Residential, commercial, agricultural
6. **Check Building Approvals** - If constructed property

**Red Flags to Watch For:**
- **Missing documents** in the chain
- **Gaps in ownership** history
- **Pending court cases** or disputes
- **Multiple claimants** to the property
- **Encroachment** or boundary issues
- **Unauthorized construction**
- **Land use violations**

**Professional Help Needed:**
- **Lawyer** - To verify legal documents
- **Chartered Accountant** - For financial verification
- **Architect/Engineer** - For construction verification
- **Local Agent** - For area-specific information

**Important Checks:**
- **Seller's identity** and ownership proof
- **Property measurements** and boundaries
- **Outstanding dues** - taxes, maintenance, loans
- **Society/Association** membership (if applicable)
- **Future development** plans in the area

**Remember:** Never buy property without proper title verification - it's the most important step.`,
          sources: [
            { title: "Registration Act", type: "legal_concept" },
            { title: "Property Law", type: "legal_concept" }
          ],
          category: "property_law",
          urgency: "high"
        };

      // ===== EMPLOYMENT & WORKPLACE =====
      } else if (queryLower.includes("terminate") && queryLower.includes("notice")) {
        response = {
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
      } else if (queryLower.includes("salary") && queryLower.includes("withhold")) {
        response = {
          answer: `**Employer Cannot Withhold Salary Illegally:**

**When Salary Can Be Withheld:**
- **Court order** or attachment
- **Employee absconding** without notice
- **Company closure** due to financial issues
- **Disciplinary action** with proper procedure
- **Recovery of advances** or loans (with consent)

**When Salary CANNOT Be Withheld:**
- **As punishment** without proper procedure
- **For poor performance** without warnings
- **For personal disputes** or disagreements
- **For refusing illegal work**
- **For union activities** or organizing
- **For filing complaints** against employer

**Employee Rights:**
- **Timely payment** of salary (usually monthly)
- **Full payment** unless valid deductions
- **Written explanation** for any deductions
- **Payslip** showing all deductions
- **No arbitrary deductions** without notice

**What to Do If Salary Withheld:**
1. **Send written demand** for salary
2. **Keep attendance records** and work proof
3. **File complaint** with Labor Commissioner
4. **Approach Industrial Tribunal** (if applicable)
5. **Send legal notice** through lawyer
6. **File civil suit** for recovery

**Legal Remedies:**
- **Labor Commissioner** - Fast resolution
- **Industrial Tribunal** - For covered establishments
- **Civil Court** - For recovery of dues
- **High Court** - For writ petition
- **Criminal complaint** - For cheating/fraud

**Documentation Needed:**
- **Employment contract** or appointment letter
- **Salary slips** and payment records
- **Attendance records** and work proof
- **Communication** with employer
- **Bank statements** showing payments

**Remember:** Salary is your right - employers cannot withhold it without valid legal reasons.`,
          sources: [
            { title: "Payment of Wages Act", type: "legal_concept" },
            { title: "Minimum Wages Act", type: "legal_concept" }
          ],
          category: "employment_law",
          urgency: "high"
        };

      // ===== MARRIAGE & FAMILY LAW =====
      } else if (queryLower.includes("divorce") && queryLower.includes("grounds")) {
        response = {
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
      } else if (queryLower.includes("custody") && queryLower.includes("children")) {
        response = {
          answer: `**Child Custody in Divorce Cases:**

**Types of Custody:**
1. **Physical Custody** - Where child lives
2. **Legal Custody** - Decision-making authority
3. **Joint Custody** - Both parents share responsibilities
4. **Sole Custody** - One parent has primary responsibility

**Factors Courts Consider:**
- **Child's best interests** (paramount consideration)
- **Child's age** and preference (if old enough)
- **Parent's ability** to care for child
- **Financial stability** of each parent
- **Living conditions** and environment
- **Child's relationship** with each parent
- **Stability and continuity** in child's life
- **Any history** of abuse or neglect

**Custody Arrangements:**
- **Primary custody** - Child lives with one parent
- **Visitation rights** - Regular time with other parent
- **Shared custody** - Equal time with both parents
- **Supervised visitation** - If safety concerns exist

**Mother's Rights:**
- **Presumption in favor** of mother for young children
- **Equal rights** to custody and guardianship
- **Right to maintenance** for child's upbringing
- **Right to make decisions** about child's welfare

**Father's Rights:**
- **Equal consideration** for custody
- **Right to visitation** and involvement
- **Right to participate** in child's upbringing
- **Right to challenge** custody decisions

**Child's Rights:**
- **Right to maintain** relationship with both parents
- **Right to proper** care and upbringing
- **Right to education** and healthcare
- **Right to express** preferences (if mature enough)

**Modification of Custody:**
- **Change in circumstances** of either parent
- **Child's best interests** require change
- **Parent's inability** to care for child
- **Child's preference** (if older)

**Remember:** Custody decisions focus on child's welfare, not parent's rights.`,
          sources: [
            { title: "Guardian and Wards Act", type: "legal_concept" },
            { title: "Hindu Minority and Guardianship Act", type: "legal_concept" }
          ],
          category: "family_law",
          urgency: "high"
        };

      // ===== CONSUMER & CONTRACTS =====
      } else if (queryLower.includes("consumer complaint")) {
        response = {
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
      } else if (queryLower.includes("verbal agreement") && queryLower.includes("binding")) {
        response = {
          answer: `**Verbal Agreements - Legal Validity in India:**

**Are Verbal Agreements Binding?**
- **YES** - Verbal agreements are legally binding
- **Same legal force** as written agreements
- **Enforceable in court** if proven
- **Subject to same laws** as written contracts

**Requirements for Valid Verbal Agreement:**
- **Offer and acceptance** - Both parties agree
- **Consideration** - Something of value exchanged
- **Legal purpose** - Agreement must be lawful
- **Capacity** - Both parties must be competent
- **Mutual intent** - Both intend to be bound

**Challenges with Verbal Agreements:**
- **Difficult to prove** - No written evidence
- **Memory issues** - People forget details
- **Misunderstandings** - Different interpretations
- **Witness dependency** - Need witnesses to prove
- **Enforcement problems** - Harder to enforce

**When Verbal Agreements Work:**
- **Simple transactions** - Small purchases, services
- **Trusted relationships** - Family, close friends
- **Immediate performance** - Cash transactions
- **Customary practices** - Regular business dealings

**When Written is Better:**
- **Large amounts** - Significant money involved
- **Complex terms** - Detailed conditions
- **Long-term agreements** - Extended commitments
- **Property transactions** - Real estate deals
- **Business contracts** - Commercial agreements

**How to Prove Verbal Agreement:**
- **Witness testimony** - People who heard the agreement
- **Performance evidence** - Actions showing agreement
- **Correspondence** - Emails, messages, letters
- **Payment records** - Bank transfers, receipts
- **Circumstantial evidence** - Surrounding circumstances

**Tips for Verbal Agreements:**
- **Record conversations** (with consent)
- **Send follow-up messages** confirming terms
- **Keep witnesses** present during discussions
- **Document performance** - payments, deliveries
- **Convert to written** when possible

**Remember:** While verbal agreements are binding, written agreements are always safer and easier to enforce.`,
          sources: [
            { title: "Indian Contract Act", type: "legal_concept" },
            { title: "Contract Law", type: "legal_concept" }
          ],
          category: "contract_law",
          urgency: "medium"
        };

      // ===== GENERAL FALLBACK =====
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

**Important:** While I can provide general information, legal advice should come from a qualified attorney who knows your specific circumstances.`,
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
