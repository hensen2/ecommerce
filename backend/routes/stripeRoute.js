// Express Router
const express = require("express");
const stripeRouter = express.Router();

// Controllers
const { stripeController } = require("../controllers/index");

const { fulfillOrder } = stripeController;

// Fulfill Order Route
stripeRouter.post("/", express.raw({ type: "application/json" }), fulfillOrder);

module.exports = stripeRouter;
