const express = require("express");
const {
  users,
  createUsers,
  loginUsers,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

router.get("/user", users);

router.post("/signup", createUsers);

router.post("/login", loginUsers);

router.post("/deleteAccount", deleteUser);

module.exports = router;
