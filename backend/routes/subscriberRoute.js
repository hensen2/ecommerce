// Express Router
const subscriberRoute = require("express").Router();

// Controllers
const { subscriberController } = require("../controllers/index");

const { createSubscriber } = subscriberController;

// Validate Address Route
subscriberRoute.post("/", createSubscriber);

module.exports = subscriberRoute;
