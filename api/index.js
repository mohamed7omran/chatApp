const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const Message = require("./models/message");
const ws = require("ws");

dotenv.config();
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("connected to database");
});
mongoose.connection.on("error", (err) => {
  console.error(`failed to connected to database : ${err}`);
});
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

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

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password);
    if (passOk) {
      jwt.sign(
        { userId: foundUser._id, username },
        jwtSecret,
        {},
        (err, token) => {
          res.cookie("token", token).json({
            id: foundUser._id,
          });
        }
      );
    }
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    console.log("successfully post registration");
    const createdUser = await User.create({
      username: username,
      password: hashedPassword,
    });
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

const server = app.listen(8000, () => {
  console.log("i'am listen ,port 8000");
});

const wss = new ws.WebSocketServer({ server });

wss.on("connection", (connection, req) => {
  // red username and id from the cookie for this connection
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokenCookieString = cookies
      .split(";")
      .find((str) => str.startsWith("token="));
    if (tokenCookieString) {
      const token = tokenCookieString.split("=")[1];
      if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
          if (err) {
            console.error("JWT verification error:", err);
            return;
          }
          const { userId, username } = userData;
          connection.userId = userId;
          connection.username = username;
        });
      }
    }
  }

  connection.on("message", async (message) => {
    const messageData = JSON.parse(message.toString());
    const { recipient, text } = messageData;
    if (recipient && text) {
      const messageDoc = await Message.create({
        sender: connection.userId,
        recipient,
        text,
      });
      [...wss.clients]
        .filter((c) => c.userId === recipient)
        .forEach((c) =>
          c.send(
            JSON.stringify({
              text,
              sender: connection.username,
              recipient,
              id: messageDoc._id,
            })
          )
        );
    }
  });

  // notify everyone about online people (when someone connects)
  [...wss.clients].forEach((client) => {
    client.send(
      JSON.stringify({
        online: [...wss.clients].map((c) => ({
          userId: c.userId,
          username: c.username,
        })),
      })
    );
  });
});
