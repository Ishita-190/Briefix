// Constitutional Law Knowledge Base
// References to Indian Constitution articles and provisions

export interface ConstitutionalReference {
  article?: string;
  part?: string;
  schedule?: string;
  description: string;
  relevance: string;
}

export interface EnhancedLegalAnswer {
  answer: string;
  category: string;
  urgency: "low" | "medium" | "high";
  sources: Array<{
    title: string;
    type: "procedure" | "statute" | "guidance" | "practical" | "constitutional";
  }>;
  constitutionalReferences?: ConstitutionalReference[];
}

// Constitutional law mappings for specific legal topics
export const CONSTITUTIONAL_LAW_REFERENCES = {
  
  // Alimony and Marriage Rights
  alimony: {
    constitutionalReferences: [
      {
        article: "Article 15(3)",
        description: "Special provisions for women and children",
        relevance: "Enables protective legislation for women's economic rights in marriage dissolution"
      },
      {
        article: "Article 21",
        description: "Right to life and personal liberty",
        relevance: "Includes right to live with dignity, ensuring adequate maintenance after divorce"
      },
      {
        article: "Article 14",
        description: "Right to equality before law",
        relevance: "Ensures fair treatment in alimony proceedings regardless of gender"
      },
      {
        part: "Part IV - Directive Principles",
        article: "Article 39(a)",
        description: "Adequate means of livelihood for all citizens",
        relevance: "Supports the principle that divorced spouses should have means to maintain reasonable living standards"
      }
    ],
    statutoryBasis: [
      "Hindu Marriage Act, 1955 - Section 25",
      "Special Marriage Act, 1954 - Section 36", 
      "Muslim Personal Law (Shariat) Application Act, 1937",
      "Indian Divorce Act, 1869 - Section 37"
    ]
  },

  // Citizen's Arrest
  citizenArrest: {
    constitutionalReferences: [
      {
        article: "Article 21",
        description: "Right to life and personal liberty",
        relevance: "Protects against unlawful detention while allowing lawful citizen arrests"
      },
      {
        article: "Article 19(1)(d)",
        description: "Right to move freely throughout India",
        relevance: "Citizen arrest must not violate fundamental right to movement"
      },
      {
        article: "Article 22(1)",
        description: "Protection against arrest and detention in certain cases",
        relevance: "Right to be informed of grounds of arrest applies even in citizen arrests"
      },
      {
        article: "Article 22(2)",
        description: "Right to consult and defend by legal practitioner",
        relevance: "Person arrested by citizen retains right to legal representation"
      }
    ],
    statutoryBasis: [
      "Code of Criminal Procedure, 1973 - Section 43",
      "Indian Penal Code, 1860 - Section 151 (arrest to prevent cognizable offense)"
    ]
  },

  // Legal Procedures and Due Process
  legalProcedures: {
    constitutionalReferences: [
      {
        article: "Article 21",
        description: "Right to life and personal liberty",
        relevance: "Includes right to fair procedure and due process in all legal proceedings"
      },
      {
        article: "Article 14",
        description: "Right to equality before law",
        relevance: "Ensures equal treatment in legal procedures regardless of status"
      },
      {
        article: "Article 22",
        description: "Protection against arrest and detention",
        relevance: "Mandates proper legal procedures in criminal matters"
      },
      {
        article: "Article 32",
        description: "Right to constitutional remedies",
        relevance: "Provides direct access to Supreme Court when constitutional rights are violated"
      },
      {
        article: "Article 136",
        description: "Special leave to appeal",
        relevance: "Supreme Court's discretionary jurisdiction to hear appeals"
      }
    ],
    statutoryBasis: [
      "Code of Civil Procedure, 1908",
      "Code of Criminal Procedure, 1973",
      "Indian Evidence Act, 1872",
      "Limitation Act, 1963"
    ]
  },

  // Name Change Procedures  
  nameChange: {
    constitutionalReferences: [
      {
        article: "Article 19(1)(a)",
        description: "Right to freedom of speech and expression",
        relevance: "Includes right to choose and change one's name as part of personal identity"
      },
      {
        article: "Article 21",
        description: "Right to life and personal liberty",
        relevance: "Right to personal identity and dignity includes right to choose one's name"
      },
      {
        article: "Article 25",
        description: "Freedom of conscience and right to practice religion",
        relevance: "Protects right to change name for religious reasons"
      },
      {
        part: "Part III - Fundamental Rights",
        article: "Article 19(1)(g)",
        description: "Right to practice any profession, trade or business",
        relevance: "Name change may be necessary for professional purposes"
      }
    ],
    statutoryBasis: [
      "Registration Act, 1908",
      "Births, Deaths and Marriages Registration Act, 1856",
      "Public Notaries Act, 1952"
    ]
  },

  // Paperwork and Documentation Rights
  paperwork: {
    constitutionalReferences: [
      {
        article: "Article 19(1)(a)",
        description: "Right to freedom of speech and expression",
        relevance: "Includes right to information and access to public documents"
      },
      {
        article: "Article 21",
        description: "Right to life and personal liberty",
        relevance: "Right to livelihood includes right to obtain necessary documents"
      },
      {
        article: "Article 14",
        description: "Right to equality before law",
        relevance: "Ensures non-discriminatory access to government services and documentation"
      },
      {
        part: "Part IV - Directive Principles",
        article: "Article 47",
        description: "Duty to improve public health and standard of living",
        relevance: "State duty to ensure efficient public services including documentation"
      }
    ],
    statutoryBasis: [
      "Right to Information Act, 2005",
      "Public Records Act, 1993",
      "Registration Act, 1908",
      "Indian Stamp Act, 1899"
    ]
  },

  // Court Procedures and Access to Justice
  courtProcedures: {
    constitutionalReferences: [
      {
        article: "Article 32",
        description: "Right to constitutional remedies",
        relevance: "Fundamental right to approach courts for enforcement of constitutional rights"
      },
      {
        article: "Article 226",
        description: "Power of High Courts to issue writs",
        relevance: "High Court's power to issue writs for enforcement of rights"
      },
      {
        article: "Article 136",
        description: "Special leave to appeal to Supreme Court",
        relevance: "Right to appeal to highest court in the country"
      },
      {
        article: "Article 39A",
        description: "Equal justice and free legal aid",
        relevance: "Constitutional mandate for access to justice regardless of economic capacity"
      }
    ],
    statutoryBasis: [
      "Legal Services Authorities Act, 1987",
      "Code of Civil Procedure, 1908",
      "Code of Criminal Procedure, 1973"
    ]
  },

  // Property Rights and Documentation
  property: {
    constitutionalReferences: [
      {
        article: "Article 300A",
        description: "Right to property",
        relevance: "No person shall be deprived of property save by authority of law"
      },
      {
        article: "Article 31",
        description: "Former property rights provision (now repealed but principles remain)",
        relevance: "Historical basis for property protection, now governed by Article 300A"
      },
      {
        article: "Article 19(1)(f)",
        description: "Former right to acquire property (now omitted)",
        relevance: "Property acquisition now regulated through Article 300A and statutes"
      }
    ],
    statutoryBasis: [
      "Registration Act, 1908",
      "Transfer of Property Act, 1882",
      "Indian Stamp Act, 1899",
      "Right to Fair Compensation and Transparency in Land Acquisition Act, 2013"
    ]
  }
};

