const { Router } = require("express");
const googleRouter = Router();
const db = require("../db");
const passport = require("passport");

// Route for Google login
googleRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

// Callback URL for Google login
googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })
);

// Example home route
googleRouter.get("/dashboard", (req, res) => {
  res.send(req.isAuthenticated() ? "Logged in" : "Not logged in");
});

module.exports = googleRouter;
