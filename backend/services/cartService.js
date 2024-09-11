const catchAsync = require("../utils/catchAsync");
const { Cart, Product } = require("../models/index");

/**
 * @desc    Get Cart Logic
 * @param   { String } cartId - Session Cart ID
 * @returns { Object<type|message|statusCode|cart> }
 */
const getCartSession = catchAsync(async (cartId) => {
  // 1) Find cart using id
  const cart = await Cart.findById(cartId)
    .populate({
      path: "items.product",
      select: ["name", "price", "mainImage", "categories"],
    })
    .exec();

  // 2) Return cart data
  return {
    type: "success",
    message: "successCartFound",
    statusCode: 200,
    cart,
  };
});

/**
 * @desc    Create Cart
 * @param   { Object } session - Client Session Object
 * @param   { String } productId - Product ID Added to Cart
 * @param   { Number } quantity - Product Quantity to Add
 * @returns { Object<type|message|statusCode> }
 */
const createCart = catchAsync(async (session, productId, quantity) => {
  // 1) Find product using id
  const product = await Product.findById(productId)
    .select(["price", "stockRemaining"])
    .exec();

  // 2) If no product found, return error
  if (!product) {
    return {
      type: "error",
      message: "noProductFound",
      statusCode: 400,
    };
  }

  // 3) If not enough in stock, return error
  if (product.stockRemaining < quantity) {
    return {
      type: "error",
      message: "errorNoStockRemaining",
      statusCode: 409,
    };
  }

  // 4) Logic for creating cart data
  const priceToAdd = Number((product.price * quantity).toFixed(2));

  const productObj = {
    product: productId,
    totalProductPrice: priceToAdd,
    totalProductQuantity: quantity,
  };

  const cartObj = {
    items: [productObj],
    subtotalPrice: priceToAdd,
    totalQuantity: quantity,
  };

  // 5) Create cart
  const cart = await Cart.create(cartObj);

  // 6) If no cart created, return error
  if (!cart) {
    return {
      type: "error",
      message: "noCartCreated",
      statusCode: 422,
    };
  }

  // 7) Update session data
  session.cartId = cart.id;

  // 8) Update product quantity and save
  product.stockRemaining -= quantity;
  await product.save();

  // 9) Return cart data
  return {
    type: "success",
    message: "successAddToCart",
    statusCode: 201,
  };
});

/**
 * @desc    Add To Cart
 * @param   { String } cartId - Session Cart Id
 * @param   { String } productId - Product ID Added to Cart
 * @param   { Number } quantity - Product Quantity to Add
 * @returns { Object<type|message|statusCode> }
 */
const addToCart = catchAsync(async (cartId, productId, quantity) => {
  // 1) Find product using id
  const product = await Product.findById(productId)
    .select(["price", "stockRemaining"])
    .exec();

  // 2) If no product found, return error
  if (!product) {
    return {
      type: "error",
      message: "noProductFound",
      statusCode: 400,
    };
  }

  // 3) If not enough in stock, return error
  if (product.stockRemaining < quantity) {
    return {
      type: "error",
      message: "errorNoStockRemaining",
      statusCode: 409,
    };
  }

  // 4) Find cart using id
  const cart = await Cart.findById(cartId).exec();

  // 5) If no cart found, return error
  if (!cart) {
    return {
      type: "error",
      message: "noCartFound",
      statusCode: 404,
    };
  }

  // 6) Logic for updating cart data
  const isItemExist = cart.items.find((item) => {
    return item.product.toString() === productId;
  });

  const priceToAdd = Number((product.price * quantity).toFixed(2));

  if (isItemExist) {
    // Update item
    isItemExist.totalProductPrice = Number(
      (isItemExist.totalProductPrice + priceToAdd).toFixed(2)
    );
    isItemExist.totalProductQuantity += quantity;

    // Insert updated item
    cart.items = cart.items.map((item) =>
      item.product.toString() === productId ? isItemExist : item
    );
  } else {
    cart.items.push({
      product: productId,
      totalProductQuantity: quantity,
      totalProductPrice: priceToAdd,
    });
  }

  // Update subtotal and totalQuantity
  cart.subtotalPrice = Number((cart.subtotalPrice + priceToAdd).toFixed(2));
  cart.totalQuantity += quantity;

  // 7) Save updated cart
  await cart.save();

  // 8) Update product quantity and save
  product.stockRemaining -= quantity;
  await product.save();

  // 9) Return cart data
  return {
    type: "success",
    message: "successAddToCart",
    statusCode: 204,
  };
});

