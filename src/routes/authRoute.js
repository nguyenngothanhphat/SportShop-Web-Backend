/* Import packages */
const express = require("express");

/* Init router */
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
