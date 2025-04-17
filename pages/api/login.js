import jwt from "jsonwebtoken";
import cookie from "cookie";
import connectToDatabase from "../../lib/mongoose"; 
import User from "../../models/User";

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  try {
    await connectToDatabase();

    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ success: false, error: "نام کاربری یا رمز عبور اشتباه است" });
    }

    const token = jwt.sign({ username }, SECRET, { expiresIn: "1y" });

    // ✅ تنظیم کوکی درست و فقط یک بار
    const serialized = cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    res.setHeader("Set-Cookie", serialized); // فقط این!
    res.status(200).json({ success: true });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, error: "خطا در سرور" });
  }
}
