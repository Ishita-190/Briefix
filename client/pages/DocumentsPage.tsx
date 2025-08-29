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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
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
  Search,
  Calendar,
  User,
  Shield,
  DollarSign,
  FileSignature,
  Image,
} from "lucide-react";

export default function DocumentsPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample documents with images
  const sampleDocuments = [
    {
      id: 1,
      name: "Employment Contract",
      type: "Contract",
      description: "Standard employment agreement with benefits",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop",
      mockAnalysis: {
        documentType: "Employment Contract",
        summary: "This employment contract establishes the terms of employment between the employer and employee, including compensation, benefits, responsibilities, and termination conditions.",
        keyPoints: [
          "Employee position and job description",
          "Compensation structure and payment schedule",
          "Benefits package including health insurance and leave policies",
          "Working hours and overtime policies",
          "Termination conditions and notice period"
        ],
        potentialConcerns: [
          {
            level: "high",
            issue: "Non-compete clause",
            description: "The non-compete clause is overly broad and may not be enforceable in your jurisdiction."
          },
          {
            level: "medium",
            issue: "Termination at-will",
            description: "The contract allows termination without cause, which may not provide adequate job security."
          },
          {
            level: "low",
            issue: "Vague bonus structure",
            description: "The bonus calculation method is not clearly defined."
          }
        ],
        recommendations: [
          "Negotiate the non-compete clause to be more reasonable in scope and duration",
          "Request a probationary period with clear evaluation criteria",
          "Clarify the bonus structure and payment conditions",
          "Consider adding a severance clause for termination without cause",
          "Review the intellectual property assignment clause"
        ],
        complexity: "Moderate",
        readingTime: "15-20 minutes",
        parties: ["Employer", "Employee"],
        effectiveDate: "January 1, 2023",
        jurisdiction: "State of California",
        keyClauses: [
          "Compensation",
          "Benefits",
          "Termination",
          "Confidentiality",
          "Non-compete"
        ]
      }
    },
    {
      id: 2,
      name: "Rental Lease Agreement",
      type: "Lease",
      description: "Residential property rental terms",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=400&fit=crop",
      mockAnalysis: {
        documentType: "Rental Lease Agreement",
        summary: "This lease agreement establishes the terms under which a tenant may occupy a residential property, including rent, duration, and responsibilities of both landlord and tenant.",
        keyPoints: [
          "Property description and address",
          "Lease term and renewal options",
          "Rent amount and payment schedule",
          "Security deposit requirements",
          "Maintenance and repair responsibilities"
        ],
        potentialConcerns: [
          {
            level: "high",
            issue: "Automatic renewal clause",
            description: "The lease automatically renews for a full year unless terminated 60 days in advance."
          },
          {
            level: "medium",
            issue: "Unlimited guest policy",
            description: "The lease doesn't specify limitations on long-term guests."
          },
          {
            level: "low",
            issue: "Vague maintenance procedures",
            description: "The process for reporting and addressing maintenance issues is not clearly defined."
          }
        ],
        recommendations: [
          "Negotiate the automatic renewal clause to a month-to-month tenancy after the initial term",
          "Request clarification on guest policies and potential additional fees",
          "Establish a clear procedure for maintenance requests and response times",
          "Document the property condition thoroughly before moving in",
          "Consider renter's insurance to protect personal belongings"
        ],
        complexity: "Simple",
        readingTime: "10-15 minutes",
        parties: ["Landlord", "Tenant"],
        effectiveDate: "June 1, 2023",
        jurisdiction: "State of New York",
        keyClauses: [
          "Rent Payment",
          "Security Deposit",
          "Property Use",
          "Maintenance",
          "Termination"
        ]
      }
    },
    {
      id: 3,
      name: "NDA Document",
      type: "Agreement",
      description: "Non-disclosure agreement template",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=400&fit=crop",
      mockAnalysis: {
        documentType: "Non-Disclosure Agreement",
        summary: "This NDA establishes a confidential relationship between parties to protect sensitive information shared during business discussions or collaborations.",
        keyPoints: [
          "Definition of confidential information",
          "Obligations of the receiving party",
          "Exclusions from confidential treatment",
          "Term and duration of confidentiality",
          "Remedies for breach of agreement"
        ],
        potentialConcerns: [
          {
            level: "high",
            issue: "Overly broad definition",
            description: "The definition of confidential information is excessively broad and may include publicly available information."
          },
          {
            level: "medium",
            issue: "Unlimited duration",
            description: "The confidentiality obligation has no time limit, which may be unreasonable."
          },
          {
            level: "low",
            issue: "No return provision",
            description: "The agreement doesn't specify the process for returning or destroying confidential information."
          }
        ],
        recommendations: [
          "Narrow the definition of confidential information to exclude publicly available information",
          "Negotiate a reasonable time limit for confidentiality obligations",
          "Add a clause specifying the return or destruction of confidential information",
          "Clarify the permitted uses of confidential information",
          "Consider adding exceptions for independently developed information"
        ],
        complexity: "Moderate",
        readingTime: "10-15 minutes",
        parties: ["Disclosing Party", "Receiving Party"],
        effectiveDate: "March 15, 2023",
        jurisdiction: "State of Delaware",
        keyClauses: [
          "Definition of Confidential Information",
          "Obligations",
          "Exclusions",
          "Term",
          "Remedies"
        ]
      }
    },
    {
      id: 4,
      name: "Service Agreement",
      type: "Contract",
      description: "Professional services contract",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=400&fit=crop",
      mockAnalysis: {
        documentType: "Service Agreement",
        summary: "This service agreement outlines the terms under which a service provider will deliver professional services to a client, including scope, payment, and performance expectations.",
        keyPoints: [
          "Detailed description of services to be provided",
          "Payment terms and billing schedule",
          "Timeline and deliverables",
          "Performance standards and acceptance criteria",
          "Termination rights and procedures"
        ],
        potentialConcerns: [
          {
            level: "high",
            issue: "Unlimited liability",
            description: "The service provider has unlimited liability for any errors or omissions."
          },
          {
            level: "medium",
            issue: "Vague scope of work",
            description: "The scope of services is not clearly defined, leading to potential misunderstandings."
          },
          {
            level: "low",
            issue: "No dispute resolution process",
            description: "The agreement lacks a clear process for resolving disputes between parties."
          }
        ],
        recommendations: [
          "Negotiate a reasonable limitation of liability clause",
          "Request a more detailed scope of work with specific deliverables",
          "Add a dispute resolution clause with mediation or arbitration provisions",
          "Clarify the change order process for additional services",
          "Include specific performance metrics and acceptance criteria"
        ],
        complexity: "Moderate",
        readingTime: "15-20 minutes",
        parties: ["Service Provider", "Client"],
        effectiveDate: "April 10, 2023",
        jurisdiction: "State of Texas",
        keyClauses: [
          "Scope of Services",
          "Payment Terms",
          "Performance",
          "Termination",
          "Confidentiality"
        ]
      }
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    // Check if this is a sample document
    const sampleDoc = sampleDocuments.find(doc => 
      uploadedFile.name.toLowerCase().includes(doc.name.toLowerCase().replace(/\s+/g, "-"))
    );
    
    if (sampleDoc) {
      // Use the mock analysis for the sample document
      setAnalysis(sampleDoc.mockAnalysis);
    } else {
      // Mock analysis results for uploaded document
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
    }
    setIsAnalyzing(false);
  };

  const getConcernColor = (level: string) => {
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

  const loadSampleDocument = (doc: any) => {
    // Create a mock file for demonstration
    const file = new File(
      [""],
      `${doc.name.toLowerCase().replace(/\s+/g, "-")}.pdf`,
      { type: "application/pdf" },
    );
    setUploadedFile(file);
    setActiveTab("upload");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Document Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your legal documents for AI-powered analysis, summaries, and
            insights.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Document</TabsTrigger>
            <TabsTrigger value="samples">Sample Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            {/* Upload Section */}
            <Card>
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
          </TabsContent>
          
          <TabsContent value="samples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sample Documents</CardTitle>
                <CardDescription>
                  Click on any document to see a detailed analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sampleDocuments.map((doc) => (
                    <Card 
                      key={doc.id} 
                      className="cursor-pointer transition-all hover:shadow-md"
                      onClick={() => loadSampleDocument(doc)}
                    >
                      <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                        <img 
                          src={doc.imageUrl} 
                          alt={doc.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-1">{doc.name}</h3>
                        <Badge variant="secondary" className="mb-2">
                          {doc.type}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {doc.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6 mt-8">
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
                  {analysis.parties && (
                    <Badge variant="outline">
                      <User className="h-3 w-3 mr-1" />
                      {analysis.parties.join(" & ")}
                    </Badge>
                  )}
                  {analysis.effectiveDate && (
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      {analysis.effectiveDate}
                    </Badge>
                  )}
                  {analysis.jurisdiction && (
                    <Badge variant="outline">
                      <Shield className="h-3 w-3 mr-1" />
                      {analysis.jurisdiction}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{analysis.summary}</p>
                
                {analysis.keyClauses && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Key Clauses</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keyClauses.map((clause: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {clause}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
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
                  {analysis.keyPoints.map((point: string, index: number) => (
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
                  (concern: any, index: number) => (
                    <Alert key={index}>
                      <AlertTriangle className="h-4 w-4" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{concern.issue}</span>
                          <Badge
                            variant={getConcernColor(concern.level) as any}
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
                    (rec: string, index: number) => (
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
            
            {/* Sample Document Preview */}
            {sampleDocuments.find(doc => 
              uploadedFile && uploadedFile.name.toLowerCase().includes(doc.name.toLowerCase().replace(/\s+/g, "-"))
            ) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5 text-accent" />
                    Document Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <img 
                      src={sampleDocuments.find(doc => 
                        uploadedFile && uploadedFile.name.toLowerCase().includes(doc.name.toLowerCase().replace(/\s+/g, "-"))
                      )?.imageUrl} 
                      alt="Document preview"
                      className="max-w-md rounded-lg shadow-md"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
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
