import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Lightbulb,
  FileText,
  Scale,
  Clock,
  Loader2,
} from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI legal assistant. I can help explain legal concepts, analyze documents, guide you through procedures, and answer your legal questions. What would you like to know?",
      timestamp: new Date(),
      type: "general",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);
  const textareaRef = useRef(null);

  const quickQuestions = [
    "What is the difference between a misdemeanor and a felony?",
    "How do I know if I need a lawyer?",
    "What are my rights during a police stop?",
    "How does bankruptcy work?",
    "What should I do if I'm being sued?",
    "How do I file a restraining order?",
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
      type: "general",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    await new Promise((resolve) =>
      setTimeout(resolve, 1500 + Math.random() * 1000),
    );

    // Generate contextual response based on content
    let responseContent = "";
    let responseType = "general";

    if (content.toLowerCase().includes("contract")) {
      responseType = "document";
      responseContent = `A contract is a legally binding agreement between two or more parties. Here are the key elements:

**Essential Elements:**
• **Offer** - One party proposes terms
• **Acceptance** - The other party agrees to those terms  
• **Consideration** - Something of value exchanged (money, services, goods)
• **Legal capacity** - Parties must be mentally competent and of legal age
• **Legal purpose** - The contract cannot be for illegal activities

**Types of Contracts:**
• Written contracts (recommended for important agreements)
• Oral contracts (harder to prove but still valid)
• Implied contracts (created by actions/behavior)

**When is a contract void?**
• Fraud or misrepresentation
• Duress or undue influence
• Mistake about essential facts
• Illegal subject matter

Would you like me to explain any specific aspect of contracts in more detail, or help you understand a particular contract you're dealing with?`;
    } else if (
      content.toLowerCase().includes("rights") &&
      content.toLowerCase().includes("police")
    ) {
      responseType = "procedure";
      responseContent = `Here are your fundamental rights during a police encounter:

**Your Constitutional Rights:**
• **Right to remain silent** - You don't have to answer questions beyond identifying yourself
• **Right to refuse searches** - Police need a warrant, probable cause, or your consent
• **Right to an attorney** - You can ask for a lawyer at any time
• **Right to leave** - If you're not under arrest, you can ask "Am I free to go?"

**During a Traffic Stop:**
1. Pull over safely and turn off your engine
2. Keep hands visible (on steering wheel)
3. Provide license, registration, and insurance when asked
4. You can remain silent beyond providing these documents
5. Don't consent to vehicle searches unless required by warrant

**If You're Arrested:**
• Clearly state: "I invoke my right to remain silent and want an attorney"
• Don't resist, even if you believe the arrest is unfair
• Don't sign anything without a lawyer present
• Remember: anything you say can be used against you

**Important:** Stay calm, be polite, and never run or resist. You can challenge illegal police actions later in court with an attorney's help.

Do you have a specific situation you'd like guidance on?`;
    } else if (
      content.toLowerCase().includes("misdemeanor") ||
      content.toLowerCase().includes("felony")
    ) {
      responseType = "explanation";
      responseContent = `Here's the key difference between misdemeanors and felonies:

**Misdemeanors (Less Serious Crimes):**
• Punishment: Up to 1 year in jail
• Location: Usually county jail, not prison
• Examples: Petty theft, simple assault, DUI (first offense), minor drug possession
• Impact: May affect employment but less severe long-term consequences

**Felonies (Serious Crimes):**
• Punishment: More than 1 year in prison
• Location: State or federal prison
• Examples: Murder, rape, armed robbery, major drug trafficking, embezzlement over certain amounts
• Impact: Loss of voting rights, gun ownership, difficulty finding employment/housing

**Classifications:**
• **Class C Misdemeanor** - Lowest level (fines, community service)
• **Class A Misdemeanor** - Highest misdemeanor level (up to 1 year jail)
• **Class E Felony** - Lowest felony level
• **Class A Felony** - Most serious (life imprisonment or death penalty)

**Important Notes:**
• Classification varies by state
• Same act might be misdemeanor in one state, felony in another
• Prior convictions can escalate charges
• Some crimes are "wobblers" - can be charged as either depending on circumstances

The distinction matters because felonies carry much more serious long-term consequences for your rights, employment, and other aspects of life.`;
    } else if (
      content.toLowerCase().includes("lawyer") ||
      content.toLowerCase().includes("attorney")
    ) {
      responseType = "general";
      responseContent = `Here's when you should consider getting a lawyer:

**Definitely Need a Lawyer:**
• Facing criminal charges (even misdemeanors)
• Being sued or suing someone else
• Divorce with children/significant assets
• Creating a will with complex assets
• Business formation or major contracts
• Immigration issues
• Personal injury with serious damages

**Probably Need a Lawyer:**
• Landlord-tenant disputes beyond small claims
• Employment discrimination or wrongful termination
• Tax problems with the IRS
• Debt collection lawsuits
• Insurance claim denials for significant amounts

**Might Handle Yourself (With Research):**
• Simple traffic tickets
• Small claims court (under $5,000-$10,000)
• Simple wills with basic assets
• Uncontested divorce without children
• Name changes
• Basic business licenses

**How to Find the Right Lawyer:**
• State bar association referral services
• Specialty practice areas (family law, criminal, personal injury, etc.)
• Initial consultations (many offer free 30-minute consultations)
• Check reviews and ask about fees upfront

**Questions to Ask:**
• How much experience do you have with cases like mine?
• What are your fees and payment options?
• How long will this likely take?
• What are the possible outcomes?

Remember: It's better to consult early than try to fix problems later. Many lawyers offer brief consultations to assess whether you need their help.`;
    } else {
      responseContent = `I understand you're asking about "${content}". This is an important legal topic that affects many people.

Based on your question, I'd recommend:

1. **For immediate concerns**: If this is urgent or you're facing legal action, consider consulting with a qualified attorney
2. **For general information**: I can provide educational explanations to help you understand the legal concepts involved
3. **For specific guidance**: You might want to use our other tools:
   - Document analysis if you have contracts or legal papers
   - Procedure guides for step-by-step processes
   - Complexity-adjusted explanations for deeper understanding

Could you provide more specific details about your situation? For example:
• What specific aspect interests you most?
• Are you facing a particular legal issue?
• Do you have documents that need review?
• Are you looking for general education or specific guidance?

This will help me give you the most relevant and useful information.`;
    }

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseContent,
      timestamp: new Date(),
      type: responseType,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case "explanation":
        return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case "document":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "procedure":
        return <Scale className="h-4 w-4 text-purple-500" />;
      default:
        return <Bot className="h-4 w-4 text-accent" />;
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          AI Legal Assistant
        </h1>
        <p className="text-xl text-muted-foreground">
          Get immediate answers to your legal questions in plain English
        </p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Legal Chat Assistant
          </CardTitle>
          <CardDescription>
            Ask questions, request explanations, or get guidance on legal
            matters
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center">
                      {getMessageIcon(message.type)}
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground ml-12"
                        : "bg-muted mr-12"
                    }`}
                  >
                    {message.type && message.role === "assistant" && (
                      <Badge variant="outline" className="mb-2 text-xs">
                        {message.type}
                      </Badge>
                    )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div
                      className={`text-xs mt-2 opacity-70 ${
                        message.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <Clock className="inline h-3 w-3 mr-1" />
                      {formatTime(message.timestamp)}
                    </div>
                  </div>

                  {message.role === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-3 mr-12">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      AI is thinking...
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="border-t p-4">
              <h4 className="font-medium mb-3 text-sm">Popular Questions:</h4>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-2"
                    onClick={() => sendMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Textarea
                ref={textareaRef}
                placeholder="Ask any legal question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="resize-none"
                rows={2}
              />
              <Button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          ⚠️ <strong>Important:</strong> This AI provides educational
          information only. Responses are not legal advice. For specific legal
          matters, consult with a qualified attorney.
        </p>
      </div>
    </div>
  );
}
