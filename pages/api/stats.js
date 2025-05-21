//pages/api/stats.js

import moment from "moment-jalaali";
import DailyTotal from "../../models/dailyAsset"; // اسم مدل واقعی رو بذار
import connectToDatabase from '../../lib/mongoose';
import User from "../../models/User";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    await connectToDatabase();

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

        const allData = await DailyTotal.find({ user_id: user._id }); // مثلاً فیلدها: value و createdAt

        const grouped = {};

        for (const item of allData) {
            const m = moment(item.created_at);
            const shamsiMonth = m.format("jYYYY-jMM");

            if (!grouped[shamsiMonth]) {
                grouped[shamsiMonth] = {
                    total: 0,
                    count: 0,
                };
            }

            const numericValue = Number(item.totalValue); // تبدیل رشته به عدد
            grouped[shamsiMonth].total += numericValue;
            grouped[shamsiMonth].count += 1;
        }

        const result = Object.entries(grouped).map(([month, { total, count }]) => ({
            month,
            total,
            average: total / count,
        }));
        console.log(result);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "خطا در دریافت داده‌ها", error: error.message });
    }
}
