const express = require("express");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const config = require("./config/config");
const { apiRouter, webhooksRouter } = require("./routes");
const jobs = require("./jobs/cartManager");
const logger = require("./utils/logger");
const morganMiddleware = require("./middlewares/morgan");
const limiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");

// Create App
const app = express();

// Middlewares
app.use(cors());
app.use((req, res, next) => {
  if (req.originalUrl === "/webhooks/stripe") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);
app.use(mongoSanitize());
app.use("/api", limiter);

// Connect to DB
logger.info(`Connecting to database`);
const clientPromise = mongoose
  .connect(config.DB_URI)
  .then((m) => {
    logger.info("Connected to MongoDB");
    return m.connection.getClient();
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
  });

// Client session middleware
app.use(
  session({
    genid: function () {
      return uuidv4();
    },
    name: "sid",
    secret: config.SESSION_SECRET_KEY,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    store: MongoStore.create({
      client: clientPromise,
      stringify: true,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 48, httpOnly: true, signed: true }, // ms * sec * min * hr
  })
);

// Scheduled cron jobs
jobs.initScheduledJobs();

// Routes
app.use("/api/v1", apiRouter);
app.use("/webhooks", webhooksRouter);

// Serve static files
app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Error handler
app.use(errorHandler);

module.exports = app;
