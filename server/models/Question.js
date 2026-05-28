const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  difficulty: String,
  topic: String,
  platform: String,
  date: {
    type: Date,
    default: Date.now,
  },
  notes: String,
});

module.exports = mongoose.model("Question", questionSchema);