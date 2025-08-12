// pages/api/asset.js
import connectToDatabase from "../../lib/mongoose";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../../models/User";
import Asset from "../../models/Asset";

const SECRET = process.env.JWT_SECRET;

export default async function crudAsset(req, res) {
  await connectToDatabase();

  // GET → دریافت دارایی بر اساس id
  if (req.method === "GET") {
    
    const { id } = req.query;

    if (!id) return res.status(400).json({ error: "شناسه دارایی ضروری است" });

    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, error: "توکن موجود نیست" });
    }

    const decoded = jwt.verify(token, SECRET);
    const user = await User.findOne({ username: decoded.username });
    
    if (!user) return res.status(401).json({ success: false, error: "کاربر یافت نشد" });
    

    try {
      const asset = await Asset.findById({ _id: id, user_id: user._id });
      if (!asset) return res.status(404).json({ error: "دارایی یافت نشد" });

      res.status(200).json(asset);
    } catch (error) {
      console.error("Get asset error:", error);
      res.status(500).json({ error: "خطا در گرفتن دارایی" });
    }
  }

  // PUT → بروزرسانی دارایی
  else if (req.method === "PUT") {
      
      const { id, updateData } = req.body;
      
    if (!id || !updateData) {
        return res.status(400).json({ error: "شناسه و اطلاعات بروزرسانی الزامی هستند" });
    }
    
    try {
      const cookies = cookie.parse(req.headers.cookie || "");
      const token = cookies.token;

      if (!token) {
        return res.status(401).json({ success: false, error: "توکن موجود نیست" });
      }

      const decoded = jwt.verify(token, SECRET);
      const user = await User.findOne({ username: decoded.username });
      
      if (!user) return res.status(401).json({ success: false, error: "کاربر یافت نشد" });
      
      const result = await Asset.updateOne(
          { _id: id, user_id: user._id },
          { $set: updateData }
        );
        
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "دارایی یافت نشد" });
      }

      res.status(200).json({ message: "دارایی با موفقیت بروزرسانی شد" });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "خطا در بروزرسانی دارایی" });
    }
  }

  // DELETE → حذف دارایی
  else if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) return res.status(400).json({ error: "شناسه برای حذف الزامی است" });

    try {
      const cookies = cookie.parse(req.headers.cookie || "");
      const token = cookies.token;

      if (!token) {
        return res.status(401).json({ success: false, error: "توکن موجود نیست" });
      }

      const decoded = jwt.verify(token, SECRET);
      const user = await User.findOne({ username: decoded.username });
      
      if (!user) return res.status(401).json({ success: false, error: "کاربر یافت نشد" });

      const result = await Asset.deleteOne({ _id: id, user_id: user._id });

      if (result.deletedCount === 0)
        return res.status(404).json({ error: "دارایی یافت نشد" });

      res.status(200).json({ message: "دارایی با موفقیت حذف شد" });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ error: "خطا در حذف دارایی" });
    }
  }

  // سایر متدها
  else {
    res.status(405).json({ error: "متد درخواست پشتیبانی نمی‌شود" });
  }
}
