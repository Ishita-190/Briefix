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
  Scale,
  Brain,
  FileText,
  MessageSquare,
  BookOpen,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Star,
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
        ,
      }}
    >
      {/* Hero Section */}
      <section
        className="relative py-24 lg:py-32 bg-gradient-to-b from-accent/10 to-background/80"
        style={{
          backgroundImage: 
          linear-gradient(45deg, rgba(139, 120, 93, 0.03) 0%, transparent 100%),
          url("/bgpic.webp")
          ,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6" variant="secondary">
              AI-Powered Legal Assistant
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Legal Help Made
              <span className="text-accent"> Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get complex legal concepts explained at your level - whether
              you're 12, 15, or a practicing lawyer. Our AI breaks down legal
              procedures and documents into language you understand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/explain">
                  Start Explaining <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/chat">Ask AI Assistant</Link>
              </Button>
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
              Our AI adapts to your level of understanding, making legal
              knowledge accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <Brain className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Smart Explanations</CardTitle>
                <CardDescription>
                  Choose your comprehension level: 12-year-old, 15-year-old, or
                  lawyer. Our AI adjusts the complexity accordingly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <FileText className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Document Analysis</CardTitle>
                <CardDescription>
                  Upload legal documents and get plain-English summaries, key
                  points, and potential concerns explained clearly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Legal Procedures</CardTitle>
                <CardDescription>
                  Step-by-step guidance through legal processes, from filing
                  paperwork to understanding court procedures.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-accent mb-4" />
                <CardTitle>AI Chat Assistant</CardTitle>
                <CardDescription>
                  Ask questions in natural language and get immediate, accurate
                  answers about legal concepts and procedures.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  Your legal questions and documents are handled with the
                  highest level of security and confidentiality.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <Zap className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Instant Answers</CardTitle>
                <CardDescription>
                  Get immediate clarification on legal terms, procedures, and
                  documents without waiting for appointments.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="py-20 bg-gradient-to-b from-secondary/30 to-muted/40 border-y border-border/50"
        style={{
          backgroundImage: `url("/bgpic.webp")`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Simple as 1-2-3
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting legal help has never been easier. Follow these simple
              steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Level</h3>
              <p className="text-muted-foreground">
                Select how complex you want the explanation: simple enough for a
                12-year-old, moderate for a 15-year-old, or detailed for legal
                professionals.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Ask or Upload</h3>
              <p className="text-muted-foreground">
                Type your legal question, upload a document for analysis, or ask
                about a specific legal procedure you need help with.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Clear Answers</h3>
              <p className="text-muted-foreground">
                Receive explanations tailored to your chosen complexity level,
                with actionable insights and next steps clearly outlined.
              </p>
            </div>
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
              Join thousands of people who've simplified their legal
              understanding with Briefix.
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
              ⚠️ Educational tool only • Not a substitute for professional legal
              advice
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
