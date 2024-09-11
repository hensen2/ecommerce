const catchAsync = require("../utils/catchAsync");
const { Subscriber } = require("../models/index");

/**
 * @desc    Create New Subscriber
 * @param   { String } email - Subscriber email address
 * @returns { Object<type|message|statusCode> }
 */
const createSubscriber = catchAsync(async (email) => {
  await Subscriber.create({
    email,
  });

  return {
    type: "success",
    message: "successSubscriberCreated",
    statusCode: 201,
  };
});

module.exports = {
  createSubscriber,
};