// Function to get constitutional references for a legal topic
export function getConstitutionalReferences(topic: string): ConstitutionalReference[] {
  const normalizedTopic = topic.toLowerCase();
  
  // Map common query terms to constitutional topics
  if (normalizedTopic.includes('alimony') || normalizedTopic.includes('maintenance') || normalizedTopic.includes('spousal support')) {
    return CONSTITUTIONAL_LAW_REFERENCES.alimony.constitutionalReferences;
  }
  
  if (normalizedTopic.includes('citizen') && normalizedTopic.includes('arrest')) {
    return CONSTITUTIONAL_LAW_REFERENCES.citizenArrest.constitutionalReferences;
  }
  
  if (normalizedTopic.includes('legal procedure') || normalizedTopic.includes('due process') || normalizedTopic.includes('court process')) {
    return CONSTITUTIONAL_LAW_REFERENCES.legalProcedures.constitutionalReferences;
  }
  
  if (normalizedTopic.includes('name change') || normalizedTopic.includes('change name')) {
    return CONSTITUTIONAL_LAW_REFERENCES.nameChange.constitutionalReferences;
  }
  
  if (normalizedTopic.includes('paperwork') || normalizedTopic.includes('documents') || normalizedTopic.includes('documentation')) {
    return CONSTITUTIONAL_LAW_REFERENCES.paperwork.constitutionalReferences;
  }
  
  if (normalizedTopic.includes('court') || normalizedTopic.includes('trial') || normalizedTopic.includes('hearing')) {
    return CONSTITUTIONAL_LAW_REFERENCES.courtProcedures.constitutionalReferences;
  }
  
  if (normalizedTopic.includes('property') || normalizedTopic.includes('ownership') || normalizedTopic.includes('land')) {
    return CONSTITUTIONAL_LAW_REFERENCES.property.constitutionalReferences;
  }
  
  return [];
}

