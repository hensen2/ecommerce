// Express Router
const orderRouter = require("express").Router();

// Controllers
const { orderController } = require("../controllers/index");

const { getOrder, getStripeKey, confirmOrder, setupCheckout } = orderController;

// Setup Checkout Route
orderRouter.put("/", setupCheckout);

// Get Stripe Key Route
orderRouter.get("/config", getStripeKey);

// Get Order Route
// Update Order Route
orderRouter.route("/:orderId").get(getOrder).put(confirmOrder);

module.exports = orderRouter;
