/* Import packages */
const express = require("express");

/* Init router */
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get("/user", authController.requireLogin, userController.getUserById);

module.exports = router;