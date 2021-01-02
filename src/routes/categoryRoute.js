const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const categoryController = require("../controllers/categoryController");
const {requireLogin, isAdmin, isAuth} = require('../controllers/authController');

router.post("/category/create/:userId", requireLogin, isAuth, isAdmin, categoryController.createCategory);

router.param("userId", userController.getUserById);

module.exports = router;