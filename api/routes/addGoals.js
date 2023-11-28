const express = require('express');
const router = express.Router();
const GoalModel = require('../models/goal-model'); 

// POST route to set a new goal
router.post('/', async (req, res) => {
  const { userId, goal } = req.body;

  try {
    const newGoal = new GoalModel({
      userId,
      goal
    });

    const savedData = await newGoal.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/checkGoal/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const goal = await GoalModel.findOne({ userId: userId }); 
    if (goal) {
      res.json({ hasGoal: true });
    } else {
      res.json({ hasGoal: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;