import { useState } from 'react';
import { runPrediction } from '../lib/ml/model.js';

export default function PredictButton() {
  const [predictedValue, setPredictedValue] = useState(null);

  const handlePredict = async () => {
    const prediction = await runPrediction();
    setPredictedValue(prediction);
  };

  return (
    <div>
      <button onClick={handlePredict}>
        پیش‌بینی قیمت
      </button>

      {predictedValue !== null && (
        <div>
          <h3>پیش‌بینی برای 2025-06-01:</h3>
          <p>{predictedValue.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
