import mongoose from 'mongoose';
const dep = new mongoose.Schema({ name: String, version: String, license: String, risk: String, explanation: String });
export default mongoose.model('Scan', new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, repoUrl: String, deps: [dep], summary: Object
}, { timestamps: true }));
