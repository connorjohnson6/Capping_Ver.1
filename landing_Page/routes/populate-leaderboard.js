// In your server file (e.g., app.js or index.js)
const express = require('express');
const router = express.Router();
const Goals = require('../models/user-model');

router.get('/leaderboard', async (req, res) => {
    try {
        // Assuming you have a Goals model with 'username' and 'progress' fields
        const leaderboardData = await Goals.find({}, 'username progress').sort({ progress: -1 });

        res.json(leaderboardData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve leaderboard data' });
    }
});

module.exports = router;
