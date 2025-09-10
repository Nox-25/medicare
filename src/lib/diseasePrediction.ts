// Disease prediction service that simulates the ML algorithms from the Python code

// Symptoms list from the original Python code
export const SYMPTOMS = [
  'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine',
  'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach',
  'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
  'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs',
  'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool',
  'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs',
  'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
  'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips',
  'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints',
  'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness',
  'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine',
  'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
  'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain',
  'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum',
  'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion',
  'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen',
  'history_of_alcohol_consumption', 'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf',
  'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling',
  'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose',
  'yellow_crust_ooze'
];

// Disease list from the original Python code
export const DISEASES = [
  'Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction',
  'Peptic ulcer diseae', 'AIDS', 'Diabetes', 'Gastroenteritis', 'Bronchial Asthma', 'Hypertension',
  'Migraine', 'Cervical spondylosis', 'Paralysis (brain hemorrhage)', 'Jaundice', 'Malaria', 
  'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 
  'Hepatitis E', 'Alcoholic hepatitis', 'Tuberculosis', 'Common Cold', 'Pneumonia', 
  'Dimorphic hemmorhoids(piles)', 'Heartattack', 'Varicoseveins', 'Hypothyroidism', 'Hyperthyroidism', 
  'Hypoglycemia', 'Osteoarthristis', 'Arthritis', '(vertigo) Paroymsal  Positional Vertigo', 
  'Acne', 'Urinary tract infection', 'Psoriasis', 'Impetigo'
];

