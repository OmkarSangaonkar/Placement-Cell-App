// Importing necessary modules and models
const fs = require("fs");
const path = require("path");
const Student = require("../models/student");

// Exporting an asynchronous function that downloads a CSV report of all students

module.exports.downloadCSVReport = async function (req, res) {
  try {
    // Finding all students in the database
    const allStudents = await Student.find({});

    // Initializing the CSV report with column headers
    let report =
      "student Id, Student name,Student college, Student email, Student status, DSA Final Score, WebD Final Score, React Final Score, Interview date, Interview company, Interview result";
    let studentData1 = "";

    // Looping through each student's data
    for (let student of allStudents) {
      studentData1 =
        student.id +
        "," +
        student.name +
        "," +
        student.college +
        "," +
        student.email +
        "," +
        student.placement_status +
        "," +
        student.dsa_score +
        "," +
        student.webdev_score +
        "," +
        student.react_score;

      // If a student has interviews, loop through each interview and add it to the report
      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          let studentData2 = "";
          studentData2 +=
            "," +
            interview.date.toString() +
            "," +
            interview.company +
            "," +
            interview.result;
          report += "\n" + studentData1 + studentData2;
        }
      }
    }

    // Writing the report to a CSV file in the "uploads" directory
    const csvFile = fs.writeFile(
      "uploads/studentsReport.csv",
      report,
      function (err, data) {
        if (err) {
          console.log(err);
          return res.redirect("back");
        }
        return res.download("uploads/studentsReport.csv");
      }
    );
  } catch (err) {
    console.log(err);
  }
};
