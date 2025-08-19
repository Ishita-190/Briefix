// Comprehensive Legal Knowledge Base
export interface LegalAnswer {
  answer: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  sources: Array<{
    title: string;
    type: 'procedure' | 'statute' | 'guidance' | 'practical';
  }>;
}

export const LEGAL_KNOWLEDGE_BASE = {
  // Civil Litigation & Being Sued
  sued: {
    keywords: ['sued', 'lawsuit', 'civil case', 'litigation', 'court summons', 'legal notice'],
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
    category: 'Civil Procedure',
    urgency: 'high' as const,
    sources: [
      { title: 'Civil Procedure Guidelines', type: 'procedure' as const },
      { title: 'Court Response Requirements', type: 'guidance' as const }
    ]
  },

  // Contract Law
  contract: {
    keywords: ['contract', 'agreement', 'breach', 'terms', 'obligation', 'binding'],
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
    category: 'Contract Law',
    urgency: 'medium' as const,
    sources: [
      { title: 'Contract Formation Principles', type: 'statute' as const },
      { title: 'Breach of Contract Remedies', type: 'guidance' as const }
    ]
  },

  // Criminal Law Basics
  criminal: {
    keywords: ['criminal', 'arrest', 'police', 'rights', 'charged', 'bail', 'custody'],
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
    category: 'Criminal Law',
    urgency: 'high' as const,
    sources: [
      { title: 'Constitutional Rights', type: 'statute' as const },
      { title: 'Police Interaction Guidelines', type: 'practical' as const }
    ]
  },

  // Employment Law
  employment: {
    keywords: ['fired', 'workplace', 'discrimination', 'harassment', 'wrongful termination', 'wages'],
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
    category: 'Employment Law',
    urgency: 'medium' as const,
    sources: [
      { title: 'Employment Rights Overview', type: 'guidance' as const },
      { title: 'Workplace Protection Laws', type: 'statute' as const }
    ]
  },

  // Personal Injury
  injury: {
    keywords: ['accident', 'injury', 'medical malpractice', 'slip and fall', 'car accident', 'negligence'],
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
    category: 'Personal Injury',
    urgency: 'medium' as const,
    sources: [
      { title: 'Negligence Standards', type: 'statute' as const },
      { title: 'Personal Injury Procedures', type: 'practical' as const }
    ]
  },

  // Family Law
  family: {
    keywords: ['divorce', 'custody', 'child support', 'alimony', 'marriage', 'separation'],
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
    category: 'Family Law',
    urgency: 'medium' as const,
    sources: [
      { title: 'Family Court Procedures', type: 'procedure' as const },
      { title: 'Child Welfare Standards', type: 'guidance' as const }
    ]
  },

  // Landlord-Tenant Issues
  housing: {
    keywords: ['landlord', 'tenant', 'rent', 'eviction', 'deposit', 'lease', 'housing', 'apartment'],
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
    category: 'Housing Law',
    urgency: 'medium' as const,
    sources: [
      { title: 'Tenant Rights Guidelines', type: 'guidance' as const },
      { title: 'Housing Code Violations', type: 'procedure' as const }
    ]
  },

  // Consumer Rights
  consumer: {
    keywords: ['scam', 'fraud', 'warranty', 'return', 'refund', 'defective', 'consumer', 'purchase'],
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
    category: 'Consumer Law',
    urgency: 'medium' as const,
    sources: [
      { title: 'Consumer Protection Act', type: 'statute' as const },
      { title: 'FTC Guidelines', type: 'guidance' as const }
    ]
  },

  // Debt and Bankruptcy
  debt: {
    keywords: ['debt', 'bankruptcy', 'collection', 'garnishment', 'credit', 'loan', 'foreclosure'],
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
    category: 'Debt/Bankruptcy',
    urgency: 'high' as const,
    sources: [
      { title: 'Fair Debt Collection Practices Act', type: 'statute' as const },
      { title: 'Bankruptcy Code', type: 'statute' as const }
    ]
  },

  // Small Claims Court
  smallclaims: {
    keywords: ['small claims', 'court', 'sue', 'money owed', 'dispute', 'judgment'],
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
    category: 'Small Claims',
    urgency: 'low' as const,
    sources: [
      { title: 'Small Claims Procedures', type: 'procedure' as const },
      { title: 'Court Self-Help Guide', type: 'guidance' as const }
    ]
  },

  // Immigration Issues
  immigration: {
    keywords: ['immigration', 'visa', 'green card', 'citizenship', 'deportation', 'asylum'],
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
    category: 'Immigration',
    urgency: 'high' as const,
    sources: [
      { title: 'Immigration and Nationality Act', type: 'statute' as const },
      { title: 'USCIS Guidelines', type: 'guidance' as const }
    ]
  },

  // Traffic and DUI
  traffic: {
    keywords: ['traffic ticket', 'dui', 'dwi', 'speeding', 'license', 'suspended', 'driving'],
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
    category: 'Traffic/DUI',
    urgency: 'high' as const,
    sources: [
      { title: 'Vehicle Code', type: 'statute' as const },
      { title: 'DUI Defense Guidelines', type: 'guidance' as const }
    ]
  }
};

// Query classification
export function classifyQuery(query: string): string {
  const lowerQuery = query.toLowerCase();

  // More specific matching for better classification
  for (const [category, data] of Object.entries(LEGAL_KNOWLEDGE_BASE)) {
    for (const keyword of data.keywords) {
      // Check for exact word matches or phrases
      if (lowerQuery.includes(keyword)) {
        // Additional context checks for better classification
        if (category === 'housing' && (lowerQuery.includes('rent') || lowerQuery.includes('landlord') || lowerQuery.includes('eviction'))) {
          return category;
        }
        if (category === 'traffic' && (lowerQuery.includes('ticket') || lowerQuery.includes('dui') || lowerQuery.includes('driving'))) {
          return category;
        }
        return category;
      }
    }
  }

  // Additional pattern matching for common phrases
  if (lowerQuery.includes('money owed') || lowerQuery.includes('small amount') || lowerQuery.includes('minor dispute')) {
    return 'smallclaims';
  }
  if (lowerQuery.includes('can\'t pay') || lowerQuery.includes('collections') || lowerQuery.includes('creditor')) {
    return 'debt';
  }
  if (lowerQuery.includes('bought') && (lowerQuery.includes('broken') || lowerQuery.includes('defective'))) {
    return 'consumer';
  }

  return 'general';
}

// Get answer from knowledge base
export function getKnowledgeBaseAnswer(query: string): LegalAnswer | null {
  const category = classifyQuery(query);
  
  if (category === 'general') {
    return null;
  }
  
  return LEGAL_KNOWLEDGE_BASE[category as keyof typeof LEGAL_KNOWLEDGE_BASE];
}

// General legal guidance for unmatched queries
export const GENERAL_LEGAL_GUIDANCE = {
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
- Divorce or child custody disputes`
};
