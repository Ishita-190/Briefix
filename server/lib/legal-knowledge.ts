// Comprehensive Legal Knowledge Base
import {
  getConstitutionalReferences,
  formatConstitutionalReferences,
  formatStatutoryBasis,
  getStatutoryBasis,
} from "./constitutional-law";

export interface LegalAnswer {
  answer: string;
  category: string;
  urgency: "low" | "medium" | "high";
  sources: Array<{
    title: string;
    type: "procedure" | "statute" | "guidance" | "practical" | "constitutional";
  }>;
  constitutionalReferences?: boolean;
}

export const LEGAL_KNOWLEDGE_BASE = {
  // Civil Litigation & Being Sued
  sued: {
    keywords: [
      "sued",
      "lawsuit",
      "civil case",
      "litigation",
      "court summons",
      "legal notice",
    ],
    answer: `If you're being sued, take these immediate steps:

1. **Don't ignore it** - Respond within the time limit (usually 30 days)
2. **Read everything carefully** - Understand what you're being accused of
3. **Gather documents** - Collect all relevant papers, contracts, emails
4. **Consider hiring a lawyer** - Especially if the amount is significant
5. **Respond formally** - File an answer to the complaint or hire a lawyer to do so
6. **Explore settlement** - Many cases settle out of court

**Immediate actions:**
- Note all deadlines from court documents
- Don't contact the other party directly
- Document everything related to the case
- Consider your insurance (some policies cover legal costs)

**Remember:** Ignoring a lawsuit typically results in a default judgment against you.`,
    category: "Civil Procedure",
    urgency: "high" as const,
    sources: [
      { title: "Civil Procedure Guidelines", type: "procedure" as const },
      { title: "Court Response Requirements", type: "guidance" as const },
    ],
  },

  // Contract Law
  contract: {
    keywords: [
      "contract",
      "agreement",
      "breach",
      "terms",
      "obligation",
      "binding",
    ],
    answer: `**Contracts** are legally binding agreements between parties. Key elements:

1. **Offer** - One party proposes terms
2. **Acceptance** - Other party agrees to terms  
3. **Consideration** - Something of value exchanged
4. **Legal capacity** - Parties can legally enter contracts
5. **Legal purpose** - Agreement must be for lawful activities

**Contract Issues:**
- **Breach**: When someone doesn't fulfill their obligations
- **Remedies**: Money damages, specific performance, cancellation
- **Written vs Oral**: Some contracts must be written (real estate, over certain amounts)

**If you have contract problems:**
- Review the contract terms carefully
- Document any breach or issues
- Try to resolve through communication first
- Consider mediation before litigation
- Consult a lawyer for significant contracts`,
    category: "Contract Law",
    urgency: "medium" as const,
    sources: [
      { title: "Contract Formation Principles", type: "statute" as const },
      { title: "Breach of Contract Remedies", type: "guidance" as const },
    ],
  },

  // Criminal Law Basics
  criminal: {
    keywords: [
      "criminal",
      "arrest",
      "police",
      "rights",
      "charged",
      "bail",
      "custody",
    ],
    answer: `**Your Rights if Arrested or Questioned:**

1. **Right to remain silent** - You don't have to answer questions
2. **Right to an attorney** - Ask for a lawyer immediately
3. **Right to know charges** - Police must tell you why you're arrested
4. **Right to bail** - In most cases, you can be released on bail

**If arrested:**
- Stay calm and cooperate physically (don't resist)
- Clearly say "I want a lawyer" 
- Don't sign anything without legal counsel
- Don't discuss your case with anyone except your lawyer

**Police questioning:**
- You can refuse to answer questions
- Ask "Am I free to leave?" - if yes, you can go
- If detained, ask for a lawyer immediately

**Important:** Even if you're innocent, get legal representation. The legal system is complex and having a lawyer protects your rights.`,
    category: "Criminal Law",
    urgency: "high" as const,
    sources: [
      { title: "Constitutional Rights", type: "statute" as const },
      { title: "Police Interaction Guidelines", type: "practical" as const },
    ],
  },

  // Employment Law
  employment: {
    keywords: [
      "fired",
      "workplace",
      "discrimination",
      "harassment",
      "wrongful termination",
      "wages",
    ],
    answer: `**Employment Issues** - Common workplace legal matters:

**Wrongful Termination:**
- At-will employment means you can be fired for any legal reason
- Illegal reasons include: discrimination, retaliation, refusing illegal acts
- Document everything if you suspect wrongful termination

**Discrimination/Harassment:**
- Based on protected classes (race, gender, age, religion, etc.)
- Report to HR and keep records
- File complaints with equal employment agencies
- Consider legal action for severe cases

**Wage Issues:**
- You must be paid for all hours worked
- Overtime pay for eligible employees
- Unpaid wages can often be recovered

**Steps to take:**
1. Keep detailed records of incidents
2. Follow company complaint procedures
3. File complaints with relevant agencies
4. Consult an employment attorney if needed`,
    category: "Employment Law",
    urgency: "medium" as const,
    sources: [
      { title: "Employment Rights Overview", type: "guidance" as const },
      { title: "Workplace Protection Laws", type: "statute" as const },
    ],
  },

  // Personal Injury
  injury: {
    keywords: [
      "accident",
      "injury",
      "medical malpractice",
      "slip and fall",
      "car accident",
      "negligence",
    ],
    answer: `**Personal Injury Claims** - When someone else's negligence causes you harm:

**Immediate Steps:**
1. **Get medical attention** - Your health comes first
2. **Document everything** - Photos, witness info, police reports
3. **Report the incident** - To relevant authorities/businesses
4. **Keep records** - Medical bills, lost wages, expenses
5. **Don't admit fault** - Let investigations determine cause

**Types of Personal Injury:**
- Car accidents
- Slip and falls
- Medical malpractice
- Product defects
- Workplace injuries

**Legal Elements:**
- Duty of care owed to you
- Breach of that duty
- Causation linking breach to injury
- Actual damages/harm

**Important:** Many personal injury lawyers work on contingency (no fee unless you win). Insurance companies often make low initial offers - consider legal consultation before accepting.`,
    category: "Personal Injury",
    urgency: "medium" as const,
    sources: [
      { title: "Negligence Standards", type: "statute" as const },
      { title: "Personal Injury Procedures", type: "practical" as const },
    ],
  },

  // Family Law
  family: {
    keywords: [
      "divorce",
      "custody",
      "child support",
      "alimony",
      "marriage",
      "separation",
    ],
    answer: `**Family Law Matters** - Legal issues involving family relationships:

**Divorce:**
- No-fault vs fault-based divorce options
- Division of property and debts
- Spousal support considerations
- Child custody and support arrangements

**Child Custody:**
- Best interests of the child standard
- Physical vs legal custody
- Visitation rights for non-custodial parent
- Modification of custody orders

**Child Support:**
- Both parents have financial obligations
- Based on income and custody arrangements
- Enforceable through wage garnishment
- Can be modified if circumstances change

**Important Considerations:**
- Try mediation before litigation when possible
- Keep detailed financial records
- Document parenting time and communications
- Focus on children's best interests
- Consider collaborative divorce options

**Urgent situations** (domestic violence, child abuse): Contact authorities immediately and seek emergency protective orders.`,
    category: "Family Law",
    urgency: "medium" as const,
    sources: [
      { title: "Family Court Procedures", type: "procedure" as const },
      { title: "Child Welfare Standards", type: "guidance" as const },
      {
        title: "Constitutional Rights in Family Law",
        type: "constitutional" as const,
      },
    ],
    constitutionalReferences: true,
  },

  // Alimony/Maintenance - Specific topic
  alimony: {
    keywords: [
      "alimony",
      "maintenance",
      "spousal support",
      "wife maintenance",
      "husband maintenance",
      "divorce settlement",
    ],
    answer: `**Alimony/Maintenance** - Financial support after marriage dissolution:

**Constitutional Foundation:**
Alimony laws are grounded in constitutional principles ensuring dignity and equality. The right to maintenance derives from the fundamental right to life with dignity under Article 21.

**Types of Maintenance:**
- **Interim Maintenance**: During divorce proceedings
- **Permanent Alimony**: After divorce decree
- **Rehabilitative Support**: Temporary support for skill development
- **Lump Sum Settlement**: One-time payment instead of periodic payments

**Factors Considered:**
- Income and earning capacity of both spouses
- Standard of living during marriage
- Duration of marriage
- Age and health of both parties
- Contribution to household (financial and non-financial)
- Future financial needs and obligations

**Legal Framework:**
- Hindu Marriage Act, 1955 (Section 25)
- Special Marriage Act, 1954 (Section 36)
- Code of Criminal Procedure, 1973 (Section 125)
- Muslim Personal Law provisions

**How to Apply:**
1. File petition in family court
2. Submit financial affidavits
3. Provide evidence of lifestyle and needs
4. Attend mediation if court-ordered
5. Present case at hearing

**Important Rights:**
- Both men and women can claim maintenance
- Right exists regardless of fault in divorce
- Can be modified based on changed circumstances
- Enforcement through court orders if unpaid`,
    category: "Alimony/Maintenance",
    urgency: "medium" as const,
    sources: [
      { title: "Hindu Marriage Act, 1955", type: "statute" as const },
      {
        title: "Constitutional Rights to Dignity",
        type: "constitutional" as const,
      },
      { title: "Family Court Procedures", type: "procedure" as const },
    ],
    constitutionalReferences: true,
  },

  // Citizen's Arrest
  citizenArrest: {
    keywords: [
      "citizen arrest",
      "citizens arrest",
      "private person arrest",
      "arrest without warrant",
      "civilian arrest",
    ],
    answer: `**Citizen's Arrest** - When private individuals can make arrests:

**Constitutional Framework:**
Citizen's arrest must balance public safety with fundamental rights under Articles 19(1)(d) (freedom of movement) and Article 21 (personal liberty).

**Legal Authority:**
Under Section 43 of Code of Criminal Procedure, 1973, any private person may arrest someone who:
- Commits a cognizable offense in their presence
- Is a proclaimed offender
- Has committed a non-bailable and cognizable offense

**When Citizen's Arrest is Allowed:**
- Witnessing a serious crime in progress
- Preventing escape of someone who committed a crime
- Protecting yourself or others from immediate harm
- When police are not immediately available

**Legal Requirements:**
- Must hand over arrested person to police immediately
- Cannot detain beyond reasonable time for police arrival
- Must inform person of reason for arrest
- Cannot use excessive force
- Must respect constitutional rights of arrested person

**Prohibited Actions:**
- Cannot arrest for minor offenses or civil disputes
- Cannot arrest based on suspicion alone
- Cannot interrogate or punish the person
- Cannot search without legal authority

**Risks and Responsibilities:**
- False arrest can lead to civil and criminal liability
- May face assault charges if excessive force used
- Must be certain about the crime and identity
- Better to be witness and call police when possible

**Constitutional Protections:**
Even during citizen's arrest, person retains rights under Article 22 including right to know grounds of arrest and right to legal representation.`,
    category: "Citizen's Arrest",
    urgency: "high" as const,
    sources: [
      { title: "Code of Criminal Procedure, 1973", type: "statute" as const },
      {
        title: "Constitutional Rights During Arrest",
        type: "constitutional" as const,
      },
      { title: "Citizens' Legal Powers", type: "guidance" as const },
    ],
    constitutionalReferences: true,
  },

  // Legal Procedures and Due Process
  legalProcedures: {
    keywords: [
      "legal procedure",
      "legal process",
      "due process",
      "court procedure",
      "legal steps",
      "how to file case",
    ],
    answer: `**Legal Procedures** - Understanding court processes and due process rights:

**Constitutional Foundation:**
Article 21 guarantees due process - fair and just legal procedures. Article 14 ensures equal treatment in all legal proceedings.

**Basic Legal Procedure Steps:**
1. **Case Filing**: Submit petition/complaint with required documents
2. **Service of Notice**: Other party must be properly informed
3. **Written Statements**: Parties submit their positions
4. **Discovery**: Exchange of evidence and documents
5. **Hearings**: Court examines evidence and arguments
6. **Judgment**: Court's final decision
7. **Appeal**: Option to challenge decision in higher court

**Due Process Rights:**
- Right to be heard (audi alteram partem)
- Right to fair and impartial tribunal
- Right to legal representation
- Right to examine evidence
- Right to cross-examine witnesses
- Right to reasoned decision

**Civil vs Criminal Procedures:**
- **Civil**: Disputes between private parties (CPC 1908)
- **Criminal**: State prosecuting crimes (CrPC 1973)
- **Different standards**: Preponderance vs beyond reasonable doubt

**Court Hierarchy:**
- **Supreme Court**: Final appellate court
- **High Courts**: State-level constitutional courts
- **District Courts**: Trial courts for serious matters
- **Magistrate Courts**: Minor criminal and civil matters

**Access to Justice:**
- Article 39A mandates free legal aid for poor
- Legal Services Authorities provide free lawyers
- Court fee waivers available for indigent persons

**Key Procedural Safeguards:**
- Proper notice before any adverse action
- Opportunity to present case
- Unbiased decision-maker
- Reasoned judgment with legal basis
- Right to appeal adverse decisions`,
    category: "Legal Procedures",
    urgency: "medium" as const,
    sources: [
      { title: "Code of Civil Procedure, 1908", type: "statute" as const },
      { title: "Due Process Rights", type: "constitutional" as const },
      { title: "Court Practice Manual", type: "procedure" as const },
    ],
    constitutionalReferences: true,
  },

  // Name Change Procedures
  nameChange: {
    keywords: [
      "name change",
      "change name",
      "legal name change",
      "name change process",
      "affidavit for name change",
    ],
    answer: `**Name Change Process** - Legal procedure to officially change your name:

**Constitutional Right:**
Article 19(1)(a) protects freedom of expression including personal identity. Article 21 includes right to dignity and personal autonomy, supporting name change rights.

**Legal Methods for Name Change:**
1. **Gazette Notification** (Most common)
2. **Newspaper Advertisement**
3. **Affidavit** (for minor changes)
4. **Court Order** (for complex cases)

**Gazette Notification Process:**
1. **Prepare Affidavit**: State old name, new name, and reason
2. **Newspaper Publication**: Advertise name change in local newspaper
3. **Apply to Gazette Office**: Submit application with required documents
4. **Government Gazette**: Official publication of name change
5. **Update Documents**: Use gazette notification to update all records

**Required Documents:**
- Proof of identity (Aadhaar, passport, etc.)
- Proof of address
- Birth certificate
- Educational certificates
- Two passport-size photographs
- Affidavit for name change
- Newspaper cutting of advertisement

**Acceptable Reasons:**
- Religious conversion
- Marriage (adding spouse's surname)
- Personal preference
- Correcting spelling errors
- Cultural or traditional reasons
- Professional requirements

**Documents to Update After Name Change:**
- Aadhaar card
- PAN card
- Passport
- Driving license
- Bank accounts
- Educational certificates
- Employment records
- Property documents

**Legal Protections:**
- Cannot change name to defraud others
- Cannot adopt names that are offensive
- Must not violate any existing laws
- Previous legal obligations continue

**Time Frame:**
- Gazette publication: 2-3 months
- Document updates: 1-2 months each
- Total process: 4-6 months typically`,
    category: "Name Change",
    urgency: "low" as const,
    sources: [
      { title: "Registration Act, 1908", type: "statute" as const },
      {
        title: "Constitutional Right to Identity",
        type: "constitutional" as const,
      },
      { title: "Name Change Guidelines", type: "procedure" as const },
    ],
    constitutionalReferences: true,
  },

  // Paperwork and Documentation
  paperwork: {
    keywords: [
      "paperwork",
      "documents",
      "documentation",
      "government documents",
      "legal documents",
      "document verification",
    ],
    answer: `**Legal Paperwork and Documentation** - Understanding document requirements and rights:

**Constitutional Rights:**
Article 19(1)(a) includes right to information. Article 21 protects livelihood rights requiring access to necessary documents. Article 14 ensures equal access to government services.

**Essential Legal Documents:**
1. **Identity Documents**: Aadhaar, PAN, Passport, Voter ID
2. **Address Proof**: Utility bills, bank statements, rent agreement
3. **Income Proof**: Salary slips, ITR, bank statements
4. **Educational**: Certificates, mark sheets, degrees
5. **Property**: Sale deed, property tax receipts, mutation papers
6. **Legal**: Contracts, agreements, court orders

**Document Rights Under RTI Act 2005:**
- Right to obtain copies of government documents
- Right to information about application status
- Right to know reasons for document rejection
- Right to appeal document-related decisions

**Common Documentation Issues:**
- **Spelling Errors**: Can be corrected through affidavits
- **Missing Documents**: Alternatives like self-attestation may work
- **Verification Problems**: Know your rights and appeal processes
- **Delays**: Use RTI to track applications

**Document Verification Process:**
1. **Submit Application**: With required documents and fees
2. **Initial Scrutiny**: Officials check completeness
3. **Field Verification**: May involve physical verification
4. **Approval/Rejection**: Decision with reasons
5. **Appeal Rights**: If rejected, can appeal to higher authority

**Legal Protections:**
- Right to receive documents within prescribed time
- Right to appeal arbitrary rejection
- Protection against harassment by officials
- Right to file complaint for delay or corruption

**When Documents are Wrongly Rejected:**
- File appeal with higher authority
- Use RTI to get rejection reasons
- Approach consumer forums for poor service
- File writ petition if constitutional rights violated

**Digital Documentation:**
- DigiLocker for secure document storage
- Digital signatures for legal validity
- Online verification of government documents
- Blockchain-based document authentication (emerging)

**Document Safety:**
- Keep multiple copies (physical and digital)
- Notarize important documents
- Use bank lockers for originals
- Regular backup of digital documents`,
    category: "Documentation Rights",
    urgency: "low" as const,
    sources: [
      { title: "Right to Information Act, 2005", type: "statute" as const },
      {
        title: "Constitutional Right to Information",
        type: "constitutional" as const,
      },
      { title: "Document Procedures Manual", type: "procedure" as const },
    ],
    constitutionalReferences: true,
  },

  // Landlord-Tenant Issues
  housing: {
    keywords: [
      "landlord",
      "tenant",
      "rent",
      "eviction",
      "deposit",
      "lease",
      "housing",
      "apartment",
    ],
    answer: `**Landlord-Tenant Law** - Rights and responsibilities in rental housing:

**Tenant Rights:**
- Right to habitable living conditions
- Right to privacy (landlord must give notice before entering)
- Protection from discrimination
- Right to get security deposit back
- Protection from illegal rent increases

**Common Issues:**
- **Repairs**: Landlord must maintain property in livable condition
- **Security Deposits**: Must be returned within specified time (usually 30 days)
- **Eviction**: Landlord must follow legal process, can't just lock you out
- **Rent Increases**: Must follow local laws and lease terms

**If You're Being Evicted:**
1. Read all notices carefully
2. Respond within required timeframe
3. Consider legal aid assistance
4. Document any landlord violations
5. Don't ignore court papers

**Steps to Take:**
- Keep all communications in writing
- Take photos of any problems
- Pay rent on time and keep records
- Know your local tenant rights laws
- Contact local tenant rights organizations`,
    category: "Housing Law",
    urgency: "medium" as const,
    sources: [
      { title: "Tenant Rights Guidelines", type: "guidance" as const },
      { title: "Housing Code Violations", type: "procedure" as const },
    ],
  },

  // Consumer Rights
  consumer: {
    keywords: [
      "scam",
      "fraud",
      "warranty",
      "return",
      "refund",
      "defective",
      "consumer",
      "purchase",
    ],
    answer: `**Consumer Rights** - Protection when buying goods and services:

**Your Rights:**
- Right to honest advertising
- Right to safe products
- Right to refunds for defective goods
- Protection from fraud and scams
- Right to dispute credit card charges

**Common Consumer Issues:**
- **Defective Products**: You can return or get refund for items that don't work
- **False Advertising**: Companies can't lie about their products
- **Warranty Claims**: Manufacturers must honor warranty promises
- **Online Purchases**: Special rules for internet and phone sales

**If You've Been Scammed:**
1. Stop all payments immediately
2. Contact your bank or credit card company
3. Report to Federal Trade Commission (FTC)
4. Keep all documentation
5. Consider filing police report for fraud

**Steps to Protect Yourself:**
- Read contracts before signing
- Keep receipts and warranties
- Research companies before buying
- Be suspicious of 'too good to be true' deals
- Use credit cards (not debit) for better protection`,
    category: "Consumer Law",
    urgency: "medium" as const,
    sources: [
      { title: "Consumer Protection Act", type: "statute" as const },
      { title: "FTC Guidelines", type: "guidance" as const },
    ],
  },

  // Debt and Bankruptcy
  debt: {
    keywords: [
      "debt",
      "bankruptcy",
      "collection",
      "garnishment",
      "credit",
      "loan",
      "foreclosure",
    ],
    answer: `**Debt and Financial Issues** - Dealing with money problems:

**Debt Collection Rights:**
- Collectors can't harass or threaten you
- They can't call at unreasonable hours
- You can request they stop calling
- They must prove you owe the debt
- You can dispute incorrect debts

**Options When You Can't Pay:**
- **Negotiate**: Contact creditors to arrange payment plans
- **Credit Counseling**: Non-profit agencies can help
- **Debt Consolidation**: Combine debts into one payment
- **Bankruptcy**: Legal process to eliminate or reduce debts

**Bankruptcy Basics:**
- **Chapter 7**: Eliminates most debts quickly
- **Chapter 13**: Payment plan over 3-5 years
- **Automatic Stay**: Stops collection actions
- **Credit Impact**: Affects credit score for several years

**Immediate Steps:**
1. List all debts and income
2. Prioritize essential expenses (housing, food, utilities)
3. Contact creditors before you fall behind
4. Avoid debt settlement scams
5. Consider free credit counseling

**Warning Signs**: If facing foreclosure or wage garnishment, seek legal help immediately.`,
    category: "Debt/Bankruptcy",
    urgency: "high" as const,
    sources: [
      { title: "Fair Debt Collection Practices Act", type: "statute" as const },
      { title: "Bankruptcy Code", type: "statute" as const },
    ],
  },

  // Small Claims Court
  smallclaims: {
    keywords: [
      "small claims",
      "court",
      "sue",
      "money owed",
      "dispute",
      "judgment",
    ],
    answer: `**Small Claims Court** - Resolving disputes for smaller amounts of money:

**What is Small Claims Court:**
- Court for disputes involving smaller amounts (usually under $5,000-$10,000)
- Simpler procedures, no lawyers needed
- Faster and cheaper than regular court
- Good for: unpaid debts, property damage, contract disputes

**How to File:**
1. **Try to resolve first** - Send demand letter
2. **Determine correct court** - Usually where defendant lives or incident occurred
3. **Fill out forms** - Available at courthouse or online
4. **Pay filing fee** - Usually under $100
5. **Serve defendant** - Officially notify them of lawsuit

**Preparing Your Case:**
- Organize all documents (contracts, receipts, photos)
- Bring witnesses if possible
- Practice explaining your case clearly
- Calculate exact amount owed
- Be ready to explain why defendant owes you money

**At Court:**
- Arrive early and dress professionally
- Present facts clearly and calmly
- Let judge ask questions
- Bring copies of all documents

**After Winning:**
- Court gives you judgment, not money
- You may need to collect payment separately
- Options include wage garnishment or bank levy`,
    category: "Small Claims",
    urgency: "low" as const,
    sources: [
      { title: "Small Claims Procedures", type: "procedure" as const },
      { title: "Court Self-Help Guide", type: "guidance" as const },
    ],
  },

  // When Do I Need a Lawyer - Specific guidance
  needLawyer: {
    keywords: [
      "need a lawyer",
      "need lawyer",
      "hire lawyer",
      "get lawyer",
      "find lawyer",
      "do i need attorney",
      "should i get lawyer",
      "when to hire lawyer",
      "lawyer necessary",
    ],
    answer: `**How to Know if You Need a Lawyer:**

**🚨 You DEFINITELY need a lawyer if:**
- **Criminal charges** - Any arrest, criminal investigation, or charges
- **Being sued** - Someone filed a lawsuit against you
- **Immigration issues** - Deportation, visa problems, asylum cases
- **Serious injury** - Accidents causing significant medical bills/disability
- **Divorce with complexity** - Children, significant assets, or contested issues
- **Employment termination** - After filing discrimination complaints
- **Estate planning** - Wills, trusts, or inheritance disputes
- **Business formation** - Partnerships, corporations, or significant contracts

**⚠️ You PROBABLY need a lawyer if:**
- **Contract disputes** involving significant money (over $5,000)
- **Real estate transactions** - Buying, selling, or major lease agreements
- **Tax problems** - IRS audits, tax liens, or significant back taxes
- **Bankruptcy** - Considering filing for debt relief
- **Child custody/support** - Any disputes involving children
- **Workplace discrimination** - Filing EEOC complaints or facing retaliation
- **Personal injury** - Someone else's negligence caused your injury
- **Complex legal documents** - Reviewing or drafting important agreements

**✅ You MIGHT handle yourself if:**
- **Small claims court** - Disputes under $5,000-$10,000
- **Simple traffic tickets** - Minor violations without serious consequences
- **Basic consumer complaints** - Defective products, service issues
- **Name changes** - Straightforward administrative processes
- **Uncontested divorce** - No children, minimal assets, mutual agreement
- **Simple wills** - Basic estate planning with clear wishes

**💡 Key Decision Factors:**

**1. Potential Consequences:** Could you face jail time, lose your home, job, or children? If yes, get a lawyer.

**2. Money at Stake:** Is more than $1,000 involved? Consider professional help.

**3. Complexity:** Are there complex laws, procedures, or constitutional issues? You likely need help.

**4. Opposition:** Is the other party represented by a lawyer? You should be too.

**5. Time Sensitivity:** Are there strict deadlines you might miss? Lawyers know the rules.

**6. Emotional Stakes:** High emotions can cloud judgment - objective legal advice helps.

**🎯 Quick Assessment Questions:**
- **"Could this ruin my life?"** → Get a lawyer immediately
- **"Could this cost me a lot of money?"** → Consult a lawyer
- **"Am I confused by the legal process?"** → Get help
- **"Do I have time to research thoroughly?"** → If no, hire help
- **"Is this just a minor annoyance?"** → You might handle it yourself

**💰 Finding Affordable Legal Help:**
- **Legal Aid** - Free help for low-income individuals
- **Bar Association Referrals** - Often include reduced-rate programs
- **Law School Clinics** - Students supervised by professors
- **Pro Bono Programs** - Lawyers volunteering their time
- **Limited Scope Representation** - Lawyers help with specific parts only
- **Legal Insurance** - Available through some employers

**⏰ When in Doubt, Act Quickly:**
Legal problems often have strict deadlines. It's better to consult a lawyer early and learn you don't need one than to wait too long and lose important rights.

**Remember:** A brief consultation (many lawyers offer free initial consultations) can help you understand your situation and decide if you need ongoing legal help.`,
    category: "Lawyer Guidance",
    urgency: "medium" as const,
    sources: [
      { title: "Legal Profession Guidelines", type: "guidance" as const },
      { title: "Access to Justice Resources", type: "practical" as const },
      { title: "Bar Association Standards", type: "guidance" as const },
    ],
  },

  // Immigration Issues
  immigration: {
    keywords: [
      "immigration",
      "visa",
      "green card",
      "citizenship",
      "deportation",
      "asylum",
    ],
    answer: `**Immigration Law** - Issues related to citizenship and legal status:

**Common Immigration Matters:**
- **Visa Applications**: Different types for work, family, study
- **Green Card**: Permanent residence applications
- **Citizenship**: Naturalization process and requirements
- **Deportation Defense**: Fighting removal proceedings
- **Asylum**: Protection for those fleeing persecution

**If Facing Deportation:**
1. **Get a lawyer immediately** - Immigration law is very complex
2. **Don't sign anything** without understanding it
3. **Keep all documents** safe and organized
4. **Know your rights** - Right to interpreter, right to lawyer
5. **Don't discuss case** with ICE without lawyer present

**Important Rights:**
- Right to remain silent
- Right to an attorney (you must pay for it)
- Right to an interpreter
- Right to contact your consulate
- Right to see evidence against you

**Family-Based Immigration:**
- US citizens can petition for spouses, children, parents, siblings
- Permanent residents can petition for spouses and unmarried children
- Process can take months to years

**Work-Based Immigration:**
- Employer sponsorship usually required
- Different categories based on job skills
- Labor certification may be needed

**URGENT**: Immigration issues often have strict deadlines. Get qualified legal help immediately.`,
    category: "Immigration",
    urgency: "high" as const,
    sources: [
      { title: "Immigration and Nationality Act", type: "statute" as const },
      { title: "USCIS Guidelines", type: "guidance" as const },
    ],
  },

  // Traffic and DUI
  traffic: {
    keywords: [
      "traffic ticket",
      "dui",
      "dwi",
      "speeding",
      "license",
      "suspended",
      "driving",
    ],
    answer: `**Traffic and DUI Issues** - Dealing with driving-related legal problems:

**Traffic Tickets:**
- **Options**: Pay fine, fight ticket, or attend traffic school
- **Fighting Tickets**: You can contest in court
- **Points System**: Too many points can suspend license
- **Insurance**: Tickets often increase insurance rates

**DUI/DWI (Driving Under Influence):**
- **Serious Criminal Charge**: Can result in jail time
- **License Suspension**: Automatic suspension even before trial
- **Two Cases**: Criminal court and DMV hearing
- **Penalties**: Fines, jail, license loss, ignition interlock

**If Arrested for DUI:**
1. **Exercise right to remain silent**
2. **Request an attorney immediately**
3. **Request DMV hearing** within 10 days (to save license)
4. **Don't discuss case** with anyone except lawyer
5. **Document everything** you remember

**License Suspension:**
- **Administrative**: DMV can suspend license separate from court
- **Hardship License**: May be available for work/school
- **Reinstatement**: Must meet all requirements to get license back

**Prevention:**
- Never drive under influence of alcohol or drugs
- Use rideshare, taxi, or designated driver
- Know that prescription drugs can also cause DUI

**IMPORTANT**: DUI has serious long-term consequences. Get experienced legal help immediately.`,
    category: "Traffic/DUI",
    urgency: "high" as const,
    sources: [
      { title: "Vehicle Code", type: "statute" as const },
      { title: "DUI Defense Guidelines", type: "guidance" as const },
    ],
  },
};

