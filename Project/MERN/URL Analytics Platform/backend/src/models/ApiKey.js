import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    key: { type: String, required: true, unique: true, index: true },
    label: { type: String, default: 'API Key' },
    requestsPerMinute: { type: Number, default: 30 },
    isActive: { type: Boolean, default: true },
    lastUsedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model('ApiKey', apiKeySchema);
