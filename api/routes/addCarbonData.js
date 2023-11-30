/**
 * Express router for carbon data management.
 *
 * This router handles the addition of new carbon emission data entries for users.
 * It uses the CarbonModel to interact with the database, storing user-specific carbon emission data.
 *
 * @fileoverview Route for adding carbon data entries in an Express application.
 * @author [Connor Johnson]
 */

const express = require('express');
const router = express.Router();
const CarbonModel = require('../models/carbon-model');

// POST endpoint to add carbon data
router.post('/', async (req, res) => {
  const { userId, co2E } = req.body;

  try {
    // Find the carbon document for the user
    let carbonData = await CarbonModel.findOne({ userId });

    // If it doesn't exist, create it
    if (!carbonData) {
      carbonData = new CarbonModel({ userId, routes: [], totalCo2E: 0.00 });
    }

    // Convert Decimal128 to a number and add it to totalCo2E
    let totalCo2E = parseFloat(carbonData.totalCo2E.toString());
    totalCo2E += parseFloat(co2E);

    // Add the new route to the routes array
    carbonData.routes.push({ co2E });
    carbonData.totalCo2E = totalCo2E;

    // Save the updated document
    const savedData = await carbonData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
