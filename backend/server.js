const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user-route");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user/", userRoute);

db.connect();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
