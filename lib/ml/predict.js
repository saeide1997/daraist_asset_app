// lib/ml/predict.js

import * as tf from '@tensorflow/tfjs-node';

export async function runPrediction(predictDate) {
  const model = await tf.loadLayersModel('file://model/model.json');
  const timestamp = new Date(predictDate).getTime();
  const input = tf.tensor2d([[timestamp]]);
  const prediction = model.predict(input);
  const value = await prediction.data();
  return value[0];
}
