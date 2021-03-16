const express = require('express');
const router = express.Router();

const subCategoryController = require("../controllers/subCategoryController");
const {requireLogin, isAdmin, isAuth} = require('../controllers/authController');

router.post("/sub", requireLogin, isAuth, isAdmin, subCategoryController.create);
router.get("/subs", subCategoryController.list);
router.get("/sub/:slug", subCategoryController.read);
router.put("/sub/:slug", requireLogin, isAuth, isAdmin, subCategoryController.update);
router.delete("/sub/:slug", requireLogin, isAuth, isAdmin, subCategoryController.delete);

module.exports = router;