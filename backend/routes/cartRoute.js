// Express Router
const cartRouter = require("express").Router();

// Controllers
const { cartController } = require("../controllers/index");

const { getCart, addToCart, updateItem, deleteItem } = cartController;

// Get Cart Route
cartRouter.route("/").get(getCart);

// Add Item To Cart Route
// Update Cart Item Route
// Delete Cart Item Route
cartRouter
  .route("/items/:productId")
  .post(addToCart)
  .patch(updateItem)
  .delete(deleteItem);

module.exports = cartRouter;
