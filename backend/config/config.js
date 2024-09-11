require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

const DB_URI =
  process.env.NODE_ENV !== "production"
    ? process.env.DEV_DB_URI
    : process.env.DB_URI;

const SESSION_SECRET_KEY =   process.env.SESSION_SECRET_KEY;



const STRIPE_PUBLISHABLE_KEY =
  process.env.NODE_ENV !== "production"
    ? process.env.DEV_STRIPE_PUBLISHABLE_KEY
    : process.env.STRIPE_PUBLISHABLE_KEY;

const STRIPE_SECRET_KEY =
  process.env.NODE_ENV !== "production"
    ? process.env.DEV_STRIPE_SECRET_KEY
    : process.env.STRIPE_SECRET_KEY;

const STRIPE_WEBHOOK_KEY = process.env.STRIPE_WEBHOOK_KEY;
const SHIP_ENGINE_KEY = process.env.SHIP_ENGINE_KEY;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL = process.env.EMAIL;

module.exports = {
  NODE_ENV,
  DB_URI,
  PORT,
  SESSION_SECRET_KEY,
  SHIP_ENGINE_KEY,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_KEY,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
  EMAIL,
};
