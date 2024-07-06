const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/user");

dotenv.config();
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("connected to database");
});
mongoose.connection.on("error", (err) => {
  console.error(`failed to connected to database : ${err}`);
});
// const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json());

// !new
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/register", async (req, res) => {
  const user = await User.find();
  res.json(user);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const createdUser = await User.create({ username, password }).then((user) =>
      res.status(200).json({
        message: "User successfully created",
        user,
      })
    );
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
    });
  }
  // createdUser.save();
});
//! new
// app.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     console.log("username");
//     const createdUser = await User.create({ username, password });
//     jwt.sign({ userId: createdUser, id }, jwtSecret, {}, (err, token) => {
//       if (err) throw err;
//       res.cookie("token", token).status(201).json({
//         id: createdUser._id,
//       });
//     });
//   } catch (err) {
//     if (err) throw err;
//     res.status(500).json("error");
//   }
// });

app.listen(8000, () => {
  console.log("i'am listen ,port 8000");
});