// Enhanced query understanding for better responses
export function getQueryIntent(query: string): {
  intent: string;
  urgency: "low" | "medium" | "high";
  needsLawyer: boolean;
  specificGuidance: string;
} {
  const lowerQuery = query.toLowerCase();

  // Lawyer-related queries
  if (
    lowerQuery.includes("need a lawyer") ||
    lowerQuery.includes("need lawyer") ||
    lowerQuery.includes("hire lawyer") ||
    lowerQuery.includes("get lawyer") ||
    lowerQuery.includes("find lawyer") ||
    lowerQuery.includes("do i need attorney")
  ) {
    return {
      intent: "findLawyer",
      urgency: "medium",
      needsLawyer: true,
      specificGuidance: "lawyer_guidance",
    };
  }

  // Legal process questions
  if (
    lowerQuery.includes("how to file") ||
    lowerQuery.includes("legal process") ||
    lowerQuery.includes("court procedure") ||
    lowerQuery.includes("what should i do")
  ) {
    return {
      intent: "legalProcess",
      urgency: "medium",
      needsLawyer: false,
      specificGuidance: "process_guidance",
    };
  }

  // Rights-related queries
  if (
    lowerQuery.includes("my rights") ||
    lowerQuery.includes("what are my rights") ||
    lowerQuery.includes("legal rights") ||
    lowerQuery.includes("constitutional rights")
  ) {
    return {
      intent: "rights",
      urgency: "medium",
      needsLawyer: false,
      specificGuidance: "rights_guidance",
    };
  }

  // Emergency situations
  if (
    lowerQuery.includes("arrested") ||
    lowerQuery.includes("detained") ||
    lowerQuery.includes("police") ||
    lowerQuery.includes("custody") ||
    lowerQuery.includes("emergency")
  ) {
    return {
      intent: "emergency",
      urgency: "high",
      needsLawyer: true,
      specificGuidance: "emergency_guidance",
    };
  }

  return {
    intent: "general",
    urgency: "low",
    needsLawyer: false,
    specificGuidance: "general_guidance",
  };
}

