import mongoose from 'mongoose';
const bid = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: Number, at: { type: Date, default: Date.now } });
const hist = new mongoose.Schema({ status: String, at: { type: Date, default: Date.now }, note: String });
export default mongoose.model('Slot', new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String, start: Date, end: Date,
  mode: { type: String, enum: ['book', 'auction'], default: 'book' },
  minBid: { type: Number, default: 0 },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  waitlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  bids: [bid], history: [hist], status: { type: String, default: 'open' }
}, { timestamps: true }));
