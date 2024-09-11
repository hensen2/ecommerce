const morgan = require("morgan");
const logger = require("../utils/logger");

// Stream message to http level
const stream = {
  write: (message) => logger.http(message.trim()),
};

// Function to get IP address if in production
const getIpFormat = () =>
  process.env.NODE_ENV === "production" ? "IP req addr: :remote-addr\n" : "";

// Morgan req/res string format
const responseFormat = `${getIpFormat()} :method :url :status :res[content-length] - :response-time ms`;

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Build the morgan middleware
//const morganMiddleware = morgan(responseFormat, { skip, stream });
const morganMiddleware = morgan(responseFormat, {
  skip,
  stream,
});

module.exports = morganMiddleware;
