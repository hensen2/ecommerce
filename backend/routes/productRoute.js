// Express Router
const productRouter = require("express").Router();

// Controllers
const { productController } = require("../controllers/index");

const { getAllProducts, getProduct } = productController;

// Get All Products Route
productRouter.get("/", getAllProducts);

// Get Product Route
productRouter.get("/:productId", getProduct);

module.exports = productRouter;
