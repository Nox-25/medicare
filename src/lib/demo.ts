// Demo script to showcase the disease prediction functionality
import { predictDisease, formatSymptomName } from './diseasePrediction';

export const runDiseasePredictionDemo = async () => {
  console.log('🏥 Disease Prediction Demo');
  console.log('========================\n');

  // Demo case 1: Common cold symptoms
  console.log('Case 1: Common Cold Symptoms');
  console.log('Symptoms: runny_nose, congestion, throat_irritation');
  const coldSymptoms = ['runny_nose', 'congestion', 'throat_irritation'];
  const coldPredictions = await predictDisease(coldSymptoms);
  
  coldPredictions.forEach((prediction, index) => {
    console.log(`${index + 1}. ${prediction.algorithm}: ${prediction.disease} (${Math.round(prediction.confidence * 100)}% confidence)`);
  });
  console.log('');

  // Demo case 2: Diabetes symptoms
  console.log('Case 2: Diabetes Symptoms');
  console.log('Symptoms: excessive_hunger, increased_appetite, polyuria, blurred_and_distorted_vision');
  const diabetesSymptoms = ['excessive_hunger', 'increased_appetite', 'polyuria', 'blurred_and_distorted_vision'];
  const diabetesPredictions = await predictDisease(diabetesSymptoms);
  
  diabetesPredictions.forEach((prediction, index) => {
    console.log(`${index + 1}. ${prediction.algorithm}: ${prediction.disease} (${Math.round(prediction.confidence * 100)}% confidence)`);
  });
  console.log('');

  // Demo case 3: Heart attack symptoms
  console.log('Case 3: Heart Attack Symptoms');
  console.log('Symptoms: chest_pain, fast_heart_rate, palpitations, weakness_in_limbs');
  const heartSymptoms = ['chest_pain', 'fast_heart_rate', 'palpitations', 'weakness_in_limbs'];
  const heartPredictions = await predictDisease(heartSymptoms);
  
  heartPredictions.forEach((prediction, index) => {
    console.log(`${index + 1}. ${prediction.algorithm}: ${prediction.disease} (${Math.round(prediction.confidence * 100)}% confidence)`);
  });
  console.log('');

  console.log('✅ Demo completed successfully!');
  console.log('📝 Note: This is a simulation based on medical knowledge patterns.');
  console.log('⚠️  Always consult healthcare professionals for medical decisions.');
};

// Uncomment the line below to run the demo
// runDiseasePredictionDemo();


