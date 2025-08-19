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
  }
};

// Query classification
export function classifyQuery(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  for (const [category, data] of Object.entries(LEGAL_KNOWLEDGE_BASE)) {
    if (data.keywords.some(keyword => lowerQuery.includes(keyword))) {
      return category;
    }
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

**Questions to Ask a Lawyer:**
- Experience with your type of case
- Fee structure and costs
- Expected timeline
- Likely outcomes
- Alternative dispute resolution options`,

  generalAdvice: `**General Legal Principles:**

1. **Document Everything** - Keep records of important communications and events
2. **Meet Deadlines** - Legal proceedings have strict time limits
3. **Don't Go It Alone** - Complex legal matters usually require professional help
4. **Understand Your Rights** - Learn about your legal rights and obligations
5. **Consider Alternatives** - Mediation and arbitration can be faster and cheaper than court

**When You Need a Lawyer:**
- Criminal charges
- Significant money at stake
- Complex legal documents
- Constitutional rights issues
- Business formation or disputes`
};
