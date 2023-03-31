const express = require("express");
const Article = require("../models/article");
const Saved = require("../models/saved");
const Favorite = require("../models/favorite");
const auth = require("../middleware/auth");
const _ = require("lodash");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const articleData = req.body;
    let article = await Article.findOne({ url: articleData.url });
    if (!article) {
      article = new Article(articleData);
      await article.save();
    }

    const articleId = article._id;
    const userId = req.user._id;

    const existingSaved = await Saved.findOne({
      user: userId,
      article: articleId,
    });

    if (!existingSaved) {
      // Save the article as a favorite for the user
      const saved = new Saved({
        user: userId,
        article: articleId,
      });
      await saved.save();
      res
        .status(201)
        .json({ message: "Article added to saved for later", saved });
    } else {
      res.status(200).json({ message: "Article already in saved for later" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error occurred while adding the article to saved for later",
      error,
    });
  }
});

router.get("/", auth, async (req, res) => {
  const userId = req.user._id;
  const userSaved = await Saved.find({ user: userId })
    .populate("article")
    .exec();

  const savedArticles = userSaved.map((saved) => saved.article);

  res.send(savedArticles);
});

router.delete("/:title", auth, async (req, res) => {
  const userId = req.user._id;
  const articleTitle = req.params.title;
  const articleId = await Article.find({ title: articleTitle }).select("_id");

  await Saved.findOneAndDelete({ user: userId, article: articleId[0]._id });

  const otherFavorites = await Favorite.find({ article: articleId[0]._id });
  const otherSaved = await Saved.find({ article: articleId[0]._id });

  if (otherFavorites.length === 0 && otherSaved.length === 0) {
    await Article.findByIdAndDelete(articleId[0]._id);
  }
});

module.exports = router;
