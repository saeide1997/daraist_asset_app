import jwt from "jsonwebtoken";
import connectToDatabase from "../../lib/mongoose"; 
import User from "../../models/User";

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      await connectToDatabase();

      const user = await User.findOne({ username, password });

      if (user) {
        const token = jwt.sign({ username }, SECRET, { expiresIn: "1y" });

        res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=31536000; Secure=${process.env.NODE_ENV === "production"}`);

        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({ success: false });
      }

    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  } else {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
