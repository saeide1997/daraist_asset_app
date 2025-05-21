// pages/api/profile.js
import jwt from "jsonwebtoken";
import cookie from "cookie";
import connectToDatabase from "../../lib/mongoose";
import User from "../../models/User";

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  await connectToDatabase();

  // گرفتن توکن از کوکی
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, error: "دسترسی غیرمجاز" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const username = decoded.username;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, error: "کاربر پیدا نشد" });
    }

    if (req.method === "GET") {
      // دریافت اطلاعات کاربر
      return res.status(200).json({
        success: true,
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
          number: user.number
          // بقیه فیلدهایی که بخوای
        },
      });
    }

    if (req.method === "PUT") {
      // ویرایش اطلاعات کاربر
      const { email, username, number, password } = req.body;
      user.email = email || user.email;
      user.number = number || user.number;
      user.password = password || user.password;
      user.username = username || user.username;
      await user.save();

      return res.status(200).json({ success: true, message: "اطلاعات با موفقیت به‌روز شد" });
    }

    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(401).json({ success: false, error: "توکن نامعتبر" });
  }
}
