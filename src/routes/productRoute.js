const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");

router.get("/product/:productId", productController.readProduct);
router.post("/product/create/:userId", authController.requireLogin, authController.isAuth, authController.isAdmin, productController.createProduct);
router.put("/product/update/:productId/:userId", authController.requireLogin, authController.isAuth, authController.isAdmin, productController.updateProduct);
router.delete("/delete/product/:productId/:userId", authController.requireLogin, authController.isAuth, authController.isAdmin, productController.deleteProduct);

router.param("productId", productController.getProductById);
router.param("userId", userController.getUserById);

module.exports = router;