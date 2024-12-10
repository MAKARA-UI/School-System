const express = require('express');
const router = express.Router();
const { Record } = require('../server/student'); // Correct import of Record model

// GET /api/records
router.get('/', async (req, res) => {
  try {
    const records = await Record.find(); // Fetch all records
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
