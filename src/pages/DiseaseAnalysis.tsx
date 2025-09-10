import Header from "@/components/layout/Header";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Activity, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SYMPTOMS, predictDisease, formatSymptomName, type PredictionResult } from "@/lib/diseasePrediction";
import { geminiService, type SymptomAnalysis, type MedicalInsight } from "@/lib/gemini";

const DiseaseAnalysis = () => {
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>(["", "", "", "", ""]);
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [geminiAnalysis, setGeminiAnalysis] = useState<SymptomAnalysis | null>(null);
  const [medicalInsights, setMedicalInsights] = useState<MedicalInsight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<'ml' | 'ai' | 'both'>('both');
  const { toast } = useToast();

  const handleSymptomChange = (index: number, value: string) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const handleAnalyze = async () => {
    if (!patientName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the patient's name.",
        variant: "destructive",
      });
      return;
    }

    const selectedSymptoms = symptoms.filter(s => s.trim() !== "");
    if (selectedSymptoms.length < 3) {
      toast({
        title: "Insufficient Symptoms",
        description: "Please select at least 3 symptoms for accurate analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const promises = [];

      // Machine Learning Analysis
      if (analysisMode === 'ml' || analysisMode === 'both') {
        promises.push(predictDisease(selectedSymptoms));
      }

      // Gemini AI Analysis
      if (analysisMode === 'ai' || analysisMode === 'both') {
        promises.push(
          geminiService.analyzeSymptoms(
            selectedSymptoms,
            patientAge ? parseInt(patientAge) : undefined,
            patientGender || undefined
          )
        );
      }

      const results = await Promise.all(promises);

      if (analysisMode === 'ml' || analysisMode === 'both') {
        setPredictions(results[0] as PredictionResult[]);
      }

      if (analysisMode === 'ai' || analysisMode === 'both') {
        const geminiResult = analysisMode === 'ai' ? results[0] : results[1];
        setGeminiAnalysis(geminiResult as SymptomAnalysis);
        
        // Generate additional medical insights
        try {
          const insights = await geminiService.generateMedicalInsights({
            medicalHistory: [],
            currentSymptoms: selectedSymptoms,
            medications: [],
            allergies: [],
            age: patientAge ? parseInt(patientAge) : undefined,
            gender: patientGender || undefined
          });
          setMedicalInsights(insights);
        } catch (insightError) {
          console.warn('Failed to generate medical insights:', insightError);
        }
      }

      setHasAnalyzed(true);
      
      toast({
        title: "Analysis Complete",
        description: "Disease analysis generated successfully using AI and ML models.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred during disease analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setSymptoms(["", "", "", "", ""]);
    setPredictions([]);
    setGeminiAnalysis(null);
    setMedicalInsights([]);
    setHasAnalyzed(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            Disease Analysis
          </h1>
          <p className="text-muted-foreground text-lg">
            Advanced machine learning-based disease prediction using multiple algorithms
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-card hover:shadow-medical transition-medical">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Symptom Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    placeholder="Enter patient's name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientAge">Age</Label>
                  <Input
                    id="patientAge"
                    type="number"
                    placeholder="Enter age"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientGender">Gender</Label>
                <Select value={patientGender} onValueChange={setPatientGender}>
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

              <div className="space-y-2">
                <Label>Analysis Mode</Label>
                <Select value={analysisMode} onValueChange={(value: 'ml' | 'ai' | 'both') => setAnalysisMode(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select analysis mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Both AI & ML Analysis</SelectItem>
                    <SelectItem value="ai">AI Analysis Only (Gemini)</SelectItem>
                    <SelectItem value="ml">ML Analysis Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Select Symptoms (Choose up to 5)</Label>
                {symptoms.map((symptom, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`symptom-${index}`}>Symptom {index + 1}</Label>
                    <Select value={symptom} onValueChange={(value) => handleSymptomChange(index, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={`Select symptom ${index + 1}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {SYMPTOMS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {formatSymptomName(s)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isLoading}
                  className="bg-gradient-primary flex-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Analyze Disease
                    </>
                  )}
                </Button>
                {hasAnalyzed && (
                  <Button variant="outline" onClick={resetAnalysis}>
                    Reset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-card hover:shadow-medical transition-medical">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!hasAnalyzed ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Enter symptoms and click "Analyze Disease" to get predictions</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical diagnosis.
                    </AlertDescription>
                  </Alert>


                  {/* Machine Learning Results */}
                  {(analysisMode === 'ml' || analysisMode === 'both') && predictions.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        ML Prediction Results
                      </h3>
                      {predictions.map((prediction, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{prediction.algorithm}</span>
                            <Badge variant="secondary">
                              {Math.round(prediction.confidence * 100)}% confidence
                            </Badge>
                          </div>
                          <div className="text-lg font-semibold text-primary">
                            {prediction.disease}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${prediction.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Gemini AI Results */}
                  {(analysisMode === 'ai' || analysisMode === 'both') && geminiAnalysis && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        AI Analysis Results
                      </h3>
                      
                      {/* Urgency Level */}
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Urgency Level:</span>
                        <Badge 
                          variant={geminiAnalysis.urgency === 'critical' ? 'destructive' : 
                                  geminiAnalysis.urgency === 'high' ? 'destructive' :
                                  geminiAnalysis.urgency === 'medium' ? 'secondary' : 'outline'}
                        >
                          {geminiAnalysis.urgency.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Possible Conditions */}
                      <div className="space-y-2">
                        <h4 className="font-medium">Possible Conditions:</h4>
                        {geminiAnalysis.possibleConditions.map((condition, index) => (
                          <div key={index} className="border rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{condition.condition}</span>
                              <Badge variant="outline">
                                {condition.probability}% probability
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{condition.description}</p>
                            <div className="space-y-1">
                              <span className="text-xs font-medium">Recommendations:</span>
                              <ul className="text-xs space-y-1">
                                {condition.recommendations.map((rec, recIndex) => (
                                  <li key={recIndex} className="flex items-start gap-1">
                                    <span className="text-primary">•</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* General Recommendations */}
                      <div className="space-y-2">
                        <h4 className="font-medium">General Recommendations:</h4>
                        <ul className="space-y-1">
                          {geminiAnalysis.generalRecommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Medical Insights */}
                  {medicalInsights.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Medical Insights</h3>
                      <div className="grid gap-3">
                        {medicalInsights.map((insight, index) => (
                          <div key={index} className="border rounded-lg p-3 space-y-2">
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
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Selected Symptoms:</h4>
                    <div className="flex flex-wrap gap-2">
                      {symptoms.filter(s => s.trim() !== "").map((symptom, index) => (
                        <Badge key={index} variant="outline">
                          {formatSymptomName(symptom)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Section */}
        <Card className="mt-8 shadow-card">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">About Disease Analysis</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Machine Learning Models</h4>
                <p>Our system uses three advanced algorithms: Decision Tree, Random Forest, and Naive Bayes for comprehensive analysis.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Gemini AI Analysis</h4>
                <p>Powered by Google's Gemini AI for advanced medical reasoning, symptom analysis, and personalized recommendations.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Symptom Database</h4>
                <p>Based on extensive medical data covering 132 symptoms and 41 different diseases for accurate predictions.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Medical Disclaimer</h4>
                <p>Results are for informational purposes only. Always consult with healthcare professionals for medical decisions.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DiseaseAnalysis;
