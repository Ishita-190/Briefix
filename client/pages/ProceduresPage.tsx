import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  FileText,
  Users,
  IndianRupee,
  Calendar,
  MapPin,
  Search,
  X,
  Home,
  Heart,
  Gavel,
  FileCheck,
} from "lucide-react";

type ProcedureStep = {
  id: number;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
  optional?: boolean;
};

type LegalProcedure = {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  complexity: "Beginner" | "Intermediate" | "Advanced";
  cost: string;
  steps: ProcedureStep[];
};

export default function ProceduresPage() {
  const [selectedProcedure, setSelectedProcedure] =
    useState<LegalProcedure | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const procedures: LegalProcedure[] = [
    {
      id: "small-claims",
      title: "Filing a Small Claims Lawsuit",
      description:
        "Step-by-step guide to filing and pursuing a small claims case",
      category: "Court Proceedings",
      estimatedTime: "2-4 weeks",
      complexity: "Beginner",
      cost: "₹2,000-₹5,000 filing fee",
      steps: [
        {
          id: 1,
          title: "Determine if your case qualifies",
          description:
            "Verify your claim amount is within your state's small claims limit (typically ₹20,000-₹75,000)",
          estimatedTime: "30 minutes",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 2,
          title: "Gather your evidence",
          description:
            "Collect contracts, receipts, photos, emails, and any other relevant documentation",
          estimatedTime: "2-3 hours",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 3,
          title: "Attempt to resolve outside court",
          description:
            "Send a demand letter to the other party requesting payment or resolution",
          estimatedTime: "1-2 weeks",
          difficulty: "Medium",
          completed: false,
          optional: true,
        },
        {
          id: 4,
          title: "File your claim",
          description:
            "Complete the small claims forms at your local courthouse and pay the filing fee",
          estimatedTime: "1-2 hours",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 5,
          title: "Serve the defendant",
          description:
            "Officially notify the other party of the lawsuit through proper legal service",
          estimatedTime: "1 week",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 6,
          title: "Prepare for court",
          description:
            "Organize your evidence, practice your presentation, and plan your arguments",
          estimatedTime: "3-5 hours",
          difficulty: "Hard",
          completed: false,
        },
        {
          id: 7,
          title: "Attend the hearing",
          description: "Present your case to the judge clearly and concisely",
          estimatedTime: "2-4 hours",
          difficulty: "Hard",
          completed: false,
        },
      ],
    },
    {
      id: "name-change",
      title: "Legal Name Change",
      description: "Complete process for legally changing your name",
      category: "Personal Legal",
      estimatedTime: "4-8 weeks",
      complexity: "Intermediate",
      cost: "₹10,000-₹35,000",
      steps: [
        {
          id: 1,
          title: "Check eligibility requirements",
          description:
            "Ensure you meet your state's requirements for name change (age, criminal background, etc.)",
          estimatedTime: "1 hour",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 2,
          title: "Complete the petition",
          description:
            "Fill out the name change petition forms for your jurisdiction",
          estimatedTime: "1-2 hours",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 3,
          title: "File with the court",
          description: "Submit your petition and pay the required filing fees",
          estimatedTime: "1 hour",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 4,
          title: "Publish legal notice",
          description:
            "Publish notice of your name change in a local newspaper (if required)",
          estimatedTime: "1-4 weeks",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 5,
          title: "Attend court hearing",
          description: "Appear before a judge to finalize your name change",
          estimatedTime: "1-2 hours",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 6,
          title: "Update your documents",
          description:
            "Update Aadhaar card, driver's license, passport, and other official documents",
          estimatedTime: "2-4 weeks",
          difficulty: "Hard",
          completed: false,
        },
      ],
    },
    {
      id: "will-creation",
      title: "Creating a Will",
      description: "Guide to drafting and executing a legally valid will",
      category: "Estate Planning",
      estimatedTime: "2-3 weeks",
      complexity: "Intermediate",
      cost: "₹7,000-₹70,000",
      steps: [
        {
          id: 1,
          title: "Inventory your assets",
          description:
            "List all your property, bank accounts, investments, and personal belongings",
          estimatedTime: "2-4 hours",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 2,
          title: "Choose your beneficiaries",
          description:
            "Decide who will inherit your assets and in what proportions",
          estimatedTime: "1-2 hours",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 3,
          title: "Select an executor",
          description:
            "Choose a trusted person to manage your estate and carry out your wishes",
          estimatedTime: "30 minutes",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 4,
          title: "Draft your will",
          description:
            "Write or use a template to create your will, following your state's requirements",
          estimatedTime: "2-3 hours",
          difficulty: "Hard",
          completed: false,
        },
        {
          id: 5,
          title: "Sign and witness",
          description:
            "Sign your will in the presence of witnesses as required by your state law",
          estimatedTime: "1 hour",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 6,
          title: "Store safely",
          description:
            "Keep your will in a safe, accessible place and inform your executor of its location",
          estimatedTime: "30 minutes",
          difficulty: "Easy",
          completed: false,
        },
      ],
    },
    {
      id: "partition-property",
      title: "Partition of Property",
      description: "Legal process for dividing property among co-owners",
      category: "Property Law",
      estimatedTime: "6-12 months",
      complexity: "Advanced",
      cost: "₹25,000-₹1,00,000",
      steps: [
        {
          id: 1,
          title: "Verify ownership documents",
          description:
            "Collect all property documents including title deeds, sale agreements, and mutation records",
          estimatedTime: "1-2 weeks",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 2,
          title: "Determine share of each co-owner",
          description:
            "Calculate the exact share of each owner based on ownership type and contribution",
          estimatedTime: "1-2 weeks",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 3,
          title: "Send legal notice to co-owners",
          description:
            "Formally notify all co-owners about your intention to partition the property",
          estimatedTime: "1 week",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 4,
          title: "Attempt amicable settlement",
          description:
            "Negotiate with co-owners for a mutual agreement on property division",
          estimatedTime: "2-4 weeks",
          difficulty: "Hard",
          completed: false,
          optional: true,
        },
        {
          id: 5,
          title: "File partition suit in court",
          description:
            "If no agreement, file a partition suit in the appropriate civil court",
          estimatedTime: "1-2 weeks",
          difficulty: "Hard",
          completed: false,
        },
        {
          id: 6,
          title: "Attend court proceedings",
          description:
            "Participate in court hearings and provide necessary evidence",
          estimatedTime: "3-6 months",
          difficulty: "Hard",
          completed: false,
        },
        {
          id: 7,
          title: "Comply with court order",
          description:
            "Follow the court's decision for property division and execute the partition",
          estimatedTime: "2-4 weeks",
          difficulty: "Medium",
          completed: false,
        },
      ],
    },
    {
      id: "marriage-registration",
      title: "Marriage Registration",
      description: "Process for legally registering your marriage in India",
      category: "Family Law",
      estimatedTime: "2-4 weeks",
      complexity: "Beginner",
      cost: "₹100-₹500",
      steps: [
        {
          id: 1,
          title: "Determine registration type",
          description:
            "Decide between Hindu Marriage Act, Special Marriage Act, or other applicable acts",
          estimatedTime: "30 minutes",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 2,
          title: "Collect required documents",
          description:
            "Gather age proof, address proof, marriage photos, and witness documents",
          estimatedTime: "1-2 days",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 3,
          title: "Fill application form",
          description:
            "Complete the marriage registration form available at the registrar's office",
          estimatedTime: "1-2 hours",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 4,
          title: "Submit application with fees",
          description:
            "Submit the completed form along with required documents and fees",
          estimatedTime: "1-2 hours",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 5,
          title: "Schedule appointment",
          description:
            "Book an appointment for the registrar to visit and verify the marriage",
          estimatedTime: "1-2 weeks",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 6,
          title: "Attend verification",
          description:
            "Both spouses and witnesses must be present during the registrar's visit",
          estimatedTime: "1-2 hours",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 7,
          title: "Collect marriage certificate",
          description:
            "Receive the official marriage certificate after verification is complete",
          estimatedTime: "1-2 weeks",
          difficulty: "Easy",
          completed: false,
        },
      ],
    },
    {
      id: "recovery-money",
      title: "Recovery of Money",
      description: "Legal process for recovering money through cheque bounce or debt recovery",
      category: "Financial Law",
      estimatedTime: "3-6 months",
      complexity: "Intermediate",
      cost: "₹5,000-₹20,000",
      steps: [
        {
          id: 1,
          title: "Send legal notice",
          description:
            "For cheque bounce: Send a legal notice under Section 138 of NI Act within 30 days of bounce",
          estimatedTime: "1 week",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 2,
          title: "Wait for response",
          description:
            "Allow 15 days for the recipient to respond to the legal notice",
          estimatedTime: "15 days",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 3,
          title: "File complaint in court",
          description:
            "If no payment is received, file a complaint in the appropriate court",
          estimatedTime: "1-2 weeks",
          difficulty: "Hard",
          completed: false,
        },
        {
          id: 4,
          title: "Attend court hearings",
          description:
            "Appear for all court hearings and present your case with evidence",
          estimatedTime: "2-4 months",
          difficulty: "Hard",
          completed: false,
        },
        {
          id: 5,
          title: "Obtain court order",
          description:
            "Receive the court judgment in your favor with payment directions",
          estimatedTime: "1-2 months",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 6,
          title: "Execute the order",
          description:
            "If the defaulter still doesn't pay, take steps to execute the court order",
          estimatedTime: "1-2 months",
          difficulty: "Hard",
          completed: false,
        },
      ],
    },
    {
      id: "file-case-court",
      title: "How to File a Case in Court",
      description: "Complete guide to filing a civil or criminal case in Indian courts",
      category: "Court Proceedings",
      estimatedTime: "1-2 weeks",
      complexity: "Intermediate",
      cost: "₹2,000-₹10,000",
      steps: [
        {
          id: 1,
          title: "Consult a lawyer",
          description:
            "Seek legal advice to understand the merits of your case and appropriate court",
          estimatedTime: "1-2 hours",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 2,
          title: "Gather evidence",
          description:
            "Collect all relevant documents, photos, videos, and witness statements",
          estimatedTime: "2-5 days",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 3,
          title: "Draft plaint/complaint",
          description:
            "Prepare the legal document stating facts, grounds, and relief sought",
          estimatedTime: "2-3 days",
          difficulty: "Hard",
          completed: false,
        },
        {
          id: 4,
          title: "Pay court fees",
          description:
            "Calculate and pay the required court fees based on the case value",
          estimatedTime: "1 day",
          difficulty: "Easy",
          completed: false,
        },
        {
          id: 5,
          title: "File the case",
          description:
            "Submit all documents to the appropriate court and get the case registered",
          estimatedTime: "1-2 days",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 6,
          title: "Serve notice to opposite party",
          description:
            "Ensure the opposite party receives legal notice of the case",
          estimatedTime: "1-2 weeks",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 7,
          title: "Prepare for first hearing",
          description:
            "Organize your documents and prepare arguments for the first court appearance",
          estimatedTime: "2-3 days",
          difficulty: "Medium",
          completed: false,
        },
      ],
    },
  ];
  
  // Filter procedures based on search query
  const filteredProcedures = procedures.filter((procedure) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      procedure.title.toLowerCase().includes(query) ||
      procedure.description.toLowerCase().includes(query) ||
      procedure.category.toLowerCase().includes(query) ||
      procedure.steps.some(step => 
        step.title.toLowerCase().includes(query) || 
        step.description.toLowerCase().includes(query)
      )
    );
  });
  
  const toggleStepCompletion = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId],
    );
  };
  
  const getCompletionPercentage = (procedure: LegalProcedure) => {
    const totalSteps = procedure.steps.length;
    const completed = procedure.steps.filter((step) =>
      completedSteps.includes(step.id),
    ).length;
    return Math.round((completed / totalSteps) * 100);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const getComplexityVariant = (complexity: string) => {
    switch (complexity) {
      case "Beginner":
        return "secondary";
      case "Intermediate":
        return "default";
      case "Advanced":
        return "destructive";
      default:
        return "default";
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Property Law":
        return <Home className="h-4 w-4" />;
      case "Family Law":
        return <Heart className="h-4 w-4" />;
      case "Financial Law":
        return <IndianRupee className="h-4 w-4" />;
      case "Court Proceedings":
        return <Gavel className="h-4 w-4" />;
      case "Estate Planning":
        return <FileCheck className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Legal Procedures Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Step-by-step guidance through common legal processes with clear
            instructions and timelines.
          </p>
        </div>
        
        {/* Search Box */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for legal procedures..."
              className="w-full p-3 pl-10 pr-10 rounded-lg border border-border bg-background text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              Found {filteredProcedures.length} procedure{filteredProcedures.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Procedures List */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Available Procedures
              {searchQuery && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({filteredProcedures.length} results)
                </span>
              )}
            </h2>
            <div className="space-y-4">
              {filteredProcedures.length > 0 ? (
                filteredProcedures.map((procedure) => (
                  <Card
                    key={procedure.id}
                    className={`cursor-pointer transition-colors ${
                      selectedProcedure?.id === procedure.id
                        ? "border-accent shadow-lg"
                        : "hover:border-accent/50"
                    }`}
                    onClick={() => setSelectedProcedure(procedure)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {procedure.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {procedure.description}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            getComplexityVariant(procedure.complexity) as any
                          }
                        >
                          {procedure.complexity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {procedure.estimatedTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {procedure.cost}
                        </div>
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(procedure.category)}
                          {procedure.category}
                        </div>
                      </div>
                      {selectedProcedure?.id === procedure.id && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">
                              {getCompletionPercentage(procedure)}%
                            </span>
                          </div>
                          <Progress
                            value={getCompletionPercentage(procedure)}
                            className="h-2"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No procedures found matching your search.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Procedure Details */}
          <div>
            {selectedProcedure ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-accent" />
                      {selectedProcedure.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {selectedProcedure.estimatedTime}
                      </Badge>
                      <Badge variant="outline">
                        <IndianRupee className="h-3 w-3 mr-1" />
                        {selectedProcedure.cost}
                      </Badge>
                      <Badge
                        variant={
                          getComplexityVariant(
                            selectedProcedure.complexity,
                          ) as any
                        }
                      >
                        {selectedProcedure.complexity}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Steps to Complete</CardTitle>
                    <CardDescription>
                      Follow these steps in order. Check off each step as you
                      complete it.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedProcedure.steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                          completedSteps.includes(step.id)
                            ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                            : "bg-muted/50 border-border"
                        }`}
                      >
                        <button
                          onClick={() => toggleStepCompletion(step.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            completedSteps.includes(step.id)
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-muted-foreground hover:border-accent"
                          }`}
                        >
                          {completedSteps.includes(step.id) && (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4
                              className={`font-medium ${
                                completedSteps.includes(step.id)
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              Step {index + 1}: {step.title}
                            </h4>
                            {step.optional && (
                              <Badge variant="outline" className="text-xs">
                                Optional
                              </Badge>
                            )}
                          </div>
                          <p
                            className={`text-sm text-muted-foreground mb-2 ${
                              completedSteps.includes(step.id)
                                ? "line-through"
                                : ""
                            }`}
                          >
                            {step.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {step.estimatedTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <div
                                className={`w-2 h-2 rounded-full ${getDifficultyColor(step.difficulty)}`}
                              />
                              {step.difficulty}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      Important Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p>
                      • Laws and procedures vary by state and jurisdiction.
                      Verify local requirements.
                    </p>
                    <p>
                      • Filing fees and timelines are estimates and may differ
                      in your area.
                    </p>
                    <p>
                      • Consider consulting with a qualified attorney for
                      complex cases or if you're unsure about any step.
                    </p>
                    <p>
                      • Keep copies of all documents and correspondence
                      throughout the process.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-16">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">
                    Select a Procedure
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a legal procedure from the list to see detailed
                    step-by-step guidance.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            ⚠️ <strong>Important:</strong> This guidance is for educational
            purposes only. Legal procedures vary by jurisdiction. Always verify
            local requirements and consider consulting with a qualified
            attorney.
          </p>
        </div>
      </div>
    </div>
  );
}
