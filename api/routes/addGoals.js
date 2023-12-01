/**
 * Express router for goal management operations.
 *
 * This router includes routes for setting new goals, updating existing goals, and checking if a goal
 * exists for a specific user. It uses the GoalModel for database operations related to user goals.
 *
 * @fileoverview Routes for goal management in an Express application.
 * @author [Connor Johnson]
 */

const express = require('express');
const router = express.Router();
const GoalModel = require('../models/goal-model'); 

// POST route to set a new goal
router.post('/', async (req, res) => {
  const { userId, goal, unit } = req.body; // Include unit in the destructuring

  try {
    const newGoal = new GoalModel({
      userId,
      goal,
      unit // Save the unit as well
    });

    const savedData = await newGoal.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update an existing goal
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { goal, unit } = req.body;

  try {
    const updatedGoal = await GoalModel.findOneAndUpdate(
      { userId: userId },
      { goal: goal, unit: unit },
      { new: true }
    );
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check if a goal exists for a user

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