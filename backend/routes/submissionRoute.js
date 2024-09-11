// Express Router
const submissionRouter = require("express").Router();

// Controllers
const { submissionController } = require("../controllers/index");

const { createSubmission } = submissionController;

// Contact Form Submission Route
submissionRouter.post("/", createSubmission);

module.exports = submissionRouter;
