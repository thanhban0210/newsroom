const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.DB_URL;
const connect = async () => {
  await mongoose
    .connect(dbUrl)
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log(err));
};

const close = () => mongoose.connection.close();

module.exports = { connect, close };
