import mongoose from "mongoose";
// import { useEffect, useState } from "react";

// تعریف اسکیمای Asset برای Mongoose
const assetSchema = new mongoose.Schema({
  assetType: { type: String, required: true },
  assetAmount: { type: Number, required: true },
  assetAmountType: { type: String, required: true },
  description: { type: String, required: false },
});

// ایجاد مدل Mongoose از اسکیمای Asset
const Asset = mongoose.models.asset || mongoose.model("asset", assetSchema);

export async function getAssets() {
  // اطمینان حاصل کنید که اتصال Mongoose باز است
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI ); // به صورت مستقیم از Mongoose متصل شوید
  }

  try {
    // با استفاده از Mongoose داده‌ها را پیدا می‌کنیم
    const assets = await Asset.find();

    // چاپ داده‌های دریافتی برای بررسی
    // console.log("Assets from DB:", assets);

    // تبدیل داده‌ها به فرمت مورد نظر
    const cleanAssets = assets.map((item) => ({
      _id: item._id.toString(),
      assetType: item.assetType,
      assetAmount: item.assetAmount,
      assetAmountType: item.assetAmountType,
      description: item.description,
    }));

    return cleanAssets;
  } catch (error) {
    console.error("Error fetching assets from MongoDB:", error);
    return [];
  }
}


export async function addAsset(data) {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  try {
    const newAsset = new Asset(data);
    await newAsset.save();
    // console.log("New asset saved:", newAsset);
    return true;
  } catch (error) {
    console.error("Error saving asset:", error);
    return false;
  }
}

export async function fetchMarketPrices() {
    const API_KEY = 'FreeFbhZCp8ZBfgb15fgCPCW3sAW7Xbb';
    const res = await fetch(`https://brsapi.ir/Api/Market/Gold_Currency.php?key=${API_KEY}`,
      {
        next: { revalidate: 300 }, // 5 دقیقه
      cache: 'no-store' 
    }
  );
  
    if (!res.ok) {
      throw new Error('Failed to fetch prices');
    }
  
    const prices = await res.json();
    return prices;
  }