const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student");
 
require("dotenv").config();
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });
 
app.get("/", (req, res) => {
  res.send("Server is running!");
});
 
 
 
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving students" });
  }
});
 
 
 
app.post("/students", async (req, res) => {
  try {
    const student = new Student({
      name: req.body.name,
      course: req.body.course,
      age: req.body.age,
    });
 
    await student.save();
 
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error adding student" });
  }
});
 
 
 
 
app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        course: req.body.course,
        age: req.body.age,
      },
      { new: true, runValidators: true }
    );
 
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
 
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
  }
});
 
 
 
 
app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
 
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
 
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
});
 
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});