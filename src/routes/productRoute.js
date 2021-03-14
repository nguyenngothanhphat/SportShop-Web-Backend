const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");

router.get("/products", productController.listProduct);
router.get("/products/search", productController.listSearch);
router.get("/products/related/:productId", productController.listRelated);
router.get("/products/categories", productController.listCategories);
router.post("/products/by/search", productController.listBySearch);
router.get("/product/image/:productId", productController.image);
router.get("/product/:productId", productController.readProduct);
router.post("/product/create/:userId", authController.requireLogin, authController.isAuth, authController.isAdmin, productController.createProduct);
router.put("/product/update/:productId/:userId", authController.requireLogin, authController.isAuth, authController.isAdmin, productController.updateProduct);
router.delete("/delete/product/:productId/:userId", authController.requireLogin, authController.isAuth, authController.isAdmin, productController.deleteProduct);

router.param("productId", productController.getProductById);
router.param("userId", userController.getUserById);

module.exports = router;