const catchAsync = require("../utils/catchAsync");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");

/**
 * @desc    Login User
 * @param   { String } username - Login username
 * @param   { String } password - Login password
 * @returns { Object<type|message|statusCode> }
 */
const loginUser = catchAsync(async (username, password) => {
  // 1) Find user
  const user = await User.findOne({ username });

  // 2) If no user found, then error
  if (!user) {
    return {
      type: "error",
      message: "incorrectUsername",
      statusCode: 401,
    };
  }

  // 3) Check if password is correct
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  // 4) If password incorrect, then error
  if (!passwordCorrect) {
    return {
      type: "error",
      message: "incorrectPassword",
      statusCode: 401,
    };
  }

  // 5) Return success data
  return {
    type: "success",
    message: "successLogin",
    statusCode: 200,
  };
});

module.exports = {
  loginUser,
};
