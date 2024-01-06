const passport = require("passport");
const mysql = require("mysql2");
require("dotenv").config();
const db = require("../db");
const FacebookStrategy = require("passport-facebook").Strategy;

const facebookConfig = passport.use(
  new FacebookStrategy(
    {
      clientID: 1981629202238510,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "https://goltravels.com/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        facebookId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      };

      // Check if the user already exists in the database
      db.query(
        "SELECT * FROM facebookusers WHERE facebookId = ?",
        [user.facebookId],
        (err, results) => {
          if (err) throw err;

          // If the user doesn't exist, insert into the database
          if (results.length === 0) {
            db.query("INSERT INTO facebookusers SET ?", user, (err) => {
              if (err) throw err;
              console.log("User inserted into the database");
            });
          }
          return done(null, user);
        }
      );
    }
  )
);
console.log(process.env.FACEBOOK_CLIENT_ID);

// Passport serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = facebookConfig;
