/**
 * Mongoose schema definition for the Goal model.
 *
 * This schema defines the structure of the Goal document, which includes fields for the user ID (as a reference to the User model),
 * the numeric value of the goal, and the unit of measurement for the goal. The `userId` field uses ObjectId to reference the User model.
 * The schema is equipped with options for timestamps, enabling Mongoose to automatically add `createdAt` and `updatedAt` fields to each goal document.
 *
 * @fileoverview Mongoose schema definition for the Goal model in a Node.js application.
 * @author [Connor Johnson]
 */

const mongoose = require("mongoose");

// Inside goal-model.js
const GoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Changed to ObjectId
    required: true,
    ref: 'User' // Reference to the User model
  },
  goal: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
    default: 'kg'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Goal', GoalSchema);

