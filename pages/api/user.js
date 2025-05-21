import connectToDatabase from "../../lib/mongoose";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import cookie from "cookie";
const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectToDatabase(); // این مهمه
    const data = req.body;
    const user = await User.create(data);
    const token = jwt.sign( data.username , SECRET, { expiresIn: "1y" });

    // ✅ تنظیم کوکی درست و فقط یک بار
    const serialized = cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    res.setHeader("Set-Cookie", serialized); // فقط این!
    return res.status(200).json(user);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
