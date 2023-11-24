const express = require('express');
const router = express.Router();
const Goals = require('../models/user-model'); 

router.post('/update-goal', async (req, res) => {
    const userId = req.user._id;
    const { goal } = req.body;

    try {
        const updatedGoal = await Goals.findOneAndUpdate(
            { _id: userId },
            { $set: { goal: goal, progress: 0 } }, // Use $set to update specific fields
            { new: true, upsert: true }
        );

        res.json({ success: true, updatedGoal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to update the goal' });
    }
});


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