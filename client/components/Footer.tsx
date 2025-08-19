import { Link } from "react-router-dom";
import { Scale, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-accent text-primary-foreground overflow-hidden">
      {/* Glassmorphism background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <Scale className="h-10 w-10 group-hover:scale-110 transition-transform duration-200" />
                <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1 opacity-70" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Briefix</span>
            </Link>
            <p className="text-primary-foreground/90 mb-6 max-w-md text-lg leading-relaxed">
              Simplifying legal complexity through intelligent briefings and
              AI-powered guidance. Get clear, level-appropriate explanations for
              any legal matter.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-sm text-primary-foreground/80 flex items-center gap-2">
                <span className="text-yellow-300">⚠️</span>
                This is an AI assistant for educational purposes only. Not a
                substitute for professional legal advice.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg">Features</h3>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>
                <Link
                  to="/explain"
                  className="hover:text-primary-foreground hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 block"
                >
                  AI Explanation
                </Link>
              </li>
              <li>
                <Link
                  to="/documents"
                  className="hover:text-primary-foreground hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 block"
                >
                  Document Analysis
                </Link>
              </li>
              <li>
                <Link
                  to="/procedures"
                  className="hover:text-primary-foreground hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 block"
                >
                  Legal Procedures
                </Link>
              </li>
              <li>
                <Link
                  to="/chat"
                  className="hover:text-primary-foreground hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 block"
                >
                  Ask AI
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg">Support</h3>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>
                <Link
                  to="/help"
                  className="hover:text-primary-foreground hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 block"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary-foreground hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-primary-foreground hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-primary-foreground hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 block"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl mt-12 pt-8 pb-4 px-6 text-center text-primary-foreground/80 border border-white/20">
          <p className="text-lg font-medium">
            &copy; 2024 Briefix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
