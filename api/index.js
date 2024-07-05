const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("./models/user");

dotenv.config();
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;

app.get("/test", (req, res) => {
  res.json("test ok ");
});
//! new
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const createdUser = await User.create({ username, password });
  jwt.sign({ userId: createdUser, id }, jwtSecret, (err, token) => {
    if (err) throw err;
    res.cookie("token", token).status(201).json("ok");
  });
});

app.listen(4000, () => {
  console.log("i am listen 4000");
});