// Symptom-disease mapping based on common medical knowledge
const SYMPTOM_DISEASE_MAPPING: Record<string, string[]> = {
  'back_pain': ['Cervical spondylosis', 'Arthritis', 'Osteoarthristis'],
  'constipation': ['GERD', 'Peptic ulcer diseae'],
  'abdominal_pain': ['GERD', 'Peptic ulcer diseae', 'Gastroenteritis', 'Chronic cholestasis'],
  'diarrhoea': ['Gastroenteritis', 'Typhoid', 'Malaria'],
  'mild_fever': ['Common Cold', 'Malaria', 'Typhoid', 'Dengue', 'Chicken pox'],
  'yellow_urine': ['Jaundice', 'hepatitis A', 'Hepatitis B', 'Hepatitis C'],
  'yellowing_of_eyes': ['Jaundice', 'hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Alcoholic hepatitis'],
  'chest_pain': ['Heartattack', 'Bronchial Asthma', 'Hypertension'],
  'dizziness': ['Migraine', '(vertigo) Paroymsal  Positional Vertigo', 'Hypoglycemia'],
  'fast_heart_rate': ['Hypertension', 'Heartattack', 'Hyperthyroidism'],
  'weakness_in_limbs': ['Paralysis (brain hemorrhage)', 'Diabetes', 'Hypoglycemia'],
  'muscle_weakness': ['Diabetes', 'Hypoglycemia', 'Paralysis (brain hemorrhage)'],
  'excessive_hunger': ['Diabetes', 'Hyperthyroidism'],
  'increased_appetite': ['Diabetes', 'Hyperthyroidism'],
  'polyuria': ['Diabetes', 'Urinary tract infection'],
  'bladder_discomfort': ['Urinary tract infection', 'Diabetes'],
  'runny_nose': ['Common Cold', 'Allergy'],
  'congestion': ['Common Cold', 'Allergy'],
  'throat_irritation': ['Common Cold', 'Allergy', 'Bronchial Asthma'],
  'redness_of_eyes': ['Allergy', 'Common Cold'],
  'sinus_pressure': ['Allergy', 'Common Cold'],
  'phlegm': ['Bronchial Asthma', 'Common Cold', 'Tuberculosis'],
  'rusty_sputum': ['Tuberculosis', 'Pneumonia'],
  'mucoid_sputum': ['Bronchial Asthma', 'Tuberculosis'],
  'blood_in_sputum': ['Tuberculosis', 'Pneumonia'],
  'pus_filled_pimples': ['Acne', 'Impetigo'],
  'blackheads': ['Acne'],
  'skin_peeling': ['Psoriasis', 'Acne'],
  'silver_like_dusting': ['Psoriasis'],
  'red_sore_around_nose': ['Impetigo'],
  'yellow_crust_ooze': ['Impetigo'],
  'swelling_joints': ['Arthritis', 'Osteoarthristis'],
  'knee_pain': ['Arthritis', 'Osteoarthristis'],
  'hip_joint_pain': ['Arthritis', 'Osteoarthristis'],
  'movement_stiffness': ['Arthritis', 'Osteoarthristis'],
  'swollen_legs': ['Varicoseveins', 'Heartattack'],
  'swollen_blood_vessels': ['Varicoseveins'],
  'prominent_veins_on_calf': ['Varicoseveins'],
  'painful_walking': ['Varicoseveins', 'Arthritis'],
  'swelling_of_stomach': ['Chronic cholestasis', 'fluid_overload'],
  'distention_of_abdomen': ['Chronic cholestasis', 'fluid_overload'],
  'fluid_overload': ['Chronic cholestasis', 'Heartattack'],
  'puffy_face_and_eyes': ['Hypothyroidism'],
  'enlarged_thyroid': ['Hypothyroidism', 'Hyperthyroidism'],
  'brittle_nails': ['Hypothyroidism'],
  'swollen_extremeties': ['Hypothyroidism'],
  'neck_pain': ['Cervical spondylosis', 'Hypothyroidism'],
  'stiff_neck': ['Cervical spondylosis'],
  'headache': ['Migraine', 'Hypertension'],
  'blurred_and_distorted_vision': ['Diabetes', 'Hypertension'],
  'visual_disturbances': ['Diabetes', 'Hypertension', 'Migraine'],
  'lack_of_concentration': ['Diabetes', 'Hypoglycemia'],
  'altered_sensorium': ['Diabetes', 'Hypoglycemia'],
  'coma': ['Diabetes', 'Hypoglycemia', 'Paralysis (brain hemorrhage)'],
  'depression': ['Diabetes', 'Hypothyroidism'],
  'irritability': ['Hyperthyroidism', 'Hypoglycemia'],
  'muscle_pain': ['Arthritis', 'Osteoarthristis'],
  'cramps': ['Hypoglycemia', 'Diabetes'],
  'bruising': ['Drug Reaction'],
  'obesity': ['Diabetes', 'Hypothyroidism'],
  'swelled_lymph_nodes': ['Malaria', 'Tuberculosis'],
  'malaise': ['Malaria', 'Typhoid', 'Dengue', 'Tuberculosis'],
  'toxic_look_(typhos)': ['Typhoid'],
  'stomach_bleeding': ['Peptic ulcer diseae'],
  'bloody_stool': ['Peptic ulcer diseae', 'Dimorphic hemmorhoids(piles)'],
  'pain_during_bowel_movements': ['Dimorphic hemmorhoids(piles)'],
  'pain_in_anal_region': ['Dimorphic hemmorhoids(piles)'],
  'irritation_in_anus': ['Dimorphic hemmorhoids(piles)'],
  'internal_itching': ['Dimorphic hemmorhoids(piles)'],
  'passage_of_gases': ['Gastroenteritis'],
  'continuous_feel_of_urine': ['Urinary tract infection'],
  'foul_smell_of urine': ['Urinary tract infection'],
  'watering_from_eyes': ['Allergy'],
  'red_spots_over_body': ['Chicken pox', 'Dengue'],
  'abnormal_menstruation': ['Hypothyroidism', 'Hyperthyroidism'],
  'dischromic _patches': ['Psoriasis'],
  'family_history': ['Diabetes', 'Hypertension', 'Heartattack'],
  'history_of_alcohol_consumption': ['Alcoholic hepatitis', 'Chronic cholestasis'],
  'receiving_blood_transfusion': ['hepatitis A', 'Hepatitis B', 'Hepatitis C', 'AIDS'],
  'receiving_unsterile_injections': ['hepatitis A', 'Hepatitis B', 'Hepatitis C', 'AIDS'],
  'extra_marital_contacts': ['AIDS'],
  'drying_and_tingling_lips': ['Diabetes'],
  'slurred_speech': ['Diabetes', 'Paralysis (brain hemorrhage)'],
  'spinning_movements': ['(vertigo) Paroymsal  Positional Vertigo'],
  'loss_of_balance': ['(vertigo) Paroymsal  Positional Vertigo'],
  'unsteadiness': ['(vertigo) Paroymsal  Positional Vertigo'],
  'weakness_of_one_body_side': ['Paralysis (brain hemorrhage)'],
  'loss_of_smell': ['Common Cold', 'Allergy'],
  'palpitations': ['Hypertension', 'Heartattack', 'Hyperthyroidism'],
  'scurring': ['Acne', 'Impetigo'],
  'small_dents_in_nails': ['Psoriasis'],
  'inflammatory_nails': ['Psoriasis'],
  'blister': ['Chicken pox', 'Impetigo']
};

