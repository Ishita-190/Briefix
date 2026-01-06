import { Link, useLocation } from "react-router-dom";
import { Scale, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/80 border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl shadow-lg shadow-primary/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-18">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Scale className="h-9 w-9 text-primary group-hover:scale-110 transition-transform duration-200" />
              <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1 opacity-70" />
            </div>
            <span className="text-2xl font-bold text-primary tracking-tight">
              Briefix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/explain"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-primary/5",
                isActive("/explain")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              AI Explanation
            </Link>
            <Link
              to="/documents"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-primary/5",
                isActive("/documents")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              Document Analysis
            </Link>
            <Link
              to="/procedures"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-primary/5",
                isActive("/procedures")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              Legal Procedures
            </Link>
            <Link
              to="/chat"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-primary/5",
                isActive("/chat")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              Ask AI
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/5"
              asChild
            >
              <Link to="/login">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
              asChild
            >
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary/5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/explain"
              className="block text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Explanation
            </Link>
            <Link
              to="/documents"
              className="block text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Document Analysis
            </Link>
            <Link
              to="/procedures"
              className="block text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Legal Procedures
            </Link>
            <Link
              to="/chat"
              className="block text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Ask AI
            </Link>
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
