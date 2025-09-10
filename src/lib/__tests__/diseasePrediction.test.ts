import { predictDisease, formatSymptomName, SYMPTOMS, DISEASES } from '../diseasePrediction';

describe('Disease Prediction Service', () => {
  test('should format symptom names correctly', () => {
    expect(formatSymptomName('back_pain')).toBe('Back Pain');
    expect(formatSymptomName('yellowing_of_eyes')).toBe('Yellowing Of Eyes');
    expect(formatSymptomName('fast_heart_rate')).toBe('Fast Heart Rate');
  });

  test('should have correct number of symptoms and diseases', () => {
    expect(SYMPTOMS.length).toBe(132);
    expect(DISEASES.length).toBe(41);
  });

  test('should predict disease for valid symptoms', async () => {
    const symptoms = ['back_pain', 'neck_pain', 'stiff_neck'];
    const predictions = await predictDisease(symptoms);
    
    expect(predictions).toHaveLength(3);
    expect(predictions[0]).toHaveProperty('disease');
    expect(predictions[0]).toHaveProperty('confidence');
    expect(predictions[0]).toHaveProperty('algorithm');
    expect(predictions[0].confidence).toBeGreaterThan(0);
    expect(predictions[0].confidence).toBeLessThanOrEqual(1);
  });

  test('should handle empty symptoms array', async () => {
    const predictions = await predictDisease([]);
    
    expect(predictions).toHaveLength(3);
    // All algorithms should return "Not Found" for empty symptoms
    predictions.forEach(prediction => {
      expect(prediction.disease).toBe('Not Found');
      expect(prediction.confidence).toBe(0);
    });
  });

  test('should return predictions sorted by confidence', async () => {
    const symptoms = ['chest_pain', 'fast_heart_rate', 'palpitations'];
    const predictions = await predictDisease(symptoms);
    
    // Check that predictions are sorted by confidence (highest first)
    for (let i = 1; i < predictions.length; i++) {
      expect(predictions[i-1].confidence).toBeGreaterThanOrEqual(predictions[i].confidence);
    }
  });
});


