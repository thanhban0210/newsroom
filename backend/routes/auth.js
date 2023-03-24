const express = require("express");
const User = require("../models/user");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username or password.");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password.");

  const token = user.generateAuthToken();
  res.send({ message: "Logged in successfully", token });
});

module.exports = router;
