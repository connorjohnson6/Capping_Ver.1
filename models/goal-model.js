const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    goal: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("goals", GoalSchema);
