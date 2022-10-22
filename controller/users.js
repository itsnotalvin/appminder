const express = require("express");
const { generateHash, isValidPassword } = require("../utlity/hashFn.js");
const db = require("../database/db");
const User = require("../models/Users")

const router = express.Router();

// User Sign Up
router.post("/signup", (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = generateHash(password);

    db.query("SELECT FROM users WHERE email=$1", [email])
    .then(dbRes => {
        if (dbRes.rows.length === 1) {
            req.statusCode(400).json({ message: "Sorry an account associated with that email already exists" });
        } else {
            const sql = `INSERT INTO users(first_name, last_name, email, hashed_pw) VALUES($1, $2, $3, $4)`;
            db.query(sql, [first_name, last_name, email, hashedPassword])
            .then(() => {
                req.json({ message: "Welcome to Appminder"});
            })
            .catch((err) => {
                req.status(500).json({})
            });
        }
        
    })
    .catch((err) => {
        res.status(500).json({})
    });
    

});

// User login
router.post("/session", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT id, first_name, hashed_pw FROM users WHERE email=$1", [email])
    .then((dbRes) => {
      if (dbRes.rows.length === 0) {
        return res.status(400).json({
          message:
            "The e-mail address and/or password you specified are not correct.",
        });
      }
      const user = dbRes.rows[0];
      const hashedPassword = user.hashed_pw;
      if (isValidPassword(password, hashedPassword)) {
        req.session.email = email;
        req.session.user_id = user.id;
        req.session.name = user.first_name;
        return res.json({});
      } else {
        return res.status(400).json({
          message:
            "The e-mail address and/or password you specified are not correct.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({});
    });
});
  
// Check if user currently logged in
router.get("/session", (req, res) => {
  const user_id = req.session.user_id;
  const name = req.session.name;
  
  if (!user_id || !name) {
    return res.status(401).json({ message: "Unable to sign in " });
  } else {
    return res.json({ id: user_id, name: name });
  }
});
  
// Logout
router.delete("/session", (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(400).json({ message: "Unable to log out" });
        } else {
          res.json({ message: "Successfully logged out" });
        }
      });
    } else {
      res.end();
    }
});
  

module.exports = router;