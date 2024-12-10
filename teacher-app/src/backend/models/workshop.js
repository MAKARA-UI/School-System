const mongoose = require("mongoose");

const WorkshopSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    date: { type: Date, required: true },
    teacherId: { type: String, required: true },
});

module.exports = mongoose.model("Workshop", WorkshopSchema);
