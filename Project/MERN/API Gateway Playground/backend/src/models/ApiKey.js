import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const apiKeySchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    label: { type: String, required: true, trim: true },
    key: { type: String, required: true, unique: true, default: () => `gwk_${uuidv4().replace(/-/g, '')}` },
    active: { type: Boolean, default: true },
    rateLimit: {
      windowMs: { type: Number, default: 60000 },
      max: { type: Number, default: 30 },
    },
  },
  { timestamps: true }
);

export default mongoose.model('ApiKey', apiKeySchema);
