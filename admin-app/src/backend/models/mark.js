import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the student
    ref: 'Student', // Assuming you have a `Student` model
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  marksObtained: {
    type: Number,
    required: true,
    min: 0,
    max: 100, // Adjust based on your grading scale
  },
  totalMarks: {
    type: Number,
    required: true,
    default: 100,
  },
  grade: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D', 'E', 'F'], // Assuming standard grading
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the teacher
    ref: 'Teacher', // Assuming you have a `Teacher` model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set the date when marks are entered
  },
});

// Pre-save middleware to calculate the grade based on marks
marksSchema.pre('save', function (next) {
  const percentage = (this.marksObtained / this.totalMarks) * 100;

  if (percentage >= 90) {
    this.grade = 'A';
  } else if (percentage >= 80) {
    this.grade = 'B';
  } else if (percentage >= 70) {
    this.grade = 'C';
  } else if (percentage >= 60) {
    this.grade = 'D';
  } else if (percentage >= 50) {
    this.grade = 'E';
  } else {
    this.grade = 'F';
  }

  next();
});

const Marks = mongoose.model('Marks', marksSchema);

export default Marks;
