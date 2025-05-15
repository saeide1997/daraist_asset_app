import connectToDatabase from '../../lib/mongoose';
import DailyAsset from '../../models/dailyAsset';
import LinearRegression from 'ml-regression-simple-linear';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  const { user_id, date } = req.body;
  if (!user_id || !date) return res.status(400).json({ error: 'user_id and date are required' });

  await connectToDatabase();

  try {
    const data = await DailyAsset.find({ user_id }).sort({ date: 1 });

    if (data.length < 2) return res.status(400).json({ error: 'Not enough data to predict' });

    const X = data.map(item => new Date(item.date).getTime());
    const y = data.map(item => item.totalValue);

    const regression = new LinearRegression(X, y);

    const inputDate = new Date(date).getTime();
    const prediction = regression.predict(inputDate);

    res.status(200).json({ prediction: Math.round(prediction) });
  } catch (err) {
    console.error('خطا در پیش‌بینی:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