// Query classification
export function classifyQuery(query: string): string {
  const lowerQuery = query.toLowerCase();

  // More specific matching for better classification
  for (const [category, data] of Object.entries(LEGAL_KNOWLEDGE_BASE)) {
    for (const keyword of data.keywords) {
      // Check for exact word matches or phrases
      if (lowerQuery.includes(keyword)) {
        // Additional context checks for better classification
        if (
          category === "housing" &&
          (lowerQuery.includes("rent") ||
            lowerQuery.includes("landlord") ||
            lowerQuery.includes("eviction"))
        ) {
          return category;
        }
        if (
          category === "traffic" &&
          (lowerQuery.includes("ticket") ||
            lowerQuery.includes("dui") ||
            lowerQuery.includes("driving"))
        ) {
          return category;
        }
        return category;
      }
    }
  }

  // Additional pattern matching for common phrases
  if (
    lowerQuery.includes("money owed") ||
    lowerQuery.includes("small amount") ||
    lowerQuery.includes("minor dispute")
  ) {
    return "smallclaims";
  }
  if (
    lowerQuery.includes("can't pay") ||
    lowerQuery.includes("collections") ||
    lowerQuery.includes("creditor")
  ) {
    return "debt";
  }
  if (
    lowerQuery.includes("bought") &&
    (lowerQuery.includes("broken") || lowerQuery.includes("defective"))
  ) {
    return "consumer";
  }

  return "general";
}

