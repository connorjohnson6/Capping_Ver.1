const express = require('express');
const router = express.Router();
const CarbonModel = require('../models/carbon-model'); 

// POST endpoint to add carbon data
router.post('/', async (req, res) => {
  const { userId, co2E } = req.body;

  try {
    const newCarbonData = new CarbonModel({
      userId,
      co2E
    });

    const savedData = await newCarbonData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
