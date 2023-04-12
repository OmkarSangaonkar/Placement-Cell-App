// Importing the Mongoose library
const mongoose = require("mongoose");

// Defining the interview schema for the database
const interviewSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student", // Reference to the Student model
        },
        result: {
          type: String,
          enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"],
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically add "createdAt" and "updatedAt" fields to documents
  }
);

const Interview = new mongoose.model("Interview", interviewSchema);

module.exports = Interview;
