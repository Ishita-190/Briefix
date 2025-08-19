import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Brain,
  FileText,
  MessageSquare,
  BookOpen,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  return (
    <div
      className="bg-background"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(139, 120, 93, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 120, 93, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(139, 120, 93, 0.1) 0%, transparent 50%)
        `,
      }}
    >
      {/* Hero Section */}
      <section
        className="relative py-28 lg:py-40 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(139, 120, 93, 0.1) 0%, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.85) 100%),
            url("/heroimage.jpg")
          `,
        }}
      >
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 -right-16 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-accent/15 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 px-6 py-2 text-sm font-medium bg-white/90 text-primary border-primary/20 shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-200" variant="secondary">
              ✨ AI-Powered Legal Assistant
            </Badge>
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-extrabold text-primary mb-8 leading-tight tracking-tight">
              Legal Help Made{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Simple</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 blur-2xl -z-10"></div>
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Get complex legal concepts explained at your level - whether you're 12, 15, or a practicing lawyer. Our AI breaks down legal procedures and documents into language you understand.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 border-0"
                asChild
              >
                <Link to="/explain">
                  Start Explaining <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-2 border-primary/30 text-primary hover:bg-primary/5 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link to="/chat">Ask AI Assistant</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="h-4 w-4" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Brain className="h-4 w-4" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              How Briefix Helps You
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI adapts to your level of understanding, making legal knowledge accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <Brain className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Smart Explanations</CardTitle>
                <CardDescription>
                  Choose your comprehension level: 12-year-old, 15-year-old, or lawyer. Our AI adjusts the complexity accordingly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <FileText className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Document Analysis</CardTitle>
                <CardDescription>
                  Upload legal documents and get plain-English summaries, key points, and potential concerns explained clearly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Legal Procedures</CardTitle>
                <CardDescription>
                  Step-by-step guidance through legal processes, from filing paperwork to understanding court procedures.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-accent mb-4" />
                <CardTitle>AI Chat Assistant</CardTitle>
                <CardDescription>
                  Ask questions in natural language and get immediate, accurate answers about legal concepts and procedures.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  Your legal questions and documents are handled with the highest level of security and confidentiality.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <Zap className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Instant Answers</CardTitle>
                <CardDescription>
                  Get immediate clarification on legal terms, procedures, and documents without waiting for appointments.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="py-20 border-y border-border/50 bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(139, 120, 93, 0.0005) 0%, transparent 100%),
            url("/image4.jpeg")
          `,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Simple as 1-2-3
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting legal help has never been easier. Follow these simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {["Choose Your Level", "Ask or Upload", "Get Clear Answers"].map((title, i) => (
              <div key={i} className="text-center">
                <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-muted-foreground">
                  {i === 0 && "Select how complex you want the explanation: simple enough for a 12-year-old, moderate for a 15-year-old, or detailed for legal professionals."}
                  {i === 1 && "Type your legal question, upload a document for analysis, or ask about a specific legal procedure you need help with."}
                  {i === 2 && "Receive explanations tailored to your chosen complexity level, with actionable insights and next steps clearly outlined."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div
            className="bg-primary rounded-2xl p-8 lg:p-16 text-center text-primary-foreground shadow-2xl border-2 border-accent/20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 10% 20%, rgba(139, 120, 93, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(139, 120, 93, 0.1) 0%, transparent 20%)
              `,
            }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Understand Your Legal Rights?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of people who've simplified their legal understanding with Briefix.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/explain">
                  Start Free Explanation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link to="/chat">Try AI Chat</Link>
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-6">
              ⚠️ Educational tool only • Not a substitute for professional legal advice
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
