//lib/mongoose.js
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error('لطفاً MONGODB_URI را در متغیرهای محیطی تنظیم کنید.');
}

const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("⚡ اتصال قبلاً برقرار شده است.");
      return;
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ اتصال موفق به MongoDB");
  } catch (err) {
    console.error("❌ خطا در اتصال به MongoDB:", err.message);
    console.error(err);
  }
};

export default connectToDatabase;
