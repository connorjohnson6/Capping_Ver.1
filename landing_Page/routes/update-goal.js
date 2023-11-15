const express = require('express');
const router = express.Router();
const Goals = require('../models/goals-model'); // Import your 'goals' model

router.post('/api/update-goal', async (req, res) => {
    //const userId = req.user._id; // Assuming you have user authentication
    console.log("woowaa")
    const goal  = req.body;
    console.log(goal)
    
    try {
        // Update the user's goal in the 'goals' collection
        const updatedGoal = await Goals.findOneAndUpdate(
            //{ userId },
            { goal, progress: 0 },
            { new: true, upsert: true }
        );

        res.json({ success: true, updatedGoal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to update the goal' });
    }
});

module.exports = router;