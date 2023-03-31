const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  addedAt: { type: Date, default: Date.now },
});

const Saved = mongoose.model("Saved", savedSchema);

module.exports = Saved;
