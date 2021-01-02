const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const brandController = require("../controllers/brandController");
const {requireLogin, isAdmin, isAuth} = require('../controllers/authController');

router.post("/brand/create/:userId", requireLogin, isAuth, isAdmin, brandController.createBrand);

router.param("userId", userController.getUserById);

module.exports = router;