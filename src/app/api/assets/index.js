// pages/api/assets/index.js
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db(); // اسم دیتابیس از URI میاد
      const assets = await db.collection("assets").find({}).toArray();
      res.status(200).json(assets);
    } catch (error) {
      res.status(500).json({ error: "خطا در گرفتن دارایی‌ها" });
    }
  }
}
