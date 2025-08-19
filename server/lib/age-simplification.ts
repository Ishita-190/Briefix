// Age-appropriate simplification for legal content

export function simplifyForAge(text: string, level: string): string {
  if (level === "12-year-old") {
    return simplifyFor12YearOld(text);
  }
  if (level === "15-year-old") {
    return simplifyFor15YearOld(text);
  }
  return text; // Return original for lawyer level
}

function simplifyFor12YearOld(text: string): string {
  // Remove complex formatting first
  let simplified = text
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold formatting
    .replace(/^\d+\.\s/gm, "• ") // Change numbered lists to bullets
    .replace(/^-\s/gm, "• "); // Standardize bullet points

  // Replace complex legal terms with simple explanations
  const replacements = [
    // Legal processes
    ["litigation", "going to court"],
    ["mediation", "talking with a helper to solve problems"],
    ["arbitration", "having someone decide who is right"],
    ["consultation", "meeting with someone for help"],
    ["proceeding", "court case"],
    ["defendant", "person being accused"],
    ["plaintiff", "person making the complaint"],
    ["jurisdiction", "area where the court has power"],

    // Legal concepts
    ["liable", "responsible for"],
    ["negligence", "being careless and causing harm"],
    ["breach of contract", "breaking a promise you made"],
    ["damages", "money to pay for harm done"],
    ["settlement", "agreement to end a fight"],
    ["garnishment", "taking money from your paycheck"],
    ["foreclosure", "bank taking your house"],
    ["eviction", "being forced to move out"],

    // Legal actions
    ["sue/sued", "take to court/taken to court"],
    ["file a lawsuit", "start a court case"],
    ["press charges", "ask police to arrest someone"],
    ["appeal", "ask a higher court to look at the case again"],
    ["subpoena", "court order to come to court or give documents"],

    // Documents and procedures
    ["affidavit", "written promise that something is true"],
    ["deposition", "answering questions under oath outside court"],
    ["discovery", "sharing information before trial"],
    ["testimony", "telling what you know in court"],
    ["warrant", "paper that lets police search or arrest"],

    // Money and penalties
    ["restitution", "paying back money you owe"],
    ["alimony", "money paid to ex-spouse"],
    ["child support", "money to help take care of kids"],
    ["bail", "money paid to get out of jail while waiting for trial"],
    ["fine", "money you have to pay as punishment"],

    // Rights and protections
    ["constitutional rights", "basic rights everyone has"],
    ["due process", "fair treatment by the courts"],
    ["probable cause", "good reason to think someone did something wrong"],
    ["miranda rights", "rights police must tell you when arrested"],

    // Common phrases
    ["shall be punished", "can get in trouble"],
    ["imprisonment", "going to jail"],
    ["incarceration", "being locked up"],
    ["offender", "person who broke the law"],
    ["perpetrator", "person who did something bad"],
    ["victim", "person who was hurt"],
    ["voluntary", "choosing to do something"],
    ["involuntary", "not choosing to do something"],
    ["willful", "doing something on purpose"],

    // Legal entities
    ["prosecutor", "lawyer who tries to prove someone is guilty"],
    ["public defender", "free lawyer for people who cannot afford one"],
    ["bailiff", "police officer in the courtroom"],
    ["court clerk", "person who keeps court records"],
    ["probation officer", "person who watches over someone instead of jail"],
  ];

  // Apply all replacements
  for (const [complex, simple] of replacements) {
    const regex = new RegExp(`\\b${complex}\\b`, "gi");
    simplified = simplified.replace(regex, simple);
  }

  // Simplify sentences and add kid-friendly explanations
  const lines = simplified.split("\n").filter((line) => line.trim());
  const simplifiedLines: string[] = [];

  for (let line of lines) {
    // Skip very complex sections
    if (line.length > 200) {
      const sentences = line.split(". ");
      simplifiedLines.push(sentences[0] + ".");
      continue;
    }

    // Add simple explanations for key concepts
    if (line.toLowerCase().includes("court")) {
      line += " (Court is where a judge decides who is right.)";
    }
    if (line.toLowerCase().includes("lawyer")) {
      line += " (A lawyer is someone who knows the law and helps you.)";
    }
    if (line.toLowerCase().includes("contract")) {
      line += " (A contract is like a promise that both people have to keep.)";
    }

    simplifiedLines.push(line);
  }

  // Keep only the most important points (max 6 lines for kids)
  const result = simplifiedLines.slice(0, 6).join("\n");

  return (
    result +
    "\n\n📚 **Remember**: Laws can be confusing! Always ask a grown-up or lawyer for help with legal problems."
  );
}

