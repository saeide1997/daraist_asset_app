// models/Asset.js
const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  type: { // نوع دارایی
    type: String,
    enum: ['gold', 'dollar', 'silver', 'coin', 'crypto', 'stock', 'real_estate'],
    required: true
  },

  assetType: { type: String }, // نام دقیق‌تر: BTC، سکه امامی، سهم فولاد و ...

  assetAmount: { type: Number, required: true }, // مقدار: ۳ گرم طلا، ۰.۵ BTC، ۲۰۰ سهم و...

  assetAmountType: { type: Number, required: true }, // قیمت واحد (مثلاً هر گرم طلا چند؟)

  currency: { type: String, default: 'IRR' }, // ریال، تومان، دلار و...

  date: { type: Date, default: Date.now }, // تاریخ ثبت دارایی

  description: { type: String } // یادداشت اختیاری
});

module.exports = mongoose.models.Asset || mongoose.model('Asset', AssetSchema);
