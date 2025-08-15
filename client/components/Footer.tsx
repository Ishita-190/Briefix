import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8" />
              <span className="text-xl font-bold">Briefix</span>
            </Link>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Making legal help accessible through AI-powered explanations and guidance. 
              Understand complex legal concepts at your level.
            </p>
            <p className="text-sm text-primary-foreground/60">
              ⚠️ This is an AI assistant for educational purposes only. Not a substitute for professional legal advice.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link to="/explain" className="hover:text-primary-foreground transition-colors">AI Explanation</Link></li>
              <li><Link to="/documents" className="hover:text-primary-foreground transition-colors">Document Analysis</Link></li>
              <li><Link to="/procedures" className="hover:text-primary-foreground transition-colors">Legal Procedures</Link></li>
              <li><Link to="/chat" className="hover:text-primary-foreground transition-colors">Ask AI</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link to="/help" className="hover:text-primary-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Briefix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
