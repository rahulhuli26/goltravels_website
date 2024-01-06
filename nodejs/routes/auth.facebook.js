const { Router } = require("express");
const facebookRouter = Router();
const db = require("../db");
const passport = require("passport");

// Facebook authentication route
facebookRouter.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// Facebook callback route
facebookRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to a success page or send a token
    res.redirect("/success");
  }
);

// Protected route
facebookRouter.get("/success", (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Here you can perform actions for an authenticated user
  res
    .status(200)
    .json({ message: "Login successful", user: req.facebookusers });
});

module.exports = facebookRouter;
