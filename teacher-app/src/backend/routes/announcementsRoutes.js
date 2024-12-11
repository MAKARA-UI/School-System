const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement');

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new announcement
router.post('/', async (req, res) => {
  const { teacherID, firstName, lastName, message, date } = req.body;

  const newAnnouncement = new Announcement({
    teacherID,
    firstName,
    lastName,
    message,
    date,
  });

  try {
    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an announcement
router.delete('/:id', async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
