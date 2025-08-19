import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import {
  Brain,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  Loader2,
  Sparkles,
} from "lucide-react";

type ComplexityLevel = "12-year-old" | "15-year-old" | "lawyer";

// Helper function to fetch output.json and search for relevant snippet
async function queryIPC(question: string): Promise<string> {
  try {
    const res = await fetch("/ipc.json"); 
    const data = await res.json();

    // Simple keyword match in JSON
    for (const item of data) {
      // Assuming each JSON object has "key" and "value"
      if (question.toLowerCase().includes(item.key.toLowerCase())) {
        return item.value;
      }
    }
  } catch (err) {
    console.error("Error fetching output.json:", err);
  }

  return ""; // Return empty if no match found
}

export default function ExplainPage() {
  const [question, setQuestion] = useState("");
  const [complexityLevel, setComplexityLevel] =
    useState<ComplexityLevel>("15-year-old");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Predefined mock explanations as fallback
  const mockExplanations = {
    "12-year-old": `Let me explain this like you're 12! Legal topics can be complicated, but I'll keep it simple...`,
    "15-year-old": `Here's what this means for someone your age: Legal concepts involve rules and consequences...`,
    lawyer: `Professional legal analysis: Detailed principles, statutes, and case law...`,
  };

  const handleExplain = async () => {
    if (!question.trim()) return;

    setIsLoading(true);

    // Try fetching JSON snippet first
    let explanationText = await queryIPC(question);

    // Fallback to complexity-level mock explanation
    if (!explanationText) {
      explanationText = mockExplanations[complexityLevel];
    }

    setExplanation(explanationText);
    setIsLoading(false);
  };

  const getLevelInfo = (level: ComplexityLevel) => {
    switch (level) {
      case "12-year-old":
        return {
          icon: <Lightbulb className="h-5 w-5" />,
          title: "Simple & Clear",
          description: "Easy-to-understand explanations with everyday examples",
        };
      case "15-year-old":
        return {
          icon: <GraduationCap className="h-5 w-5" />,
          title: "Detailed & Educational",
          description: "More comprehensive with practical applications",
        };
      case "lawyer":
        return {
          icon: <Brain className="h-5 w-5" />,
          title: "Professional & Technical",
          description:
            "Comprehensive legal analysis with citations and precedents",
        };
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            AI Legal Explanations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ask any legal question and get an explanation perfectly tailored to
            your level of understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Your Legal Question
                </CardTitle>
                <CardDescription>
                  Type any legal question, concept, or scenario you'd like
                  explained.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Textarea
                  placeholder="e.g., What is a contract? How does bankruptcy work?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-[120px]"
                />

                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Choose your explanation level:
                  </Label>
                  <RadioGroup
                    value={complexityLevel}
                    onValueChange={(value) =>
                      setComplexityLevel(value as ComplexityLevel)
                    }
                    className="space-y-4"
                  >
                    {(["12-year-old", "15-year-old", "lawyer"] as const).map(
                      (level) => {
                        const info = getLevelInfo(level);
                        return (
                          <div
                            key={level}
                            className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <RadioGroupItem
                              value={level}
                              id={level}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor={level}
                                className="flex items-center gap-2 font-medium cursor-pointer"
                              >
                                {info.icon}
                                {info.title}
                                <Badge variant="outline" className="ml-auto">
                                  {level}
                                </Badge>
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {info.description}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleExplain}
                  disabled={!question.trim() || isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      AI is thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Explain This To Me
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Examples */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Popular Questions</CardTitle>
                <CardDescription>Click any example to try it out</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "What is a contract and when is it legally binding?",
                  "How does the court system work?",
                  "What are my rights during a police stop?",
                  "How does bankruptcy protect me from debt?",
                  "What's the difference between a misdemeanor and felony?",
                  "How do I file a small claims lawsuit?",
                ].map((example, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full text-left h-auto p-3 text-sm justify-start"
                    onClick={() => setQuestion(example)}
                  >
                    {example}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Explanation Results */}
        {explanation && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-accent" />
                AI Explanation
                <Badge variant="outline">{complexityLevel} level</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-foreground">
                <div className="whitespace-pre-wrap text-base leading-relaxed">
                  {explanation}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            ⚠️ <strong>Important:</strong> This AI tool provides educational
            information only and is not a substitute for professional legal
            advice. For specific legal matters, please consult with a qualified
            attorney.
          </p>
        </div>
      </div>
    </div>
  );
}
