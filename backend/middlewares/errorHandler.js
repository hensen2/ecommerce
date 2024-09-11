const config = require("../config/config");
const logger = require("../utils/logger");

// @desc    Function That Handles MongoDB Casting Errors (BAD_REQUEST)
const handleCastErrorDB = (err) => {
  err.message = `Invalid ${err.path}: ${err.value}`;
  err.statusCode = 400;
  return err;
};

// @desc    Function That Handles MongoDB Duplication Errors (BAD_REQUEST)
const handleDuplicateFieldsDB = (err) => {
  const dupField = Object.keys(err.keyValue)[0];
  err.message = `Duplicate field(${dupField}). Please use another value(${err.keyValue[dupField]})!`;
  err.statusCode = 400;
  return err;
};

// @desc    Function That Handles MongoDB Validation Errors (BAD_REQUEST)
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  err.message = `Invalid input data. ${errors.join(". ")}`;
  err.statusCode = 400;
  return err;
};

// @desc    Function That Handles Joi Input Validation Errors (BAD_REQUEST)
const handleInputValidationError = (err) => {
  err.statusCode = 400;
  return err;
};

// @desc    Function That Shows Details About The Error Only on The Development Phase
const sendErrorDev = async (err, req, res) => {
  logger.error("ERROR 💥", err);

  return res.status(err.statusCode).json({
    error: err,
    message: `${err.message}`,
    stack: err.stack,
  });
};

// @desc    Function That Shows Little Info About The Error Only on The Production Phase
const sendErrorProd = async (err, req, res) => {
  logger.error("ERROR 💥", err);

  return res.status(err.statusCode).json({
    message: `${err.message}`,
  });
};

// eslint-disable-next-line
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (config.NODE_ENV === "production") {
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "InputValidationError")
      err = handleInputValidationError(err);

    sendErrorProd(err, req, res);
  } else {
    sendErrorDev(err, req, res);
  }
};
