const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

secretKey = "nope";

const creatToken = (_id) => {
  const token = jwt.sign({ _id }, secretKey, { expiresIn: "2d" });

  return token;
};

module.exports = { creatToken };
