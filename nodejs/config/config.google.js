// const passport = require("passport");
// const mysql = require("mysql2");
// require("dotenv").config();
// const db = require("../db");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// const googleConfig = passport.use(
//   new GoogleStrategy(
//     {
//       clientID: 4567,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/google/callback",
//       profileFields: ["id", "displayName", "email"],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       const user = {
//         google_id: profile.id,
//         display_name: profile.displayName,
//         // email: profile.emails[0].value,
//       };

//       // Insert or update the user in the database
//       const query = "INSERT INTO googleusers SET ? ON DUPLICATE KEY UPDATE ?";

//       db.query(query, [user, user], (err) => {
//         if (err) return done(err);

//         return done(null, user);
//       });
//     }
//   )
// );
// console.log(process.env.GOOGLE_CLIENT_ID);

// // Serialize and deserialize user
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((obj, done) => done(null, obj));

// module.exports = googleConfig;

const passport = require("passport");
const mysql = require("mysql2");
require("dotenv").config();
const db = require("../db");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleConfig = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://goltravels.com/auth/google/callback",
      profileFields: ["id", "displayName", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        google_id: profile.id,
        display_name: profile.displayName,
        // email: profile.emails[0].value,
      };

      // Insert or update the user in the database
      const query = "INSERT INTO googleusers SET ? ON DUPLICATE KEY UPDATE ?";

      db.query(query, [user, user], (err) => {
        if (err) return done(err);

        return done(null, user);
      });
    }
  )
);
console.log(process.env.GOOGLE_CLIENT_ID);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = googleConfig;
