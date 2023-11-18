const mongoose = require("mongoose");

const CarbonSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    co2E: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("carbon", CarbonSchema);
