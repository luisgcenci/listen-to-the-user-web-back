const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  service: { type: String, default: 0 },
  feedbackId: { type: String }
});

module.exports = mongoose.model("feedbacks", feedbackSchema);