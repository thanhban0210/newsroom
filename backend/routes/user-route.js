const express = require("express");
const User = require("../models/user");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const user = new User(
    _.pick(req.body, ["firstName", "lastName", "email", "username", "password"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.username === 1) {
      res.status(400).json({ message: "Username already exists" });
    }
    if (error.code === 11000 && error.keyPattern.email === 1) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      console.log(error);
    }
  }
});

module.exports = router;
