const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.get("/test", (req, res) => {
  res.json("test ok ");
});

app.post("/register", (req, res) => {});

app.listen(4000, () => {
  console.log("i am listen");
});
