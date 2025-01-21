const express = require("express");
const {
  signup,
  signin,
  logout,
  forgotPassword,
} = require("../controllers/auth/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.get("/logout", logout);

module.exports = router;