// Function to get statutory basis for a legal topic
export function getStatutoryBasis(topic: string): string[] {
  const normalizedTopic = topic.toLowerCase();
  
  if (normalizedTopic.includes('alimony') || normalizedTopic.includes('maintenance')) {
    return CONSTITUTIONAL_LAW_REFERENCES.alimony.statutoryBasis;
  }
  
  if (normalizedTopic.includes('citizen') && normalizedTopic.includes('arrest')) {
    return CONSTITUTIONAL_LAW_REFERENCES.citizenArrest.statutoryBasis;
  }
  
  if (normalizedTopic.includes('legal procedure') || normalizedTopic.includes('due process')) {
    return CONSTITUTIONAL_LAW_REFERENCES.legalProcedures.statutoryBasis;
  }
  
  if (normalizedTopic.includes('name change')) {
    return CONSTITUTIONAL_LAW_REFERENCES.nameChange.statutoryBasis;
  }
  
  if (normalizedTopic.includes('paperwork') || normalizedTopic.includes('documents')) {
    return CONSTITUTIONAL_LAW_REFERENCES.paperwork.statutoryBasis;
  }
  
  if (normalizedTopic.includes('court') || normalizedTopic.includes('trial')) {
    return CONSTITUTIONAL_LAW_REFERENCES.courtProcedures.statutoryBasis;
  }
  
  if (normalizedTopic.includes('property')) {
    return CONSTITUTIONAL_LAW_REFERENCES.property.statutoryBasis;
  }
  
  return [];
}

// Format constitutional references for display
export function formatConstitutionalReferences(references: ConstitutionalReference[]): string {
  if (references.length === 0) return "";
  
  let formatted = "\n\n**📜 Constitutional Basis:**\n";
  
  references.forEach((ref, index) => {
    formatted += `\n${index + 1}. **${ref.article || ref.part || ref.schedule}**: ${ref.description}\n`;
    formatted += `   *Relevance*: ${ref.relevance}\n`;
  });
  
  return formatted;
}

// Format statutory basis for display
export function formatStatutoryBasis(statutes: string[]): string {
  if (statutes.length === 0) return "";
  
  let formatted = "\n**📚 Legal Framework:**\n";
  
  statutes.forEach((statute, index) => {
    formatted += `${index + 1}. ${statute}\n`;
  });
  
  return formatted;
}
