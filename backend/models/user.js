const mongoose = require("mongoose");

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

const User = mongoose.model("User", userSchema);

module.exports = User;
