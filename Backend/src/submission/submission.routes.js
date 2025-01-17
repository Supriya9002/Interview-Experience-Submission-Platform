import express from "express";
import SubmissionController from "./submission.controller.js";
import jwtAuth from "../middleware/jwt.middleware.js";

const submissionRouter = express.Router();
const submissionController = new SubmissionController();

// Create a submission 
submissionRouter.post("/", jwtAuth, (req, res) =>
  submissionController.createSubmission(req, res)
);

// Get all submissions (public)
submissionRouter.get("/", (req, res) =>
  submissionController.getAllSubmissions(req, res)
);

// Get a specific submission (public)
submissionRouter.get("/:id", (req, res) =>
  submissionController.getSubmissionById(req, res)
);

// Update a submission 
submissionRouter.put("/:id", jwtAuth, (req, res) =>
  submissionController.updateSubmission(req, res)
);

// Delete a submission
submissionRouter.delete("/:id", jwtAuth, (req, res) =>
  submissionController.deleteSubmission(req, res)
);

export default submissionRouter;
