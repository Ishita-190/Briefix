import { useState, useRef } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle,
  Brain,
  Download,
  Loader2,
  Eye,
  FileX,
} from "lucide-react";

export default function DocumentsPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e(e)) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e(e)) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e(e)) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check file type
    const allowedTypes = [".pdf", ".doc", ".docx", ".txt"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      alert("Please upload a PDF, DOC, DOCX, or TXT file.");
      return;
    }

    setUploadedFile(file);
    setAnalysis(null);
  };

  const analyzeDocument = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);

    // Simulate document analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock analysis results
    const mockAnalysis = {
      documentType: uploadedFile.name.includes("contract")
        ? "Employment Contract"
        : uploadedFile.name.includes("lease")
          ? "Rental Lease Agreement"
          : uploadedFile.name.includes("will")
            ? "Last Will and Testament"
            : "Legal Document",
      summary:
        "This document establishes a legal relationship between multiple parties with specific terms, conditions, and obligations that must be fulfilled by each party.",
      keyPoints: [
        "Defines the primary obligations and responsibilities of each party",
        "Establishes specific deadlines and timelines for performance",
        "Includes termination clauses and conditions for ending the agreement",
        "Specifies dispute resolution procedures and governing law",
        "Contains standard legal protections and liability limitations",
      ],
      potentialConcerns: [
        {
          level: "high",
          issue: "Unusual termination clause",
          description:
            "The termination conditions may be more restrictive than typical industry standards.",
        },
        {
          level: "medium",
          issue: "Liability limitations",
          description:
            "Some liability protections may be asymmetrical between parties.",
        },
        {
          level: "low",
          issue: "Minor formatting issues",
          description: "Some standard clauses could be more clearly worded.",
        },
      ],
      recommendations: [
        "Consider consulting with a legal professional before signing",
        "Review all financial obligations and payment terms carefully",
        "Understand the termination process and any associated penalties",
        "Clarify any ambiguous language with the other party",
        "Keep a signed copy for your records",
      ],
      complexity: "Moderate",
      readingTime: "15-20 minutes",
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const getConcernColor = (level,) => {
    switch (level) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Document Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your legal documents for AI-powered analysis, summaries, and
            insights.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Document
            </CardTitle>
            <CardDescription>
              Supported formats: PDF, DOC, DOCX, TXT (max 10MB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-accent bg-accent/10"
                  : "border-muted-foreground/25 hover:border-accent/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleChange}
              />

              {uploadedFile ? (
                <div className="space-y-4">
                  <FileText className="h-12 w-12 text-accent mx-auto" />
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={analyzeDocument} disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="mr-2 h-4 w-4" />
                          Analyze Document
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setUploadedFile(null);
                        setAnalysis(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      <FileX className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-medium">
                      Drop your document here
                    </p>
                    <p className="text-muted-foreground">
                      or click to browse files
                    </p>
                  </div>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    Select File
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Document Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-accent" />
                  Document Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Type: {analysis.documentType}</Badge>
                  <Badge variant="outline">
                    Complexity: {analysis.complexity}
                  </Badge>
                  <Badge variant="outline">
                    Reading Time: {analysis.readingTime}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{analysis.summary}</p>
              </CardContent>
            </Card>

            {/* Key Points */}
            <Card>
              <CardHeader>
                <CardTitle>Key Points</CardTitle>
                <CardDescription>
                  Important elements identified in your document
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysis.keyPoints.map((point,, index,) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Potential Concerns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Potential Concerns
                </CardTitle>
                <CardDescription>
                  Areas that may require additional attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.potentialConcerns.map(
                  (concern,, index,) => (
                    <Alert key={index}>
                      <AlertTriangle className="h-4 w-4" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{concern.issue}</span>
                          <Badge
                            variant={getConcernColor(concern.level)}
                          >
                            {concern.level} priority
                          </Badge>
                        </div>
                        <AlertDescription>
                          {concern.description}
                        </AlertDescription>
                      </div>
                    </Alert>
                  ),
                )}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>
                  Suggested next steps for this document
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysis.recommendations.map(
                    (rec,, index,) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span>{rec}</span>
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Example Documents */}
        {!uploadedFile && (
          <Card>
            <CardHeader>
              <CardTitle>Try Sample Documents</CardTitle>
              <CardDescription>
                Test the analysis with these example documents
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "Employment Contract",
                  type: "Contract",
                  description: "Standard employment agreement with benefits",
                },
                {
                  name: "Rental Lease Agreement",
                  type: "Lease",
                  description: "Residential property rental terms",
                },
                {
                  name: "NDA Document",
                  type: "Agreement",
                  description: "Non-disclosure agreement template",
                },
                {
                  name: "Service Agreement",
                  type: "Contract",
                  description: "Professional services contract",
                },
              ].map((doc, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start"
                  onClick={() => {
                    // Create a mock file for demonstration
                    const file = new File(
                      [""],
                      `${doc.name.toLowerCase().replace(/\s+/g, "-")}.pdf`,
                      { type: "application/pdf" },
                    );
                    setUploadedFile(file);
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">{doc.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {doc.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground text-left">
                    {doc.description}
                  </p>
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            ⚠️ <strong>Important:</strong> This analysis is for educational
            purposes only. AI-generated insights should be verified by a
            qualified legal professional before making any decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
