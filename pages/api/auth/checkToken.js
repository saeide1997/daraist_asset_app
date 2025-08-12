// /pages/api/auth/checkToken.js
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export default function handler(req, res) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ valid: false, error: "No token provided" });
  }

  try {
    jwt.verify(token, SECRET);
    return res.status(200).json({ valid: true });
  } catch (err) {
    return res.status(401).json({ valid: false, error: "Invalid token" });
  }
}
