import mongoose from 'mongoose';
const clickSchema = new mongoose.Schema({
  at: { type: Date, default: Date.now },
  referrer: String,
  device: String,
  country: String,
  ua: String,
});
const linkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  originalUrl: String,
  slug: { type: String, unique: true },
  title: String,
  utm: { source: String, medium: String, campaign: String },
  clicks: [clickSchema],
}, { timestamps: true });
export default mongoose.model('Link', linkSchema);
