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
  AlertCircle,
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
    "How to file an FIR",
    "What is anticipatory bail and when can I apply?",
    "How can I file a complaint against police misconduct?",
    "What is the procedure to register a will?",
    "Can the police search my house without a warrant?",
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
        content:
          "I'm sorry, I couldn't process your question at the moment. Please try again later.",
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
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-border/50 px-6 py-4 shadow-sm flex-shrink-0">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
            AI Legal Assistant
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground">
            Get immediate answers to your legal questions in plain English
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col px-4 py-4 min-h-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-hidden mb-4">
          <ScrollArea className="h-full px-4" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 mb-6 animate-fade-in ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-accent to-primary text-white rounded-xl flex items-center justify-center shadow-lg">
                      {getMessageIcon(message.type)}
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] lg:max-w-[80%] rounded-2xl p-4 shadow-lg break-words ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-primary to-accent text-white ml-8 lg:ml-12"
                        : message.error
                          ? "bg-red-50 border border-red-200 text-red-800 mr-8 lg:mr-12 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
                          : "bg-white/80 backdrop-blur-sm border border-white/20 mr-8 lg:mr-12"
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
                            variant={
                              message.urgency === "high"
                                ? "destructive"
                                : message.urgency === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {message.category}
                          </Badge>
                        )}
                        {message.urgency === "high" && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    )}
                    {message.urgency === "high" &&
                      message.role === "assistant" && (
                        <div className="mb-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-xs text-destructive">
                          ⚠️ <strong>Important:</strong> This appears to be an
                          urgent legal matter. Please seek immediate legal
                          assistance.
                        </div>
                      )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>

                    {/* Sources for assistant messages */}
                    {message.role === "assistant" &&
                      message.sources &&
                      message.sources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                            <BookOpen className="h-3 w-3" />
                            <span>Sources:</span>
                          </div>
                          <div className="space-y-1">
                            {message.sources
                              .slice(0, 3)
                              .map((source, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 text-xs text-muted-foreground"
                                >
                                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate">
                                    {source.title ||
                                      source.section ||
                                      source.id ||
                                      "Legal Document"}
                                  </span>
                                  {source.score && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs px-1 py-0"
                                    >
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
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent text-white rounded-xl flex items-center justify-center shadow-lg">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start mb-6 animate-fade-in">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-accent to-primary text-white rounded-xl flex items-center justify-center shadow-lg">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mr-12 shadow-lg">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="font-medium">AI is thinking...</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Quick Questions - Only show when no conversation */}
        {messages.length <= 1 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20 shadow-lg flex-shrink-0">
            <h4 className="font-semibold mb-3 text-primary">
              Popular Questions:
            </h4>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2 hover:bg-primary/5 hover:border-primary/20 whitespace-normal text-left"
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Sticky Input Area */}
        <div className="bg-white/90 backdrop-blur-xl border-t border-border/50 p-4 shadow-lg flex-shrink-0">
          <div className="flex gap-3 items-end">
            <Textarea
              ref={textareaRef}
              placeholder="Ask any legal question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="resize-none bg-white/80 border-border/30 focus:border-primary/50 focus:bg-white transition-all duration-200 flex-1 min-h-[56px] max-h-[120px]"
              rows={2}
              maxLength={1000}
            />
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg h-[56px] w-[56px] flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">
              Press Enter to send, Shift+Enter for new line
            </p>
            <p className="text-xs text-muted-foreground">{input.length}/1000</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-primary/5 backdrop-blur-sm border-t border-border/50 px-6 py-3 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs lg:text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
            <span>
              <strong>Important:</strong> This AI provides educational
              information only. Responses are not legal advice. For specific
              legal matters, consult with a qualified attorney.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
