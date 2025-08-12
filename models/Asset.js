import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['gold', 'dollar', 'silver', 'coin', 'crypto', 'stock', 'real_estate'], required: true },
  assetType: { type: String },
  assetAmount: { type: Number, required: true },
  assetAmountType: { type: Number, required: true },
  currency: { type: String, default: 'IRR' },
  date: { type: Date, default: Date.now },
  description: { type: String }
});

export default mongoose.models.Asset || mongoose.model('Asset', AssetSchema);
