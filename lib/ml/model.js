// /lib/ml/model.js
import * as tf from '@tensorflow/tfjs';

// تابع آموزش مدل
export async function trainModel(data) {
  // داده‌ها را به فرمت مناسب تبدیل می‌کنیم
  const xs = tf.tensor2d(data.map(d => [new Date(d.date).getTime()]));
  const ys = tf.tensor2d(data.map(d => [parseInt(d.totalValue)]));

  // ساخت مدل
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  // کامپایل کردن مدل
  model.compile({
    optimizer: tf.train.sgd(0.001),
    loss: 'meanSquaredError',
  });

  // آموزش مدل
  await model.fit(xs, ys, {
    epochs: 300,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
      }
    }
  });

  // ذخیره مدل در localStorage
  await model.save('localstorage://price-predict-model');
}

// تابع پیش‌بینی
export async function runPrediction() {
  const model = await tf.loadLayersModel('localstorage://price-predict-model');
  const targetDate = new Date("2025-06-01").getTime();
  
  // پیش‌بینی
  const prediction = model.predict(tf.tensor2d([[targetDate]]));
  
  // تبدیل پیش‌بینی به مقدار عددی
  const predictedValue = prediction.dataSync()[0];
  return predictedValue;
}
