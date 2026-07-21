import mongoose from 'mongoose';
const progress = new mongoose.Schema({
  user: String, wpm: Number, accuracy: Number, finishedAt: Date,
  events: [{ t: Number, idx: Number }]
});
export default mongoose.model('Match', new mongoose.Schema({
  roomId: String, text: String, players: [progress], startedAt: Date, endedAt: Date
}, { timestamps: true }));
