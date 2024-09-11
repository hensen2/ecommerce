const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50, // Limit each IP to 50 failed requests (status >= 400) per `window` (here, per 10 minutes)
  skipSuccessfulRequests: true, // Skip successful API calls
});

module.exports = limiter;
