const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const {creatToken} = require("../jwt/authenticatejwt");

secretKey = "nope";

const registeruser = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  try {
    const existingUserByUsername = await usermodel.findOne({ username });
    const existingUserByEmail = await usermodel.findOne({ email });

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

    const newUser = new usermodel({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    const token = creatToken(newUser._id);

    res.status(200).json({ _id: newUser._id, username, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginuser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUserByUsername = await usermodel.findOne({ username });

    if (!existingUserByUsername)
      return res.status().json({ message: "invalid username or password..." });

    const isValidpassword = await bcrypt.compare(
      password,
      existingUserByUsername.password
    );

    if (!isValidpassword)
      return res.status().json({ message: "invalid username or password..." });

    const token = creatToken(existingUserByUsername._id);

    res
      .status(200)
      .json({
        _id: existingUserByUsername._id,
        username,
        email: existingUserByUsername.email,
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { registeruser, loginuser, creatToken };
