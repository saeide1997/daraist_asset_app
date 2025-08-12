// pages/api/addAsset.js
import jwt from "jsonwebtoken";
import cookie from "cookie";
import connectToDatabase from "../../lib/mongoose";
import Asset from "../../models/Asset";
import User from "../../models/User";

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  await connectToDatabase();

  try {
    const rawCookies = req.headers?.cookie || "";
    if (!rawCookies) {
      return res.status(401).json({ success: false, error: "کوکی یافت نشد" });
    }

    const cookies = cookie.parse(rawCookies);
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, error: "توکن وجود ندارد" });
    }

    const decoded = jwt.verify(token, SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, error: "توکن معتبر نیست" });
    }

    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return res.status(401).json({ success: false, error: "کاربر یافت نشد" });
    }

    const {
      assetType,
      assetAmount,
      assetAmountType,
      currency,
      description,
    } = req.body;

    // بررسی فیلدهای الزامی
    if (!assetType || !assetAmount || !assetAmountType || !currency) {
      return res.status(400).json({ success: false, error: "لطفاً همه فیلدهای ضروری را وارد کنید" });
    }

    const newAsset = new Asset({
      user_id: user._id,
      assetType,
      assetAmount,
      assetAmountType,
      currency,
      description: description || "",
      createdAt: new Date(),
    });

    await newAsset.save();

    return res.status(201).json({ success: true, asset: newAsset });

  } catch (err) {
    console.error("خطا در ایجاد دارایی:", err);
    return res.status(500).json({ success: false, error: "خطای سرور" });
  }
}
