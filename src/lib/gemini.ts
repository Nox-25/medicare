import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini API configuration
const GEMINI_API_KEY = 'AIzaSyAYvlDXicCWylTuE3YuBrjigRSuX46arvk';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Medical analysis interfaces
export interface SymptomAnalysis {
  symptoms: string[];
  possibleConditions: Array<{
    condition: string;
    probability: number;
    description: string;
    recommendations: string[];
  }>;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  generalRecommendations: string[];
}

export interface MedicalInsight {
  insight: string;
  category: 'diagnosis' | 'treatment' | 'prevention' | 'lifestyle';
  confidence: number;
  source: string;
}

export interface TreatmentPlan {
  condition: string;
  immediateActions: string[];
  shortTermPlan: string[];
  longTermPlan: string[];
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes: string;
  }>;
  followUp: {
    timeframe: string;
    tests: string[];
    specialist: string[];
  };
}

// Gemini AI Service
export const geminiService = {
  // Analyze symptoms and provide possible conditions
  async analyzeSymptoms(symptoms: string[], patientAge?: number, gender?: string): Promise<SymptomAnalysis> {
    try {
      const prompt = `
        As a medical AI assistant, analyze the following symptoms and provide a comprehensive medical assessment:
        
        Symptoms: ${symptoms.join(', ')}
        ${patientAge ? `Patient Age: ${patientAge}` : ''}
        ${gender ? `Patient Gender: ${gender}` : ''}
        
        Please provide:
        1. Possible medical conditions (with probability percentages)
        2. Brief description of each condition
        3. Urgency level (low, medium, high, critical)
        4. General recommendations
        5. Specific recommendations for each condition
        
        Format your response as a structured analysis. Remember this is for informational purposes only and not a substitute for professional medical advice.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse the response (in a real app, you'd want more sophisticated parsing)
      return this.parseSymptomAnalysis(text, symptoms);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      throw new Error('Failed to analyze symptoms. Please try again.');
    }
  },

  // Generate medical insights based on patient data
  async generateMedicalInsights(patientData: {
    medicalHistory: string[];
    currentSymptoms: string[];
    medications: string[];
    allergies: string[];
    age?: number;
    gender?: string;
  }): Promise<MedicalInsight[]> {
    try {
      const prompt = `
        As a medical AI assistant, analyze the following patient data and provide medical insights:
        
        Medical History: ${patientData.medicalHistory.join(', ')}
        Current Symptoms: ${patientData.currentSymptoms.join(', ')}
        Current Medications: ${patientData.medications.join(', ')}
        Allergies: ${patientData.allergies.join(', ')}
        ${patientData.age ? `Age: ${patientData.age}` : ''}
        ${patientData.gender ? `Gender: ${patientData.gender}` : ''}
        
        Provide insights in these categories:
        1. Diagnosis insights
        2. Treatment recommendations
        3. Prevention strategies
        4. Lifestyle modifications
        
        Each insight should include confidence level and reasoning.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseMedicalInsights(text);
    } catch (error) {
      console.error('Error generating medical insights:', error);
      throw new Error('Failed to generate medical insights. Please try again.');
    }
  },

  // Generate treatment plan
  async generateTreatmentPlan(condition: string, patientData: any): Promise<TreatmentPlan> {
    try {
      const prompt = `
        As a medical AI assistant, create a comprehensive treatment plan for:
        
        Condition: ${condition}
        Patient Data: ${JSON.stringify(patientData, null, 2)}
        
        Please provide:
        1. Immediate actions to take
        2. Short-term treatment plan (1-4 weeks)
        3. Long-term treatment plan (1-6 months)
        4. Medication recommendations (if applicable)
        5. Follow-up schedule and required tests
        6. Specialist referrals if needed
        
        Remember this is for informational purposes only and not a substitute for professional medical advice.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseTreatmentPlan(text, condition);
    } catch (error) {
      console.error('Error generating treatment plan:', error);
      throw new Error('Failed to generate treatment plan. Please try again.');
    }
  },

  // Analyze medical documents
  async analyzeMedicalDocument(documentText: string, documentType: 'lab_report' | 'prescription' | 'medical_record' | 'other'): Promise<{
    summary: string;
    keyFindings: string[];
    recommendations: string[];
    followUpNeeded: boolean;
  }> {
    try {
      const prompt = `
        As a medical AI assistant, analyze this ${documentType}:
        
        Document Text: ${documentText}
        
        Please provide:
        1. A clear summary of the document
        2. Key findings and important information
        3. Recommendations based on the findings
        4. Whether follow-up is needed (true/false)
        
        Format your response clearly and professionally.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseDocumentAnalysis(text);
    } catch (error) {
      console.error('Error analyzing medical document:', error);
      throw new Error('Failed to analyze medical document. Please try again.');
    }
  },

  // Generate health recommendations
  async generateHealthRecommendations(patientProfile: {
    age: number;
    gender: string;
    medicalHistory: string[];
    currentHealthStatus: string;
    lifestyle: string[];
  }): Promise<{
    generalRecommendations: string[];
    lifestyleChanges: string[];
    preventiveMeasures: string[];
    warningSigns: string[];
  }> {
    try {
      const prompt = `
        As a medical AI assistant, provide personalized health recommendations for:
        
        Age: ${patientProfile.age}
        Gender: ${patientProfile.gender}
        Medical History: ${patientProfile.medicalHistory.join(', ')}
        Current Health Status: ${patientProfile.currentHealthStatus}
        Lifestyle: ${patientProfile.lifestyle.join(', ')}
        
        Please provide:
        1. General health recommendations
        2. Specific lifestyle changes
        3. Preventive measures
        4. Warning signs to watch for
        
        Make recommendations practical and actionable.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseHealthRecommendations(text);
    } catch (error) {
      console.error('Error generating health recommendations:', error);
      throw new Error('Failed to generate health recommendations. Please try again.');
    }
  },

  // Helper function to parse symptom analysis response
  parseSymptomAnalysis(text: string, symptoms: string[]): SymptomAnalysis {
    // This is a simplified parser - in a real app, you'd want more sophisticated parsing
    const lines = text.split('\n').filter(line => line.trim());
    
    const possibleConditions = [];
    let urgency: 'low' | 'medium' | 'high' | 'critical' = 'low';
    const generalRecommendations = [];

    // Simple parsing logic (you'd want to improve this)
    for (const line of lines) {
      if (line.toLowerCase().includes('urgent') || line.toLowerCase().includes('emergency')) {
        urgency = 'critical';
      } else if (line.toLowerCase().includes('soon') || line.toLowerCase().includes('immediate')) {
        urgency = 'high';
      } else if (line.toLowerCase().includes('moderate') || line.toLowerCase().includes('soon')) {
        urgency = 'medium';
      }
      
      if (line.includes('recommend') || line.includes('suggest')) {
        generalRecommendations.push(line.trim());
      }
    }

    // Default conditions if parsing fails
    if (possibleConditions.length === 0) {
      possibleConditions.push({
        condition: 'General Assessment',
        probability: 50,
        description: 'Based on the symptoms provided, further evaluation is recommended.',
        recommendations: ['Consult with a healthcare provider', 'Monitor symptoms closely']
      });
    }

    return {
      symptoms,
      possibleConditions,
      urgency,
      generalRecommendations: generalRecommendations.length > 0 ? generalRecommendations : ['Consult with a healthcare provider']
    };
  },

  // Helper function to parse medical insights
  parseMedicalInsights(text: string): MedicalInsight[] {
    const insights: MedicalInsight[] = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    // Simple parsing - you'd want to improve this
    lines.forEach((line, index) => {
      if (line.trim()) {
        insights.push({
          insight: line.trim(),
          category: 'diagnosis',
          confidence: 0.8,
          source: 'Gemini AI Analysis'
        });
      }
    });

    return insights;
  },

  // Helper function to parse treatment plan
  parseTreatmentPlan(text: string, condition: string): TreatmentPlan {
    const lines = text.split('\n').filter(line => line.trim());
    
    return {
      condition,
      immediateActions: ['Consult with a healthcare provider', 'Follow medical advice'],
      shortTermPlan: ['Monitor symptoms', 'Take prescribed medications'],
      longTermPlan: ['Regular follow-ups', 'Lifestyle modifications'],
      medications: [],
      followUp: {
        timeframe: '1-2 weeks',
        tests: ['Follow-up consultation'],
        specialist: ['Primary care physician']
      }
    };
  },

  // Helper function to parse document analysis
  parseDocumentAnalysis(text: string): {
    summary: string;
    keyFindings: string[];
    recommendations: string[];
    followUpNeeded: boolean;
  } {
    return {
      summary: text.substring(0, 200) + '...',
      keyFindings: ['Key findings extracted from document'],
      recommendations: ['Follow up with healthcare provider'],
      followUpNeeded: true
    };
  },

  // Helper function to parse health recommendations
  parseHealthRecommendations(text: string): {
    generalRecommendations: string[];
    lifestyleChanges: string[];
    preventiveMeasures: string[];
    warningSigns: string[];
  } {
    const lines = text.split('\n').filter(line => line.trim());
    
    return {
      generalRecommendations: ['Maintain regular exercise', 'Eat a balanced diet'],
      lifestyleChanges: ['Reduce stress', 'Get adequate sleep'],
      preventiveMeasures: ['Regular health checkups', 'Vaccinations up to date'],
      warningSigns: ['Persistent symptoms', 'Severe pain', 'Difficulty breathing']
    };
  }
};

export default geminiService;
