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
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { getCachedAnswer } from "../lib/api-cache";

type Source = {
  id?: string;
  title?: string;
  section?: string;
  score?: number;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "explanation" | "document" | "procedure" | "general";
  sources?: Source[];
  category?: string;
  urgency?: string;
  error?: boolean;
};

type ApiResponse = {
  answer: string;
  sources: Source[];
};


export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
      type: "general",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await getCachedAnswer(content, "15-year-old");

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.answer,
        timestamp: new Date(),
        type: result.sources.length > 0 ? "document" : "general",
        sources: result.sources,
        category: result.category,
        urgency: result.urgency,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I couldn't process your question at the moment. Please try again later.",
        timestamp: new Date(),
        type: "general",
        error: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const getMessageIcon = (type?: Message["type"]) => {
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

  const formatTime = (date: Date) => {
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
                        : message.error
                        ? "bg-destructive/10 border border-destructive/20 mr-12"
                        : "bg-muted mr-12"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {message.type && (
                          <Badge variant="outline" className="text-xs">
                            {message.type}
                          </Badge>
                        )}
                        {message.category && (
                          <Badge
                            variant={message.urgency === 'high' ? 'destructive' : message.urgency === 'medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {message.category}
                          </Badge>
                        )}
                        {message.urgency === 'high' && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    )}
                    {message.urgency === 'high' && message.role === "assistant" && (
                      <div className="mb-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-xs text-destructive">
                        ⚠️ <strong>Important:</strong> This appears to be an urgent legal matter. Please seek immediate legal assistance.
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>

                    {/* Sources for assistant messages */}
                    {message.role === "assistant" && message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <BookOpen className="h-3 w-3" />
                          <span>Sources:</span>
                        </div>
                        <div className="space-y-1">
                          {message.sources.slice(0, 3).map((source, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <ExternalLink className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">
                                {source.title || source.section || source.id || "Legal Document"}
                              </span>
                              {source.score && (
                                <Badge variant="secondary" className="text-xs px-1 py-0">
                                  {Math.round(source.score * 100)}%
                                </Badge>
                              )}
                            </div>
                          ))}
                          {message.sources.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{message.sources.length - 3} more sources
                            </div>
                          )}
                        </div>
                      </div>
                    )}

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
