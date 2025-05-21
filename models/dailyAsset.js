import mongoose from 'mongoose';

const DailyTotalSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, require: true },
  totalValue: { type: String, require: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.DailyTotal || mongoose.model('DailyTotal', DailyTotalSchema);
