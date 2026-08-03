const express = require("express");

const router = express.Router();

const {
  register,
  login,
  refresh,
  logout,
  profile
} = require("../controllers/authController");

const auth = require("../middleware/authMiddleware");


// Register
router.post("/register", register);


// Login
router.post("/login", login);


// Refresh token
router.post("/refresh", refresh);


// Logout
router.post("/logout", logout);


// Profile
router.get("/profile", auth, profile);


module.exports = router;