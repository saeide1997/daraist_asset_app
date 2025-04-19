import cron from 'node-cron';
import { MongoClient } from 'mongodb';
import connectToDatabase from '../../lib/mongoose';
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../../models/User";
import Asset from "../../models/Asset";
import DailyTotal from '../../models/dailyAsset';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const SECRET = process.env.JWT_SECRET;

let isCronStarted = false;

export default async function handler(req, res) {
  
  if (!isCronStarted) {
    isCronStarted = true;
    
    cron.schedule('30 14 * * *', async () => {
      console.log('⏰ Running total value saver at 00:00');
      console.log(isCronStarted);
      await connectToDatabase();
      try {
        const rawCookies = req.headers?.cookie || "";
        if (!rawCookies) {
          return res.status(401).json({ success: false, error: "کوکی یافت نشد" });
        }

        const cookies = cookie.parse(rawCookies);
        const token = cookies.token;

        if (!token) {
          return res.status(401).json({ success: false, error: "توکن موجود نیست" });
        }

        const decoded = jwt.verify(token, SECRET);
        if (!decoded) {
          return res.status(401).json({ success: false, error: "توکن معتبر نیست" });
        }

        const user = await User.findOne({ username: decoded.username });

        if (!user) return res.status(401).json({ success: false, error: "کاربر یافت نشد" });

        const assets = await Asset.find({ user_id: user._id });

        
        // گرفتن قیمت‌ها از API بیرونی
        const priceRes = await fetch("https://brsapi.ir/Api/Market/Gold_Currency.php?key=FreeFbhZCp8ZBfgb15fgCPCW3sAW7Xbb");
        const priceData = await priceRes.json();
        res.status(200).json({ message: priceData });


        // محاسبه totalValue
        let totalValue = 0;
        assets.forEach((item) => {
          const price = priceData.gold.find((p) => p.symbol === item.assetType);
          if (!price) return;
          totalValue += item.assetAmount * price.price;
        });

        const today = new Date().toISOString().split('T')[0];

        // ذخیره در دیتابیس
        const newDailyTotal = new DailyTotal({
          user_id: user._id,
          date: today,
          totalValue,
          createdAt: new Date(),
        });
console.log('newDailyTotal', user._id);

        await newDailyTotal.save()

        console.log("✅ Total value saved for", today);
      } catch (error) {
        console.error("❌ Error in cron job:", error);
      }
    });
  }

  res.status(200).json({ message: "Cron job scheduled." });
}
