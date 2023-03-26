const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  addedAt: { type: Date, default: Date.now },
});

const Favorite = mongoose.model("Favorite", favoritesSchema);

module.exports = Favorite;
