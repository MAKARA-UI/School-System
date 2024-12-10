const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    // Basic Information
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{11}$/, "Phone number must be exactly 11 digits"], // Regex ensures only 11 digits
    },

    // Enrollment Details
    enrollmentNumber: {
      type: String,
      required: [true, "Enrollment number is required"],
      unique: true,
      trim: true,
    },
    course: {
      type: String,
      required: [true, "Course is required"],
    },
    year: {
      type: Number,
      required: [true, "Year of study is required"],
      min: [1, "Year must be at least 1"],
      max: [6, "Year must not exceed 6"],
    },

    // Marks
    marks: [
      {
        subject: { type: String, required: [true, "Subject is required"] },
        score: { 
          type: Number,
          required: [true, "Score is required"],
          min: [0, "Score cannot be negative"],
          max: [100, "Score cannot exceed 100"]
        },
      },
    ],

    // Metadata
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields.
  }
);

// Middleware to validate phone number and trim strings
studentSchema.pre("save", function (next) {
  // Normalize phone by removing spaces or dashes, if any (optional)
  this.phone = this.phone.replace(/\s+/g, "").replace(/-/g, "");
  
  // Update 'updatedAt' automatically
  this.updatedAt = Date.now();
  next();
});

// Middleware to handle 'marks' validation explicitly if needed
studentSchema.pre("validate", function (next) {
  if (this.marks && this.marks.length > 0) {
    for (const mark of this.marks) {
      if (!mark.subject || !mark.score) {
        return next(new Error("Marks must have both subject and score defined."));
      }
    }
  }
  next();
});

// Model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
