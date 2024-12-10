const express = require('express');
const router = express.Router();
const { Report } = require('../server/student'); // Correct import of Report model

// GET /api/report
router.get('/', async (req, res) => {
  try {
    const report = await Report.findOne(); // Fetch the first report
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
