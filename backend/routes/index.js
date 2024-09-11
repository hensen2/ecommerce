// Express Routers
const apiRouter = require("express").Router();
const webhooksRouter = require("express").Router();

// Routes
const sessionRoute = require("./sessionRoute");
const cartRoute = require("./cartRoute");
const orderRoute = require("./orderRoute");
const productRoute = require("./productRoute");
const submissionRoute = require("./submissionRoute");
const subscriberRoute = require("./subscriberRoute");
const stripeRoute = require("./stripeRoute");
const userRoute = require("./userRoute");

// Use API routes
apiRouter.use("/sessions", sessionRoute);
apiRouter.use("/carts", cartRoute);
apiRouter.use("/orders", orderRoute);
apiRouter.use("/products", productRoute);
apiRouter.use("/submissions", submissionRoute);
apiRouter.use("/subscribers", subscriberRoute);
apiRouter.use("/users", userRoute);

// Use Webhooks routes
webhooksRouter.use("/stripe", stripeRoute);

module.exports = { apiRouter, webhooksRouter };
