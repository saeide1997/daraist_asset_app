import { MongoClient } from 'mongodb';
import connectToDatabase from '../../lib/mongoose';
import Asset from '../../models/Asset';
import DailyTotal from '../../models/dailyAsset';
import fetch from 'node-fetch'; // چون فانکشنه باید بیاری
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from '../../models/User';

const SECRET = process.env.JWT_SECRET;

export default async function handler(event, context) {
  console.log('⏰ Running scheduled saveTotalAsset');

  await connectToDatabase();

  try {
    // اگر نیاز به اطلاعات کاربر داری باید لیست کاربران رو دستی بگیری یا ثابت بزاری
    // چون دیگه req و کوکی نداری!

    // مثلا فرض کن یوزر ادمین رو مستقیم بیاری
    const adminUser = await User.findOne({ username: "admin" });

    if (!adminUser) {
      console.log("❌ Admin user not found.");
      return { statusCode: 404, body: "Admin user not found" };
    }

    const assets = await Asset.find({ user_id: adminUser._id });

    const priceRes = await fetch("https://brsapi.ir/Api/Market/Gold_Currency.php?key=FreeFbhZCp8ZBfgb15fgCPCW3sAW7Xbb");
    const priceData = await priceRes.json();

    let totalValue = 0;
    assets.forEach((item) => {
      const price = priceData.gold.find((p) => p.symbol === item.assetType);
      if (!price) return;
      totalValue += item.assetAmount * price.price;
    });

    const today = new Date().toISOString().split('T')[0];

    const newDailyTotal = new DailyTotal({
      user_id: adminUser._id,
      date: today,
      totalValue,
      createdAt: new Date(),
    });

    await newDailyTotal.save();

    console.log("✅ Total value saved for", today);

    return { statusCode: 200, body: "Success" };
  } catch (error) {
    console.error("❌ Error in cron job:", error);
    return { statusCode: 500, body: JSON.stringify({ message: "Error", error: error.message }) };
  }
}
