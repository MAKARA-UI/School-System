const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Teacher = require("./models/teacher"); // Adjust the path if needed

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mamosamotsie:MAMOSAMOTSIE@hr-management.tzqo2.mongodb.net/school-system?retryWrites=true&w=majority&appName=HR-management', {})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Routes

// Get all teachers
app.get("/api/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: "Error fetching teachers" });
  }
});

// Get a single teacher by ID
app.get("/api/teachers/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ error: "Error fetching teacher" });
  }
});

// Update a teacher by ID
app.put("/api/teachers/:id", async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body, // Ensure input validation before using this in production
      { new: true, runValidators: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ error: "Error updating teacher" });
  }
});

// Server Initialization
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
