// pages/api/assets.js
import connectToDatabase from "../../lib/mongoose";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../../models/User";
import Asset from "../../models/Asset";

const SECRET = process.env.JWT_SECRET;

export default async function getUserAssets(req, res) {
  res.status(404).json({ reqmethod: req });
  res.status(404).json({ connectToDatabase: await connectToDatabase() });
  await connectToDatabase();
  res.status(404).json({ reqmethod: req.method });

  if (req.method === "GET") {
    try {
      console.log(1);
      
      const cookies = cookie.parse(req.headers.cookie || "");
      console.log('cookies',cookies);
      res.status(404).json({ cookies: cookies });
      const token = cookies.token;
      console.log(3);

      if (!token) {
        res.status(404).json({ token: 4 });

        return res.status(401).json({ success: false, error: "توکن موجود نیست" });
      }
      res.status(404).json({ token: token });

      const decoded = jwt.verify(token, SECRET);
      res.status(404).json({ decoded: decoded });

      const user = await User.findOne({ username: decoded.username });

      if (!user) return res.status(401).json({ success: false, error: "کاربر یافت نشد" });
      res.status(404).json({ user: user });

      // پیدا کردن تمام دارایی‌های متعلق به کاربر
      const assets = await Asset.find({ user_id: user._id });
      res.status(404).json({ assets: assets });

      res.status(404).json(assets);
    } catch (error) {
      console.error("خطا در گرفتن دارایی‌ها:", error);
      res.status(500).json({ error: "خطا در گرفتن دارایی‌ها" });
    }
  } else {
    res.status(405).json({ error: "متد مجاز نیست" });
  }
}
