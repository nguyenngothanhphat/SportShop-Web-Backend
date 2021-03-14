/* Import packages */
const express = require("express");

/* Init router */
const router = express.Router();

const userController = require("../controllers/userController");
const {requireLogin, isAuth, isAdmin} = require("../controllers/authController");

router.get("/user/:userId", requireLogin, isAdmin, userController.read);

router.param("userId", userController.getUserById);

module.exports = router;