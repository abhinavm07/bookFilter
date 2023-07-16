const express = require("express");
const { createUsers, loginUsers } = require("../controller/userController");

const router = express.Router();

router.post("/signup", createUsers);

router.post("/login", loginUsers);

module.exports = router;
