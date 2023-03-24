const express = require("express");
const router = express.Router();
const api = require("../services/api");

router.get("/", async (req, res) => {
  const data = await api.getNewsList("us");
  res.send(data.data);
});

module.exports = router;
