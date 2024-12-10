const mongoose = require('mongoose');

// Define the records schema
const recordSchema = new mongoose.Schema({
  description: { type: String, required: true },
  grade: { type: String, required: true },
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
