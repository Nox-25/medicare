import Header from "@/components/layout/Header";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  FileText, 
  Heart, 
  Activity, 
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  Stethoscope,
  Pill,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { geminiService, type MedicalInsight, type TreatmentPlan } from "@/lib/gemini";

const MedicalInsights = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<MedicalInsight[]>([]);
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan | null>(null);
  const [documentAnalysis, setDocumentAnalysis] = useState<any>(null);
  const [healthRecommendations, setHealthRecommendations] = useState<any>(null);
  const { toast } = useToast();

  // Form states
  const [patientData, setPatientData] = useState({
    medicalHistory: "",
    currentSymptoms: "",
    medications: "",
    allergies: "",
    age: "",
    gender: "",
    lifestyle: ""
  });

  const [documentData, setDocumentData] = useState({
    text: "",
    type: "lab_report" as 'lab_report' | 'prescription' | 'medical_record' | 'other'
  });

  const [healthProfile, setHealthProfile] = useState({
    age: "",
    gender: "",
    medicalHistory: "",
    currentHealthStatus: "",
    lifestyle: ""
  });

  const handleGenerateInsights = async () => {
    if (!patientData.medicalHistory.trim() || !patientData.currentSymptoms.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in medical history and current symptoms.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const insights = await geminiService.generateMedicalInsights({
        medicalHistory: patientData.medicalHistory.split(',').map(s => s.trim()),
        currentSymptoms: patientData.currentSymptoms.split(',').map(s => s.trim()),
        medications: patientData.medications.split(',').map(s => s.trim()),
        allergies: patientData.allergies.split(',').map(s => s.trim()),
        age: patientData.age ? parseInt(patientData.age) : undefined,
        gender: patientData.gender || undefined
      });
      
      setInsights(insights);
      toast({
        title: "Insights Generated",
        description: "Medical insights have been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate medical insights. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTreatmentPlan = async () => {
    if (!patientData.currentSymptoms.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter current symptoms to generate a treatment plan.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const plan = await geminiService.generateTreatmentPlan(
        patientData.currentSymptoms,
        patientData
      );
      
      setTreatmentPlan(plan);
      toast({
        title: "Treatment Plan Generated",
        description: "Treatment plan has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate treatment plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeDocument = async () => {
    if (!documentData.text.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter document text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const analysis = await geminiService.analyzeMedicalDocument(
        documentData.text,
        documentData.type
      );
      
      setDocumentAnalysis(analysis);
      toast({
        title: "Document Analyzed",
        description: "Medical document has been analyzed successfully.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateHealthRecommendations = async () => {
    if (!healthProfile.age.trim() || !healthProfile.gender.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in age and gender for health recommendations.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const recommendations = await geminiService.generateHealthRecommendations({
        age: parseInt(healthProfile.age),
        gender: healthProfile.gender,
        medicalHistory: healthProfile.medicalHistory.split(',').map(s => s.trim()),
        currentHealthStatus: healthProfile.currentHealthStatus,
        lifestyle: healthProfile.lifestyle.split(',').map(s => s.trim())
      });
      
      setHealthRecommendations(recommendations);
      toast({
        title: "Recommendations Generated",
        description: "Health recommendations have been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate health recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            Medical Insights & AI Analysis
          </h1>
          <p className="text-muted-foreground text-lg">
            Advanced AI-powered medical analysis, insights, and recommendations
          </p>
        </div>

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights">Medical Insights</TabsTrigger>
            <TabsTrigger value="treatment">Treatment Plans</TabsTrigger>
            <TabsTrigger value="documents">Document Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Health Recommendations</TabsTrigger>
          </TabsList>

          {/* Medical Insights Tab */}
          <TabsContent value="insights">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter age"
                        value={patientData.age}
                        onChange={(e) => setPatientData(prev => ({ ...prev, age: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={patientData.gender} onValueChange={(value) => setPatientData(prev => ({ ...prev, gender: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea
                      id="medicalHistory"
                      placeholder="Enter medical history (comma-separated)"
                      value={patientData.medicalHistory}
                      onChange={(e) => setPatientData(prev => ({ ...prev, medicalHistory: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentSymptoms">Current Symptoms</Label>
                    <Textarea
                      id="currentSymptoms"
                      placeholder="Enter current symptoms (comma-separated)"
                      value={patientData.currentSymptoms}
                      onChange={(e) => setPatientData(prev => ({ ...prev, currentSymptoms: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      placeholder="Enter current medications (comma-separated)"
                      value={patientData.medications}
                      onChange={(e) => setPatientData(prev => ({ ...prev, medications: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      placeholder="Enter allergies (comma-separated)"
                      value={patientData.allergies}
                      onChange={(e) => setPatientData(prev => ({ ...prev, allergies: e.target.value }))}
                    />
                  </div>

                  <Button 
                    onClick={handleGenerateInsights} 
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Insights...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Generate Medical Insights
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Generated Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {insights.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Brain className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Fill in patient information and click "Generate Medical Insights"</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {insights.map((insight, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{insight.category}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {Math.round(insight.confidence * 100)}% confidence
                            </span>
                          </div>
                          <p className="text-sm">{insight.insight}</p>
                          <p className="text-xs text-muted-foreground">Source: {insight.source}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Treatment Plans Tab */}
          <TabsContent value="treatment">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    Generate Treatment Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Enter patient symptoms and information to generate a comprehensive treatment plan.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Primary Condition/Symptoms</Label>
                    <Textarea
                      id="condition"
                      placeholder="Describe the primary condition or symptoms"
                      value={patientData.currentSymptoms}
                      onChange={(e) => setPatientData(prev => ({ ...prev, currentSymptoms: e.target.value }))}
                    />
                  </div>

                  <Button 
                    onClick={handleGenerateTreatmentPlan} 
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Plan...
                      </>
                    ) : (
                      <>
                        <Stethoscope className="mr-2 h-4 w-4" />
                        Generate Treatment Plan
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5" />
                    Treatment Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!treatmentPlan ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Stethoscope className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Generate a treatment plan to see details here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Condition: {treatmentPlan.condition}</h4>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Immediate Actions:</h4>
                        <ul className="space-y-1">
                          {treatmentPlan.immediateActions.map((action, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Short-term Plan:</h4>
                        <ul className="space-y-1">
                          {treatmentPlan.shortTermPlan.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Long-term Plan:</h4>
                        <ul className="space-y-1">
                          {treatmentPlan.longTermPlan.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Heart className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {treatmentPlan.medications.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Medications:</h4>
                          <div className="space-y-2">
                            {treatmentPlan.medications.map((med, index) => (
                              <div key={index} className="border rounded p-2 text-sm">
                                <div className="font-medium">{med.name}</div>
                                <div className="text-muted-foreground">
                                  {med.dosage} - {med.frequency} - {med.duration}
                                </div>
                                {med.notes && <div className="text-xs text-muted-foreground">{med.notes}</div>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium mb-2">Follow-up:</h4>
                        <div className="text-sm space-y-1">
                          <p><strong>Timeframe:</strong> {treatmentPlan.followUp.timeframe}</p>
                          <p><strong>Tests:</strong> {treatmentPlan.followUp.tests.join(', ')}</p>
                          <p><strong>Specialist:</strong> {treatmentPlan.followUp.specialist.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Document Analysis Tab */}
          <TabsContent value="documents">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Document Type</Label>
                    <Select value={documentData.type} onValueChange={(value: any) => setDocumentData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lab_report">Lab Report</SelectItem>
                        <SelectItem value="prescription">Prescription</SelectItem>
                        <SelectItem value="medical_record">Medical Record</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documentText">Document Text</Label>
                    <Textarea
                      id="documentText"
                      placeholder="Paste the document text here..."
                      value={documentData.text}
                      onChange={(e) => setDocumentData(prev => ({ ...prev, text: e.target.value }))}
                      rows={10}
                    />
                  </div>

                  <Button 
                    onClick={handleAnalyzeDocument} 
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Analyze Document
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!documentAnalysis ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Upload a document to see analysis results</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Summary:</h4>
                        <p className="text-sm">{documentAnalysis.summary}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Key Findings:</h4>
                        <ul className="space-y-1">
                          {documentAnalysis.keyFindings.map((finding: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Recommendations:</h4>
                        <ul className="space-y-1">
                          {documentAnalysis.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-medium">Follow-up Needed:</span>
                        <Badge variant={documentAnalysis.followUpNeeded ? "destructive" : "outline"}>
                          {documentAnalysis.followUpNeeded ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Health Recommendations Tab */}
          <TabsContent value="recommendations">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Health Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="healthAge">Age *</Label>
                      <Input
                        id="healthAge"
                        type="number"
                        placeholder="Enter age"
                        value={healthProfile.age}
                        onChange={(e) => setHealthProfile(prev => ({ ...prev, age: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="healthGender">Gender *</Label>
                      <Select value={healthProfile.gender} onValueChange={(value) => setHealthProfile(prev => ({ ...prev, gender: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="healthMedicalHistory">Medical History</Label>
                    <Textarea
                      id="healthMedicalHistory"
                      placeholder="Enter medical history (comma-separated)"
                      value={healthProfile.medicalHistory}
                      onChange={(e) => setHealthProfile(prev => ({ ...prev, medicalHistory: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentHealthStatus">Current Health Status</Label>
                    <Textarea
                      id="currentHealthStatus"
                      placeholder="Describe current health status"
                      value={healthProfile.currentHealthStatus}
                      onChange={(e) => setHealthProfile(prev => ({ ...prev, currentHealthStatus: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lifestyle">Lifestyle Factors</Label>
                    <Textarea
                      id="lifestyle"
                      placeholder="Enter lifestyle factors (exercise, diet, habits, etc.)"
                      value={healthProfile.lifestyle}
                      onChange={(e) => setHealthProfile(prev => ({ ...prev, lifestyle: e.target.value }))}
                    />
                  </div>

                  <Button 
                    onClick={handleGenerateHealthRecommendations} 
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        Generate Health Recommendations
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Health Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!healthRecommendations ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Heart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Fill in health profile to get personalized recommendations</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">General Recommendations:</h4>
                        <ul className="space-y-1">
                          {healthRecommendations.generalRecommendations.map((rec: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Lifestyle Changes:</h4>
                        <ul className="space-y-1">
                          {healthRecommendations.lifestyleChanges.map((change: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Activity className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Preventive Measures:</h4>
                        <ul className="space-y-1">
                          {healthRecommendations.preventiveMeasures.map((measure: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Stethoscope className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>{measure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Warning Signs to Watch:</h4>
                        <ul className="space-y-1">
                          {healthRecommendations.warningSigns.map((sign: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span>{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Information Section */}
        <Card className="mt-8 shadow-card">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">About AI Medical Analysis</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Gemini AI Integration</h4>
                <p>Powered by Google's advanced Gemini AI for sophisticated medical reasoning and analysis.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Comprehensive Analysis</h4>
                <p>Generate medical insights, treatment plans, document analysis, and health recommendations.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Personalized Care</h4>
                <p>AI-powered recommendations tailored to individual patient profiles and medical history.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Medical Disclaimer</h4>
                <p>All AI-generated content is for informational purposes only. Always consult healthcare professionals.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MedicalInsights;
