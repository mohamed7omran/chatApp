const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/user");
const cookieParser = require("cookie-parser");

dotenv.config();
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("connected to database");
});
mongoose.connection.on("error", (err) => {
  console.error(`failed to connected to database : ${err}`);
});
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
// !new
app.use(cookieParser());
// !new => for connected whit frontend
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/test", async (req, res) => {
  res.json("test ok");
});

app.get("/profile", async (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    // !new return id and username
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("successfully post registration");
    const createdUser = await User.create({ username, password });
    // !nwe why mongodb id
    jwt.sign(
      { userId: createdUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;

        res.cookie("token", token).status(201).json({
          id: createdUser._id,
        });
      }
    );
  } catch (err) {
    if (err) throw err;
    res.status(500).json("error");
  }
});

app.listen(8000, () => {
  console.log("i'am listen ,port 8000");
});

// !my post
// app.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const createdUser = await User.create({ username, password }).then((user) =>
//       res.status(200).json({
//         message: "User successfully created",
//         user,
//       })
//     );
//   } catch (err) {
//     res.status(401).json({
//       message: "User not successful created",
//     });
//   }
// createdUser.save();
// });

// app.get("/register", async (req, res) => {
//   const user = await User.find();
//   res.json(user);
// });

// app.get("/register/:userId", async (req, res) => {
//   const id = req.params.userId;
//   const user = await User.findById(id);
//   res.json(user);
// });
