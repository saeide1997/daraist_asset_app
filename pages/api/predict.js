// pages/api/predict.js
import User from '../../models/User';
import DailyAsset from '../../models/dailyAsset';
import { trainModel, predictValue } from '../../lib/ml/linearRegression';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import connectToDatabase from '../../lib/mongoose';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' })

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  await connectToDatabase();

  const rawCookies = req.headers?.cookie || '';
  const cookies = cookie.parse(rawCookies);
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, error: 'توکن وجود ندارد' });
  }

  const decoded = jwt.verify(token, SECRET);
  if (!decoded) {
    return res.status(401).json({ success: false, error: 'توکن معتبر نیست' });
  }

  const user = await User.findOne({ username: decoded.username });
  if (!user) {
    return res.status(401).json({ success: false, error: 'کاربر یافت نشد' });
  }

  const { date } = req.body;
  if (!user._id || !date) {
    return res.status(400).json({ error: 'user_id and date are required' });
  }

  try {
    // 👇 تبدیل تاریخ شمسی به میلادی
    const enNum = date.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    const formattedDate = enNum.replace(/-/g, '/');
    const miladiDate = moment(formattedDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');

    console.log('input:', date);
    console.log('formatted:', formattedDate);
    console.log('converted:', miladiDate);
    const data = await DailyAsset.find({ user_id: user._id }).sort({ date: 1 });

    if (data.length < 2) {
      return res.status(400).json({ error: 'داده کافی برای پیش‌بینی وجود ندارد' });
    }

    const model = trainModel(data);
    const prediction = predictValue(model, miladiDate);

    res.status(200).json({ prediction: Math.round(prediction) });
  } catch (err) {
    console.error('خطا در پیش‌بینی:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
