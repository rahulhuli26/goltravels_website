const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const facebookConfig = require("./config/config.facebook");
const googleConfig = require("./config/config.google");
const passport = require("passport");
const session = require("express-session");
const mysql = require("mysql2");
require("dotenv").config();

const authRouter = require("./routes/auth.route");
const facebookRouter = require("./routes/auth.facebook");
const googleRouter = require("./routes/auth.google");

const app = express();
const port = process.env.PORT;

// Configure express-session and passport
app.use(
  require("express-session")({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/", facebookRouter);
app.use("/", googleRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, async () => {
  await db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
    } else {
      console.log("Connected to MySQL!");
    }
  });
  console.log(`Server is running on port ${port}`);
});
