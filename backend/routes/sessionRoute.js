// Express Router
const sessionRouter = require("express").Router();

// Controllers
const { sessionController } = require("../controllers/index");

const { regenSession, removeSession } = sessionController;

// Get Session Route
sessionRouter.route("/").put(regenSession).delete(removeSession);

module.exports = sessionRouter;
