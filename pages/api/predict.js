// pages/api/predict.js

import * as tf from '@tensorflow/tfjs';

let model;

// بارگذاری مدل (اگر مدل قبلاً بارگذاری نشده باشه)
async function loadModel() {
  if (!model) {
    model = await tf.loadLayersModel('http://localhost:5000/model.json');  // فرض بر این است که مدل ذخیره شده است
  }
  return model;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const date = parseInt(req.query.date);  // دریافت تاریخ از URL

    try {
      const model = await loadModel();
      const prediction = model.predict(tf.tensor2d([date], [1, 1]));
      const predictedPrice = prediction.dataSync()[0];

      res.status(200).json({ predictedPrice });
    } catch (error) {
      res.status(500).json({ error: 'خطا در پیش‌بینی' });
    }
  } else {
    res.status(405).json({ error: 'روش درخواست غیرمجاز' });
  }
}
