const express = require("express");
const Article = require("../models/article");
const Favorite = require("../models/favorite");
const auth = require("../middleware/auth");
const _ = require("lodash");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const articleData = req.body;
    // Check if the article is already in the Article collection
    let article = await Article.findOne({ url: articleData.url });
    if (!article) {
      article = new Article(articleData);
      await article.save();
    }

    const articleId = article._id;
    const userId = req.user._id;

    const existingFavorite = await Favorite.findOne({
      user: userId,
      article: articleId,
    });

    if (!existingFavorite) {
      // Save the article as a favorite for the user
      const favorite = new Favorite({
        user: userId,
        article: articleId,
      });
      await favorite.save();
      res.status(201).json({ message: "Article added to favorites", favorite });
    } else {
      res.status(200).json({ message: "Article already in favorites" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error occurred while adding the article to favorites",
      error,
    });
  }
});

router.get("/", auth, async (req, res) => {
  const userId = req.user._id;
  const userFavorites = await Favorite.find({ user: userId })
    .populate("article")
    .exec();

  const favoriteArticles = userFavorites.map((favorite) => favorite.article);
  // console.log(favoriteArticles);
  res.send(favoriteArticles);
});

router.delete("/:title", auth, async (req, res) => {
  const userId = req.user._id;
  const articleTitle = req.params.title;
  const articleId = await Article.find({ title: articleTitle }).select("_id");
  // console.log(articleId);
  // Remove the favorite relationship between user and article
  await Favorite.findOneAndDelete({ user: userId, article: articleId[0]._id });

  // // Check if there are any other users who have the article in their favorites
  const otherFavorites = await Favorite.find({ article: articleId[0]._id });

  // // If no other users have the article as a favorite, remove it from the Article collection
  if (otherFavorites.length === 0) {
    await Article.findByIdAndDelete(articleId[0]._id);
  }
});

module.exports = router;
