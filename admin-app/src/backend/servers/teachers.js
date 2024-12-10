import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Teacher from '../models/teacher.js'; 

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
mongoose.connect('mongodb+srv://mamosamotsie:MAMOSAMOTSIE@hr-management.tzqo2.mongodb.net/school-system?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Routes
app.get('/api/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find(); // Fetch all teachers
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers', error });
  }
});

app.get('/api/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send('Teacher not found');
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/api/teachers', async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body); // Create a new teacher instance
    const savedTeacher = await newTeacher.save(); // Save to the database
    res.status(201).json(savedTeacher);
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(400).json({ message: 'Error adding teacher', error });
  }
});

app.put('/api/teachers/:id', async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Apply schema validation during updates
    );
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(400).json({ message: 'Error updating teacher', error });
  }
});

app.delete('/api/teachers/:id', async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ message: 'Error deleting teacher', error });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
