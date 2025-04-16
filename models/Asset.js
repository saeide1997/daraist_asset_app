import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assetType: { type: String},
    assetAmount: { type: String },
    assetAmountType: { type: String},
    description: { type: String },
    created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Asset || mongoose.model('Asset', AssetSchema);