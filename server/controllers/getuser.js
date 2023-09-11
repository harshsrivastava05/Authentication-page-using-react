const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { creatToken } = require("../jwt/authenticatejwt");

secretKey = "nope";

const getuser = async (req, res) => {
  try {
    const users = await usermodel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "error found :", error });
  }
};

const finduser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await usermodel.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "error found :", error });
  }
};

module.exports = { getuser, finduser };
