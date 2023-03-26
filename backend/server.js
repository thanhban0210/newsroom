const express = require("express");
const cors = require("cors");
const register = require("./routes/register");
const auth = require("./routes/auth");
const modify = require("./routes/modify");
const getUser = require("./routes/getUser");
const getNews = require("./routes/getNews");
const favoriteNews = require("./routes/favoriteNews");
const db = require("./database");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user/register", register);
app.use("/user/auth", auth);
app.use("/user/modify", modify);
app.use("/user/me", getUser);
app.use("/news", getNews);
app.use("/favorite", favoriteNews);

db.connect();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
