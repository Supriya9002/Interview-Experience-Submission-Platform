import Submission from "./submission.schema.js";
import jwt from "jsonwebtoken";

export default class SubmissionController {
  // Create Submission
  async createSubmission(req, res) {
    try {
      const { name, country, company, questions } = req.body;
      const userId = req.userID;

      const newSubmission = new Submission({
        name,
        country,
        company,
        questions,
        userId,
      });
      await newSubmission.save();
      res.status(201).json("Submission created successfully!");
    } catch (err) {
      console.log(err);
      res.status(500).json(`${err}`);
    }
  }

  // Get all Submissions
  async getAllSubmissions(req, res) {
    try {
      const submissions = await Submission.find().populate('userId', 'name'); // Populate user details
      res.status(200).json(submissions);
    } catch (err) {
      console.log(err);
      res.status(500).json(`${err}`);
    }
  }

  // Get a Single Submission
  async getSubmissionById(req, res) {
    try {
      const { id } = req.params;
      const submission = await Submission.findById(id);
      if (!submission) {
        return res.status(404).json("Submission not found");
      }
      res.status(200).json(submission);
    } catch (err) {
      console.log(err);
      res.status(500).json(`${err}`);
    }
  }

  // Update Submission
  async updateSubmission(req, res) {
    try {
      const { id } = req.params;
      const { name, country, company, questions } = req.body;

      const submission = await Submission.findById(id);
      if (!submission) {
        return res.status(404).json("Submission not found");
      }
      if (submission.userId.toString() !== req.userID) {
        return res.status(403).json("You can only update your own submission");
      }

      submission.name = name || submission.name;
      submission.country = country || submission.country;
      submission.company = company || submission.company;
      submission.questions = questions || submission.questions;
      submission.updatedAt = Date.now();

      await submission.save();
      res.status(200).json("Submission updated successfully!");
    } catch (err) {
      console.log(err);
      res.status(500).json(`${err}`);
    }
  }

  // Delete Submission
  async deleteSubmission(req, res) {
    try {
      const { id } = req.params;

      const submission = await Submission.findById(id);
      console.log(id, submission)
      if (!submission) {
        return res.status(404).json("Submission not found");
      }
      if (submission.userId.toString() !== req.userID) {
        return res.status(403).json("You can only delete your own submission");
      }
      await Submission.deleteOne({ _id: id });
      res.status(200).json("Submission deleted successfully!");
    } catch (err) {
      console.log(err);
      res.status(500).json(`${err}`);
    }
  }
}
