const mongoose = require('mongoose');

const detectionLogSchema = new mongoose.Schema(
  {
    people_count: {
      type: Number,
      required: true,
    },
    cluster_count: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DetectionLog', detectionLogSchema);