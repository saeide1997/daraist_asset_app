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

  try {
    // بررسی اتصال به دیتابیس
    await connectToDatabase();

    // گرفتن توکن از کوکی
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, error: "توکن وجود ندارد" });
    }

    // اعتبارسنجی توکن
    const decoded = jwt.verify(token, SECRET);
    const username = decoded.username;

    // پیدا کردن کاربر
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, error: "کاربر یافت نشد" });
    }

    const { assetType, assetAmount, assetAmountType, description } = req.body;

    // ایجاد دارایی جدید
    const newAsset = new Asset({
      user_id: user._id,
      assetType,
      assetAmount,
      assetAmountType,
      description,
    });

    await newAsset.save();

    return res.status(201).json({ success: true, asset: newAsset });

  } catch (err) {
    console.error("خطا در ایجاد دارایی:", err);
    return res.status(500).json({ success: false, error: "خطای سرور" });
  }
}
