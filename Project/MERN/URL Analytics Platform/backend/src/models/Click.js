import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema(
  {
    link: { type: mongoose.Schema.Types.ObjectId, ref: 'Link', required: true, index: true },
    ip: { type: String, default: 'unknown' },
    country: { type: String, default: 'Unknown' },
    city: { type: String, default: 'Unknown' },
    device: { type: String, default: 'Unknown' }, // mobile, tablet, desktop
    browser: { type: String, default: 'Unknown' },
    os: { type: String, default: 'Unknown' },
    referrer: { type: String, default: 'Direct' },
  },
  { timestamps: true }
);

clickSchema.index({ link: 1, createdAt: -1 });

export default mongoose.model('Click', clickSchema);
