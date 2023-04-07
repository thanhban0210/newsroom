const express = require("express");
const router = express.Router();
const api = require("../services/api");

router.get("/top", async (req, res) => {
  const data = await api.getTopStories("us");
  res.send(data.data);
});

router.get("/local", async (req, res) => {
  const data = await api.getLocalNews("houston");
  res.send(data.data);
});

router.get("/search", async (req, res) => {
  const data = await api.getSearchNews(req.query.q);
  res.send(data.data);
});

router.get("/category/:cat", async (req, res) => {
  const { cat } = req.params;
  const data = await api.getCategory(cat);
  res.send(data.data);
});

router.get("/category-full/:cat", async (req, res) => {
  const { cat } = req.params;
  const data = await api.getCategoryFull(cat);
  res.send(data.data);
});
router.get("/top-full", async (req, res) => {
  const data = await api.getTopStoriesFull("us");
  res.send(data.data);
});
router.get("/local-full", async (req, res) => {
  const data = await api.getLocalNewsFull("houston");
  res.send(data.data);
});

module.exports = router;
