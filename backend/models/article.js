const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  author: String,
  urlToImage: String,
  description: { type: String, unique: true },
  source: {
    id: String,
    name: String,
  },
  publishedAt: String,
  content: String,
  url: String,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
