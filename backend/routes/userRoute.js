// Express Router
const userRoute = require("express").Router();

// Controllers
const { userController } = require("../controllers/index");

const { loginUser } = userController;

// Validate Address Route
userRoute.post("/", loginUser);

module.exports = userRoute;
