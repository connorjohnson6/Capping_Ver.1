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

