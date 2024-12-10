import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import marksRoutes from '../routes/marksRoutes.js'; // Ensure this path is correct

const app = express();
const PORT = 2000;

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

  // Define the marks schema
  const marksSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },
    marksObtained: { type: Number, required: true, min: 0, max: 100 },
    totalMarks: { type: Number, required: true, default: 100 },
    grade: { type: String, required: true, enum: ['A', 'B', 'C', 'D', 'E', 'F'] },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    date: { type: Date, default: Date.now },
  });
  

// Use routes
app.use('/api/marks', marksRoutes); // This should match with frontend calls

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
