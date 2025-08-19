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
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { getCachedAnswer } from "../lib/api-cache";

type ComplexityLevel = "12-year-old" | "15-year-old" | "lawyer";

type Source = {
  id?: string;
  title?: string;
  section?: string;
  score?: number;
};

type ApiResponse = {
  answer: string;
  sources: Source[];
};

export default function ExplainPage() {
  const [question, setQuestion] = useState("");
  const [complexityLevel, setComplexityLevel] =
    useState<ComplexityLevel>("15-year-old");
  const [explanation, setExplanation] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [urgency, setUrgency] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);
    setExplanation("");
    setSources([]);
    setCategory(null);
    setUrgency(null);

    try {
      const result = await getCachedAnswer(question, complexityLevel);
      setExplanation(result.answer);
      setSources(result.sources);
      setCategory(result.category || null);
      setUrgency(result.urgency || null);
    } catch (err) {
      setError("Failed to get an answer. Please try again.");
      console.error("Error getting explanation:", err);
    } finally {
      setIsLoading(false);
    }
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 order-2 lg:order-1">
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
                      },
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
                <CardDescription>
                  Click any example to try it out
                </CardDescription>
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
                    className="w-full text-left h-auto p-3 text-sm justify-start whitespace-normal break-words leading-relaxed"
                    onClick={() => setQuestion(example)}
                  >
                    <span className="block truncate">{example}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mt-8 border-destructive">
            <CardContent className="pt-6">
              <div className="text-destructive text-center">
                <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Explanation Results */}
        {explanation && (
          <div className="mt-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-accent" />
                  AI Explanation
                  <Badge variant="outline">{complexityLevel} level</Badge>
                  {category && (
                    <Badge
                      variant={
                        urgency === "high"
                          ? "destructive"
                          : urgency === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {category}
                    </Badge>
                  )}
                </CardTitle>
                {urgency === "high" && (
                  <div className="text-sm text-destructive font-medium">
                    ⚠️ This is urgent - please seek immediate legal assistance
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-foreground">
                  <div className="whitespace-pre-wrap text-base leading-relaxed">
                    {explanation}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sources */}
            {sources.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Sources Referenced
                  </CardTitle>
                  <CardDescription>
                    Information was found from the following legal documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sources.map((source, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <ExternalLink className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          {source.title && (
                            <div className="font-medium text-sm">
                              {source.title}
                            </div>
                          )}
                          {source.section && (
                            <div className="text-sm text-muted-foreground">
                              Section: {source.section}
                            </div>
                          )}
                          {source.id && (
                            <div className="text-xs text-muted-foreground">
                              Reference: {source.id}
                            </div>
                          )}
                        </div>
                        {source.score && (
                          <Badge variant="secondary" className="text-xs">
                            {Math.round(source.score * 100)}% match
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
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
