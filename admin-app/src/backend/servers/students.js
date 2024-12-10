import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Create Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas (directly with your connection string)
mongoose.connect('mongodb+srv://mamosamotsie:MAMOSAMOTSIE@hr-management.tzqo2.mongodb.net/school-system?retryWrites=true&w=majority&appName=HR-management', {})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Define the Student schema
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  studentID: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  year: {
    type: Number,
    required: [true, "Year of study is required"],
    min: [1, "Year must be at least 1"],
    max: [6, "Year must not exceed 6"],
  },
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

// Routes for Students
// Fetch all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();  // Fetch all students
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// Fetch a specific student by studentID
app.get("/api/students/:studentID", async (req, res) => {
  try {
    const student = await Student.findOne({ studentID: req.params.studentID }); // Search by studentID
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Error searching for student:", error);
    res.status(500).json({ message: "Error searching for student", error });
  }
});

// Add a new student
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = new Student(req.body);  // Create a new student instance
    await newStudent.save();
    res.status(201).json(newStudent);  // Respond with the created student
  } catch (error) {
    res.status(400).json({ message: "Error adding student", error });
  }
});

// Update an existing student
app.put("/api/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: "Error updating student", error });
  }
});

// Delete a student
app.delete("/api/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting student", error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
