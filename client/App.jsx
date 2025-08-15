import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import Index from "./pages/Index.jsx";
import ExplainPage from "./pages/ExplainPage.jsx";
import DocumentsPage from "./pages/DocumentsPage.jsx";
import ProceduresPage from "./pages/ProceduresPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import NotFound from "./pages/NotFound.jsx";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/explain" element={<ExplainPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/procedures" element={<ProceduresPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