function simplifyFor15YearOld(text: string): string {
  // Less dramatic simplification than 12-year-old but still clearer
  let simplified = text;

  // Replace some complex terms but keep more legal vocabulary
  const replacements = [
    ["litigation", "court case"],
    ["proceeding", "legal process"],
    ["defendant", "person being sued or accused"],
    ["plaintiff", "person filing the lawsuit"],
    ["liable", "legally responsible"],
    ["garnishment", "taking money from paychecks"],
    ["foreclosure", "bank taking back property"],
    ["restitution", "paying back money owed"],
    ["constitutional rights", "basic legal rights"],
    ["due process", "fair legal treatment"],
    ["shall be punished", "can face penalties"],
    ["incarceration", "jail time"],
    ["offender", "person who broke the law"],
    ["perpetrator", "person who committed the act"],
    ["voluntary", "by choice"],
    ["involuntary", "not by choice"],
    ["willful", "intentional"],
  ];

  for (const [complex, simple] of replacements) {
    const regex = new RegExp(`\\b${complex}\\b`, "gi");
    simplified = simplified.replace(regex, simple);
  }

  // Break down very long sections
  const lines = simplified.split("\n").filter((line) => line.trim());
  const processedLines: string[] = [];

  for (let line of lines) {
    // If line is too long, break it down
    if (line.length > 300) {
      const sentences = line.split(". ");
      processedLines.push(
        ...sentences.slice(0, 2).map((s) => (s.endsWith(".") ? s : s + ".")),
      );
    } else {
      processedLines.push(line);
    }
  }

  // Keep more content than 12-year-old level but still limit (max 10 lines)
  const result = processedLines.slice(0, 10).join("\n");

  return (
    result +
    "\n\n🎓 **Important**: This is educational information. For serious legal matters, always consult with a qualified attorney."
  );
}

// Helper function to determine if content needs extra simplification
export function needsExtraSimplification(text: string): boolean {
  const complexIndicators = [
    "pursuant to",
    "hereby",
    "whereas",
    "heretofore",
    "aforementioned",
    "notwithstanding",
    "jurisdiction",
    "statute of limitations",
    "prima facie",
    "res judicata",
    "habeas corpus",
    "voir dire",
  ];

  return complexIndicators.some((indicator) =>
    text.toLowerCase().includes(indicator.toLowerCase()),
  );
}

// Add appropriate analogies and examples for different age groups
export function addExamples(
  content: string,
  level: string,
  topic: string,
): string {
  if (level === "12-year-old") {
    return addExamplesFor12YearOld(content, topic);
  }
  if (level === "15-year-old") {
    return addExamplesFor15YearOld(content, topic);
  }
  return content;
}

function addExamplesFor12YearOld(content: string, topic: string): string {
  const examples = {
    contract:
      "\n\n🎯 **Example**: If you promise to walk your neighbor's dog for $5, that's like a contract. You both have to do what you promised!",
    sued: "\n\n🎯 **Example**: Being sued is like when someone tells the teacher you broke their toy and wants you to pay for it, but now it's in court instead of school.",
    theft:
      "\n\n🎯 **Example**: Taking someone's bike without asking is theft. Even if you planned to bring it back, it's still against the law.",
    housing:
      "\n\n🎯 **Example**: If your apartment has no heat in winter, the landlord has to fix it. It's like how your school has to keep the building safe.",
    consumer:
      "\n\n🎯 **Example**: If you buy a toy and it breaks the first day, the store should give you your money back or a new toy.",
  };

  for (const [key, example] of Object.entries(examples)) {
    if (topic.includes(key)) {
      return content + example;
    }
  }

  return content;
}

function addExamplesFor15YearOld(content: string, topic: string): string {
  const examples = {
    contract:
      "\n\n💡 **Real Example**: When you sign up for a phone plan, you're making a contract. You agree to pay monthly, they agree to provide service.",
    sued: "\n\n💡 **Real Example**: If you accidentally damage someone's car, they might sue you to pay for repairs. Court decides if you have to pay.",
    employment:
      "\n\n💡 **Real Example**: If your boss fires you because of your race or gender, that's illegal discrimination and you can take legal action.",
    housing:
      "\n\n💡 **Real Example**: Your landlord can't just change the locks if you're late on rent. They have to follow legal eviction process.",
    consumer:
      '\n\n💡 **Real Example**: If a company advertises a product as "unbreakable" but it breaks easily, that\'s false advertising.',
  };

  for (const [key, example] of Object.entries(examples)) {
    if (topic.includes(key)) {
      return content + example;
    }
  }

  return content;
}
