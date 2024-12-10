import express from 'express';
import mark from '../models/mark.js';
import Student from '../models/student.js';
import Teacher from '../models/teacher.js'; // Import the Teacher model

const router = express.Router();

// Fetch all marks
router.get('/', async (req, res) => {
  try {
    const marks = await Marks.find()
      .populate('studentId', 'studentID firstName lastName') // Populate student details
      .populate('teacherId', 'firstName lastName'); // Populate teacher details
    res.status(200).json(marks);
  } catch (error) {
    console.error('Error fetching marks:', error);
    res.status(500).json({ message: 'Error fetching marks', error });
  }
});

// Add new marks
router.post('/', async (req, res) => {
  const { studentID, subject, marksObtained, totalMarks, teacherId } = req.body;

  try {
    const student = await Student.findOne({ studentID });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const newMarks = new Marks({
      studentId: student._id,
      subject,
      marksObtained,
      totalMarks,
      teacherId,
    });

    const savedMarks = await newMarks.save();
    res.status(201).json(savedMarks);
  } catch (error) {
    res.status(400).json({ message: 'Error adding marks', error });
  }
});

// Update marks
router.put('/:id', async (req, res) => {
  try {
    const { studentID, subject, marksObtained, totalMarks, teacherId } = req.body;
    const student = await Student.findOne({ studentID });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const updatedMarks = await Marks.findByIdAndUpdate(
      req.params.id,
      {
        studentId: student._id,
        subject,
        marksObtained,
        totalMarks,
        teacherId,
      },
      { new: true, runValidators: true }
    );

    if (!updatedMarks) {
      return res.status(404).json({ message: 'Marks record not found' });
    }

    res.status(200).json(updatedMarks);
  } catch (error) {
    res.status(400).json({ message: 'Error updating marks', error });
  }
});

// Delete marks
router.delete('/:id', async (req, res) => {
  try {
    const deletedMarks = await Marks.findByIdAndDelete(req.params.id);
    if (!deletedMarks) {
      return res.status(404).json({ message: 'Marks record not found' });
    }
    res.status(200).json({ message: 'Marks record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting marks', error });
  }
});

export default router;
