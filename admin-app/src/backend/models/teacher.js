import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  teacherID:{
    type:String,
    required: true,

  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{11}$/, 'Phone number must be exactly 11 digits'],
  },
  department: {
    type: String,
    required: true,
  },
  subjects: {
    type: [String], // Array of subjects
    required: true,
  },
});

// Middleware to process subjects input
teacherSchema.pre('save', function (next) {
  if (typeof this.subjects === 'string') {
    this.subjects = this.subjects.split(',').map((subject) => subject.trim());
  }
  next();
});

teacherSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (typeof update.subjects === 'string') {
    update.subjects = update.subjects.split(',').map((subject) => subject.trim());
    this.setUpdate(update);
  }
  next();
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
