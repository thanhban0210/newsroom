const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const result = await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.username === 1) {
      res.status(400).json({ message: "Username already exists" });
    } else {
      console.log(ex);
    }
  }
});

module.exports = router;
