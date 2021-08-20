const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/search-account", authController.searchUserAccount);
router.put(
  "/forgot-password/:searchType/:userId",
  authController.createPasswordResetCode
);
router.post("/new-password", authController.createNewPassword);
router.post("/forgot-password-verify-code", authController.verifyCode);
module.exports = router;
