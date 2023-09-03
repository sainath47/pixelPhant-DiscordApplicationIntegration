const express = require("express");
const {
  createUser,
  userlogin,
  readUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");
const router = express.Router();

//user
router.post("/register", createUser);
router.post("/login", userlogin);
router.get("/:id", readUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
