const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String, // Store hashed password
  firstName: String,
  lastName: String,
  region: { type: String, default: "US" }, // Store user's region or country code
  preferences: {
    darkMode: { type: Boolean, default: false },
    fontSize: { type: Number, default: 14 },
  },
  createdAt: { type: Date, default: Date.now },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATEKEY);
  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
