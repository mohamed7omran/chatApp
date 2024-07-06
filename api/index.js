const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/user");

// ! new
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connecting is successful");
  })
  .catch(() => {
    console.log("error connecting to Mongoose");
  });
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
// !new
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/test", (req, res) => {
  res.json("test ok ");
});
//! new
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("username");
    const createdUser = await User.create({ username, password });
    jwt.sign({ userId: createdUser, id }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).status(201).json({
        id: createdUser._id,
      });
    });
  } catch (err) {
    if (err) throw err;
    res.status(500).json("error");
  }
});

app.listen(8000, () => {
  console.log("i'am listen ,port 8000");
});
