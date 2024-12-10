const express = require("express");
const { createWorkshop, getWorkshops } = require("../controllers/workshopController");

const router = express.Router();

router.post("/", createWorkshop);
router.get("/", getWorkshops);

module.exports = router;
