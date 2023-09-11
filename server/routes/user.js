const express = require("express");
const { registeruser, loginuser } = require("../controllers/usercontroller");
const {finduser, getuser} = require("../controllers/getuser");


const router = express.Router();

router.post("/register", registeruser);
router.post("/login", loginuser);
router.get("/find/:userId", finduser);
router.get("/users", getuser);

module.exports = router;
