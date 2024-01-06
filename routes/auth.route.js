const { Router } = require("express");
const authRouter = Router();
const db = require("../db");

authRouter.post("/signup", (req, res) => {
  const { email, password, confirm_password } = req.body;

  // Insert user into the database
  const sql =
    "INSERT INTO usersignup (email, password, confirm_password) VALUES (?, ?, ?)";
  db.query(sql, [email, password, confirm_password], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("User registered successfully:", result);
      res.status(201).json({ message: "User registered successfully" });
    }
  });
});

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query = "SELECT * FROM usersignup WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length > 0) {
      return res.json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

module.exports = authRouter;
