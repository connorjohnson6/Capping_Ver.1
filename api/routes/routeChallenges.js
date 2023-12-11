// challenges-routes.js
import { challengeSchema } from '../models/challenge-model.js';
const router = require("express").Router();
const Challenge = require("../models/challenge-model"); // This would be your model for challenges

// Endpoint to add a challenge to a user's active list
router.post("/add", async (req, res) => {
  try {
    const { userId, challengeId } = req.body;
    // Logic to add the challengeId to the user's active challenges
    // This could involve finding the user and updating their document with the new challengeId

    res.status(200).json({ message: "Challenge added successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Endpoint to remove a challenge from a user's active list
router.post("/remove", async (req, res) => {
  try {
    const { userId, challengeId } = req.body;
    // Logic to remove the challengeId from the user's active challenges
    // This could involve finding the user and updating their document to remove the challengeId

    res.status(200).json({ message: "Challenge removed successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Endpoint to fetch a user's active challenges
router.get("/active/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // Logic to retrieve the user's active challenges
    // This could involve finding the user and returning their active challenges

    res.status(200).json({ /* ...user's active challenges... */ });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
