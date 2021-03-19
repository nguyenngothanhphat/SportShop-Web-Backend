const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const authController = require("../controllers/authController");

router.post("/create-or-update-user", authCheck, authController.createOrUpdateUser);
router.post("/current-user", authCheck, authController.currentUser);
router.post("/current-admin", authCheck, adminCheck, authController.currentUser);

module.exports = router;
