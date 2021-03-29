const express = require("express");
const router = express.Router();

const { createPaymentIntent } = require("../controllers/stripeController");
// const { route } = require("./user");
// middleware
const { authCheck } = require("../middlewares/auth");

router.post("/create-payment-intent", authCheck, createPaymentIntent);

module.exports = router;