// Get answer from knowledge base
export function getKnowledgeBaseAnswer(query: string): LegalAnswer | null {
  const category = classifyQuery(query);

  if (category === "general") {
    return null;
  }

  return LEGAL_KNOWLEDGE_BASE[category as keyof typeof LEGAL_KNOWLEDGE_BASE];
}

// Enhanced legal guidance with specific answers
export const ENHANCED_LEGAL_GUIDANCE = {
  lawyer_guidance: `**How to Know if You Need a Lawyer:**

**You DEFINITELY need a lawyer if:**
- You've been arrested or charged with a crime
- You're being sued or facing a lawsuit
- You're going through a divorce with children or significant assets
- You're facing deportation or immigration issues
- Someone has died and left you property or debts
- You're starting a business with partners
- You've been seriously injured due to someone's negligence

**You PROBABLY need a lawyer if:**
- Signing important contracts (real estate, business deals)
- Employment discrimination or wrongful termination
- Bankruptcy or serious debt problems
- Child custody or support disputes
- Creating a will or estate planning
- Tax problems with the IRS
- Landlord-tenant disputes involving significant money

**You MIGHT handle yourself if:**
- Small claims court cases (under $5,000)
- Simple traffic tickets
- Name changes or basic document issues
- Minor contract disputes
- Basic consumer complaints

**Questions to Determine if You Need Legal Help:**
1. **Could I go to jail?** → Get a lawyer immediately
2. **Could I lose my home/job/children?** → Consult a lawyer
3. **Is more than $1,000 at stake?** → Consider a lawyer
4. **Are there complex laws involved?** → Get professional help
5. **Do I have time to research thoroughly?** → If no, hire help
6. **Is the other party represented?** → You should be too

**Free Legal Resources:**
- Legal Aid societies (for low-income individuals)
- Bar association referral services
- Law school legal clinics
- Court self-help centers
- Pro bono programs
- Online legal aid websites`,

  emergency_guidance: `**EMERGENCY LEGAL SITUATIONS - Act Immediately:**

**If Arrested or Detained:**
1. **Say only**: "I want a lawyer" and "I am invoking my right to remain silent"
2. **Do NOT** discuss your case with anyone except your lawyer
3. **Do NOT** sign anything without legal counsel
4. **Call a lawyer immediately** or ask for a public defender
5. **Don't resist** even if you believe the arrest is wrong

**If Served with Court Papers:**
1. **Read everything immediately** - note all deadlines
2. **Respond within the time limit** (usually 20-30 days)
3. **Don't ignore it** - this guarantees you'll lose
4. **Contact a lawyer immediately** if the stakes are high
5. **Gather all relevant documents**

**If Facing Eviction:**
1. **Know your rights** - landlords must follow legal process
2. **Respond to all notices** within required timeframes
3. **Document everything** - photos, communications, payments
4. **Contact local tenant rights organizations**
5. **Consider legal aid if you qualify**

**If Workplace Retaliation:**
1. **Document everything** - save emails, take notes with dates
2. **Report through proper channels** if safe to do so
3. **Contact EEOC** for discrimination issues
4. **Consult employment lawyer** for serious cases
5. **Don't quit without legal advice**`,

  process_guidance: `**Understanding Legal Processes:**

**Before Starting Any Legal Action:**
1. **Try to resolve informally** - many disputes can be settled without court
2. **Gather all documents** - contracts, communications, evidence
3. **Understand the costs** - court fees, time, possible attorney costs
4. **Know the time limits** - statutes of limitations apply
5. **Consider alternatives** - mediation, arbitration, administrative remedies

**Common Legal Procedures:**

**Small Claims Court (Under $5,000-$10,000):**
- File complaint with court clerk
- Pay filing fee (usually $30-$100)
- Serve papers on defendant
- Attend hearing (no lawyers needed)
- Simple rules and procedures

**Civil Lawsuit (Larger amounts):**
- More complex procedures
- Discovery process (exchanging evidence)
- Possible jury trial
- Usually need attorney
- Can take months or years

**Criminal Cases:**
- State prosecutes, not you
- Different standards (beyond reasonable doubt)
- Constitutional protections apply
- Public defender if you can't afford lawyer
- Possible jail time

**Administrative Procedures:**
- Government agency disputes
- Often have specific rules and deadlines
- May require appeals through agency first
- Examples: Social Security, unemployment, licensing

**Key Tips:**
- **Document everything** with dates and details
- **Meet all deadlines** - courts are strict about timing
- **Keep copies** of everything you file
- **Be honest** in all statements and documents
- **Get help** if procedures seem complex`,

  rights_guidance: `**Understanding Your Legal Rights:**

**Constitutional Rights (Everyone in the US):**

**1st Amendment - Free Speech:**
- Express opinions without government censorship
- Practice religion freely
- Peacefully assemble and protest
- Petition government for changes

**4th Amendment - Privacy:**
- Protection from unreasonable searches
- Police usually need warrants
- Right to refuse consent to search (except in certain situations)

**5th Amendment - Due Process:**
- Right to remain silent
- Protection from self-incrimination
- Due process in legal proceedings
- Just compensation if government takes property

**6th Amendment - Criminal Cases:**
- Right to speedy trial
- Right to attorney (even if you can't afford one)
- Right to confront witnesses
- Right to impartial jury

**14th Amendment - Equal Protection:**
- Equal treatment under law
- Due process protections
- Protection from discrimination by government

**Civil Rights in Daily Life:**

**Employment:**
- Protection from discrimination (race, gender, age, disability, religion)
- Right to safe workplace
- Right to fair wages and overtime
- Protection from retaliation for complaints

**Housing:**
- Protection from housing discrimination
- Right to habitable living conditions
- Protection from illegal eviction
- Right to reasonable accommodations for disabilities

**Consumer Rights:**
- Right to honest advertising
- Right to safe products
- Right to dispute incorrect charges
- Protection from fraud and scams

**When Rights Are Violated:**
1. **Document the violation** - dates, witnesses, evidence
2. **File complaints** with appropriate agencies
3. **Consult with attorney** if violations are serious
4. **Know deadlines** for filing complaints or lawsuits
5. **Use available resources** - civil rights organizations, legal aid`,

  general_guidance: `**General Legal Guidance:**

**Immediate Steps for Any Legal Issue:**
1. **Stay calm** - emotional decisions often make things worse
2. **Document everything** - photos, emails, witness names, dates
3. **Preserve evidence** - don't throw anything away
4. **Research your issue** - understand basics before talking to lawyers
5. **Know your deadlines** - many legal actions have time limits

**Money-Saving Tips:**
- **Organize before meeting lawyer** - time is money
- **Get estimates** from multiple attorneys
- **Consider legal insurance** if available through work
- **Use legal aid** if you qualify financially
- **Try self-help resources** for simple matters

**Red Flags - Get Help Immediately:**
- Criminal charges of any kind
- Court papers delivered to you
- Threats of arrest or seizure
- Immigration enforcement contact
- Serious injuries from accidents
- Employment termination after complaints
- Domestic violence situations

**Prevention is Best:**
- **Read contracts** before signing
- **Get agreements in writing**
- **Keep good records** of important transactions
- **Know your rights** in common situations
- **Act quickly** when problems arise
- **Seek advice early** rather than after problems escalate

**Free Resources:**
- Court self-help centers
- Legal aid organizations
- Bar association referral services
- Government agency help lines
- Online legal information (court websites)
- Community legal clinics`,

  // Legacy entries for backward compatibility
  findLawyer: `**How to Find Legal Help:**

1. **Bar Association Referrals** - Contact your local bar association for lawyer referrals
2. **Legal Aid** - Free/low-cost help for those who qualify financially
3. **Online Directories** - Lawyer.com, Avvo.com, Martindale-Hubbell
4. **Consultation** - Many lawyers offer free initial consultations
5. **Law School Clinics** - Students supervised by professors provide free help
6. **Pro Bono Programs** - Some lawyers provide free services

**Questions to Ask a Lawyer:**
- Experience with your type of case
- Fee structure and costs
- Expected timeline
- Likely outcomes
- Alternative dispute resolution options
- Communication expectations

**Free/Low-Cost Legal Resources:**
- Legal Aid Society
- Public defender (criminal cases)
- Self-help centers at courthouses
- Online legal information sites
- Community legal clinics`,

  generalAdvice: `**General Legal Principles:**

1. **Document Everything** - Keep records of important communications and events
2. **Meet Deadlines** - Legal proceedings have strict time limits
3. **Don't Go It Alone** - Complex legal matters usually require professional help
4. **Understand Your Rights** - Learn about your legal rights and obligations
5. **Consider Alternatives** - Mediation and arbitration can be faster and cheaper than court
6. **Act Quickly** - Many legal issues have time limits for taking action
7. **Be Honest** - Always tell your lawyer the complete truth
8. **Save Money** - Organize documents and prepare questions before meetings

**When You Need a Lawyer:**
- Criminal charges (get lawyer immediately)
- Significant money at stake (over $1,000)
- Complex legal documents
- Constitutional rights issues
- Business formation or disputes
- Family law matters
- Immigration issues
- Personal injury claims

**Warning Signs of Legal Trouble:**
- Being served with court papers
- Criminal investigation or arrest
- IRS audit or tax problems
- Employment discrimination
- Serious injury or accident
- Divorce or child custody disputes`,
};

// Backward compatibility
export const GENERAL_LEGAL_GUIDANCE = ENHANCED_LEGAL_GUIDANCE;
