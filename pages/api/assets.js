// pages/api/assets.js
import connectToDatabase from "../../lib/mongoose";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../../models/User";
import Asset from "../../models/Asset";

const SECRET = process.env.JWT_SECRET;

export default async function getUserAssets(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
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
      res.setHeader('Cache-Control', 'no-store')

      return res.status(200).json(assets);

    } catch (error) {
      console.error("خطا در گرفتن دارایی‌ها:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "متد مجاز نیست" });
  }
}
