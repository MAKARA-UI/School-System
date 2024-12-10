const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  teacherID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