/**
 * @desc    Update Cart Item
 * @param   { String } cartId - Session Cart ID
 * @param   { String } productId - Product ID
 * @param   { Number } quantity - Product Quantity to Update
 * @returns { Object<type|message|statusCode> }
 */
const updateItem = catchAsync(async (cartId, productId, quantity) => {
  // 1) Find cart using id
  const cart = await Cart.findById(cartId)
    .populate({
      path: "items.product",
      select: ["price", "stockRemaining"],
    })
    .exec();

  // 2) If no cart found, return error
  if (!cart) {
    return {
      type: "error",
      message: "noCartFound",
      statusCode: 404,
    };
  }

  // 3) Logic for updating cart data
  const itemToChange = cart.items.find((item) => {
    return item.product.id === productId;
  });

  const diff = quantity - itemToChange.totalProductQuantity;

  // If not enough in stock, return error
  if (itemToChange.product.stockRemaining - diff < 0) {
    return {
      type: "error",
      message: "errorNoStockRemaining",
      statusCode: 409,
    };
  }

  // Update item
  const priceToChange = itemToChange.product.price * diff;

  itemToChange.totalProductPrice = Number(
    (itemToChange.totalProductPrice + priceToChange).toFixed(2)
  );
  itemToChange.totalProductQuantity += diff;

  // Insert item
  cart.items = cart.items.map((item) =>
    item.product.id === productId ? itemToChange : item
  );

  // Update subtotal and totalQuantity
  cart.subtotalPrice = Number((cart.subtotalPrice + priceToChange).toFixed(2));
  cart.totalQuantity += diff;

  // 4) Save updated cart
  await cart.save();

  // 5) Update product quantity and save
  itemToChange.product.stockRemaining -= diff;
  await itemToChange.product.save();

  // 6) Return cart data
  return {
    type: "success",
    message: "successUpdateCart",
    statusCode: 204,
  };
});

/**
 * @desc    Delete Cart Item
 * @param   { String } cartId - Session Cart ID
 * @param   { String } productId - Product ID
 * @returns { Object<type|message|statusCode> }
 */
const deleteItem = catchAsync(async (cartId, productId) => {
  // 1) Find cart using id
  const cart = await Cart.findById(cartId)
    .populate({
      path: "items.product",
      select: ["stockRemaining"],
    })
    .exec();

  // 2) If no cart found, return error
  if (!cart) {
    return {
      type: "error",
      message: "noCartFound",
      statusCode: 404,
    };
  }

  // 3) Logic for updating cart data
  const itemToRemove = cart.items.find((i) => i.product.id === productId);

  // Remove item
  cart.items = cart.items.filter((i) => i.product.id !== productId);

  // Update cart subtotal and totalQuantity
  cart.subtotalPrice = Number(
    (cart.subtotalPrice - itemToRemove.totalProductPrice).toFixed(2)
  );
  cart.totalQuantity -= itemToRemove.totalProductQuantity;

  // 4) Save updated cart
  await cart.save();

  // 5) Update product quantity and save
  itemToRemove.product.stockRemaining += itemToRemove.totalProductQuantity;
  await itemToRemove.product.save();

  // 6) Return cart data
  return {
    type: "success",
    message: "successDeleteItem",
    statusCode: 204,
  };
});

module.exports = {
  getCartSession,
  createCart,
  addToCart,
  updateItem,
  deleteItem,
};
