import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {type:String, require:true},
  email: { type: String},
  number: { type: String, unique: true, require:true },
  password: { type: String, require:true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
