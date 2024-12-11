import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Announcement from "../models/announcement.js"; // Import the Announcement model

// Create Express app
const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://mamosamotsie:MAMOSAMOTSIE@hr-management.tzqo2.mongodb.net/school-system?retryWrites=true&w=majority&appName=HR-management', {})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

/**
 * Routes for Announcements
 */

// Fetch all announcements (with teacher details populated)
app.get("/api/announcements", async (req, res) => {
  try {
    const announcements = await Announcement.find().populate("teacherID", "firstName lastName");
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Error fetching announcements", error });
  }
});

// Fetch a specific announcement by ID (with teacher details populated)
app.get("/api/announcements/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate("teacherID", "firstName lastName");
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(announcement);
  } catch (error) {
    console.error("Error fetching announcement:", error);
    res.status(500).json({ message: "Error fetching announcement", error });
  }
});

// Create a new announcement
app.post("/api/announcements", async (req, res) => {
  const { teacherID, message } = req.body;

  try {
    const newAnnouncement = new Announcement({
      teacherID,
      message,
    });

    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(400).json({ message: "Error creating announcement", error });
  }
});

// Update an existing announcement
app.put("/api/announcements/:id", async (req, res) => {
  const { teacherID, message } = req.body;

  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { teacherID, message },
      { new: true, runValidators: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(400).json({ message: "Error updating announcement", error });
  }
});

// Delete an announcement
app.delete("/api/announcements/:id", async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ message: "Error deleting announcement", error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
