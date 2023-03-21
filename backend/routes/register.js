const express = require("express");
const User = require("../models/user");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  let checkUser = await User.findOne({ username: req.body.username });
  let checkEmail = await User.findOne({ email: req.body.email });
  if (checkUser || checkEmail)
    return res.status(400).send("Username or email already in use");

  const user = new User(
    _.pick(req.body, ["firstName", "lastName", "email", "username", "password"])
  );

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);
  try {
    await user.save();
    const token = user.generateAuthToken();
    res
      .status(201)
      .header("Authorization", `Bearer ${token}`)
      .send("Registration successful");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
