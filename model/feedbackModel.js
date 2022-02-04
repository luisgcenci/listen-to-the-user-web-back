
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  canal: { type: String, default: 0 },
});

module.exports = mongoose.model("feedback", feedbackSchema);