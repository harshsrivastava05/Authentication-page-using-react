const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
// const bcrypt = require("bcrypt");
const user = require("../db/index");
const { authenticateJwt } = require("../middleware/auth");
const { secretKey } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const username = req.username;
  res.json({ username: username });
});

router.post("/register", async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  try {
    const existingUserByUsername = await user.findOne({ username });
    const existingUserByEmail = await user.findOne({ email });

    const existingUser = existingUserByUsername || existingUserByEmail;

    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Email should be a valid email..." });
    }

    const newUser = new user({ username, email, password });

    await newUser.save();

    const token = jwt.sign({ username, role: "user" }, secretKey, {
      expiresIn: "1d",
    });
    res.json({ message: "User created successfully", token });

    // res.status(200).json({ _id: newUser._id, username, email, token });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUserByUsername = await user.findOne({ username, password });

    if (existingUserByUsername) {
      const token = jwt.sign({ username, role: "admin" }, secretKey, {
        expiresIn: "1h",
      });
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json({ message: "invalid username or password !!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
