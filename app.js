const express = require("express");
const studentData = require("./studentData");

const app = express();

app.get("/", (request, response) => {
  response.status(200).json({ data: "Server is running!", other: app });
});

app.get("/students", (request, response) => {
  try {
    const { students } = studentData;
    response.status(200).json({ data: students });
  } catch (err) {
    response.status(500).json({ data: err.message });
  }
});

app.get("students/:id", (request, response) => {
  try {
    const { id } = response.params;
    const { students } = studentData;
    const student = students.find((student) => student.id === id);
    if (students) {
      response.status(200).json({ data: student });
    } else {
      response.status(404).json({ data: `Student ${id} not found.` });
    }
  } catch (err) {
    response.status(500).json({ data: err.message });
  }
});

module.exports = app;
