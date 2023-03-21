const express = require("express");
const User = require("../models/user");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update user object with new data
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    // Save updated user to database
    await user.save();
    res.status(200).send("User profile updated");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
