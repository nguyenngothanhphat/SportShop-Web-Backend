const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const categoryController = require("../controllers/categoryController");
const {requireLogin, isAdmin, isAuth} = require('../controllers/authController');

router.get("/category", requireLogin, categoryController.getAllCategories);
router.get("/category/:categoryId", categoryController.read);
router.post("/category/create/:userId", requireLogin, isAuth, isAdmin, categoryController.createCategory);
router.put("/category/update/:categoryId/:userId", requireLogin, isAuth, isAdmin, categoryController.updateCategory);
router.delete("/category/delete/:categoryId/:userId", requireLogin, isAuth, isAdmin, categoryController.deleteCategory);

router.param("categoryId", categoryController.getCategoryById);
router.param("userId", userController.getUserById);

module.exports = router;