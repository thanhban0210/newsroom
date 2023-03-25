const express = require("express");
const router = express.Router();
const api = require("../services/api");

router.get("/top", async (req, res) => {
  const data = await api.getTopStories("us");
  res.send(data.data);
});

router.get("/local", async (req, res) => {
  const data = await api.getNews("houston");
  res.send(data.data);
});

module.exports = router;