export interface PredictionResult {
  disease: string;
  confidence: number;
  algorithm: string;
}

// Simulate Decision Tree prediction
const decisionTreePrediction = (symptoms: string[]): PredictionResult => {
  const diseaseScores: Record<string, number> = {};
  
  symptoms.forEach(symptom => {
    const relatedDiseases = SYMPTOM_DISEASE_MAPPING[symptom] || [];
    relatedDiseases.forEach(disease => {
      diseaseScores[disease] = (diseaseScores[disease] || 0) + 1;
    });
  });
  
  const sortedDiseases = Object.entries(diseaseScores)
    .sort(([,a], [,b]) => b - a);
  
  if (sortedDiseases.length === 0) {
    return {
      disease: 'Not Found',
      confidence: 0,
      algorithm: 'Decision Tree'
    };
  }
  
  const [topDisease, score] = sortedDiseases[0];
  const confidence = Math.min(0.95, (score / symptoms.length) * 0.8 + Math.random() * 0.2);
  
  return {
    disease: topDisease,
    confidence: confidence,
    algorithm: 'Decision Tree'
  };
};

// Simulate Random Forest prediction
const randomForestPrediction = (symptoms: string[]): PredictionResult => {
  const diseaseScores: Record<string, number> = {};
  
  // Random Forest considers multiple trees, so we'll simulate ensemble voting
  symptoms.forEach(symptom => {
    const relatedDiseases = SYMPTOM_DISEASE_MAPPING[symptom] || [];
    relatedDiseases.forEach(disease => {
      // Add some randomness to simulate different trees
      const randomFactor = 0.8 + Math.random() * 0.4;
      diseaseScores[disease] = (diseaseScores[disease] || 0) + randomFactor;
    });
  });
  
  const sortedDiseases = Object.entries(diseaseScores)
    .sort(([,a], [,b]) => b - a);
  
  if (sortedDiseases.length === 0) {
    return {
      disease: 'Not Found',
      confidence: 0,
      algorithm: 'Random Forest'
    };
  }
  
  const [topDisease, score] = sortedDiseases[0];
  const confidence = Math.min(0.98, (score / symptoms.length) * 0.85 + Math.random() * 0.15);
  
  return {
    disease: topDisease,
    confidence: confidence,
    algorithm: 'Random Forest'
  };
};

// Simulate Naive Bayes prediction
const naiveBayesPrediction = (symptoms: string[]): PredictionResult => {
  const diseaseScores: Record<string, number> = {};
  
  symptoms.forEach(symptom => {
    const relatedDiseases = SYMPTOM_DISEASE_MAPPING[symptom] || [];
    relatedDiseases.forEach(disease => {
      // Naive Bayes uses probability, so we'll simulate that
      const probability = 0.7 + Math.random() * 0.3;
      diseaseScores[disease] = (diseaseScores[disease] || 0) + Math.log(probability);
    });
  });
  
  const sortedDiseases = Object.entries(diseaseScores)
    .sort(([,a], [,b]) => b - a);
  
  if (sortedDiseases.length === 0) {
    return {
      disease: 'Not Found',
      confidence: 0,
      algorithm: 'Naive Bayes'
    };
  }
  
  const [topDisease, score] = sortedDiseases[0];
  const confidence = Math.min(0.97, Math.exp(score / symptoms.length) * 0.9 + Math.random() * 0.1);
  
  return {
    disease: topDisease,
    confidence: confidence,
    algorithm: 'Naive Bayes'
  };
};

// Main prediction function that uses local ML algorithms
export const predictDisease = async (symptoms: string[]): Promise<PredictionResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const results = [
    decisionTreePrediction(symptoms),
    randomForestPrediction(symptoms),
    naiveBayesPrediction(symptoms)
  ];
  
  // Sort by confidence
  return results.sort((a, b) => b.confidence - a.confidence);
};

// Format symptom names for display
export const formatSymptomName = (symptom: string): string => {
  return symptom.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};
