// const express = require('express');
// const router = express.Router();

// const userController = require("../controllers/userController");
// const brandController = require("../controllers/brandController");
// const {requireLogin, isAdmin, isAuth} = require('../controllers/authController');

// router.get("/brand", requireLogin, brandController.getAllBrands);
// router.get("/brand/:brandId", brandController.read);
// router.post("/brand/create/:userId", requireLogin, isAuth, isAdmin, brandController.createBrand);
// router.put("/brand/update/:brandId/:userId", requireLogin, isAuth, isAdmin, brandController.updateBrand);
// router.delete("/brand/delete/:brandId/:userId", requireLogin, isAuth, isAdmin, brandController.deleteBrand);

// router.param("brandId", brandController.getBrandById);
// router.param("userId", userController.getUserById);

// module.exports = router;