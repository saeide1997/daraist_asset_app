import cron from 'node-cron';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let isCronStarted = false;

export default async function handler(req, res) {
  if (!isCronStarted) {
    isCronStarted = true;

    cron.schedule('46 16 * * *', async () => {
      console.log('⏰ Running total value saver at 00:00');

      try {
        await client.connect();
        const db = client.db("dailyTotals");

        // گرفتن دارایی‌ها از مجموعه
        const assets = await db.collection("assets").find({}).toArray();

        // گرفتن قیمت‌ها از API بیرونی
        const priceRes = await fetch("https://brsapi.ir/Api/Market/Gold_Currency.php?key=FreeFbhZCp8ZBfgb15fgCPCW3sAW7Xbb");
        const priceData = await priceRes.json();
        res.status(200).json({ message: priceData });
        

        const prices = [
          { symbol: "IR_GOLD_18K", price: priceData?.gold.symbol.price },
          { symbol: "IR_COIN_EMAMI", price: priceData?.gold.symbol.price },
          // هر چی خواستی اضافه کن...
        ];

        // محاسبه totalValue
        let totalValue = 0;
        assets.forEach((item) => {
          const price = priceData.gold.find((p) => p.symbol === item.assetType);
          if (!price) return;
          totalValue += item.assetAmount * price.price;
        });

        const today = new Date().toISOString().split('T')[0];

        // ذخیره در دیتابیس
        await db.collection("dailyTotals").insertOne({
          date: today,
          totalValue,
          createdAt: new Date(),
        });

        console.log("✅ Total value saved for", today);
      } catch (error) {
        console.error("❌ Error in cron job:", error);
      }
    });
  }

  res.status(200).json({ message: "Cron job scheduled." });
}
