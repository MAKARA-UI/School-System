const mongoose = require('mongoose');

// Define the report schema
const reportSchema = new mongoose.Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
