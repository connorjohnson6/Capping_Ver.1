const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema({
  co2E: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  }
});

const CarbonSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true // Ensure there's only one Carbon document per user
  },
  routes: [RouteSchema], // Array of route documents
  totalCo2E: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    default: 0.00, // Default value if you want to initialize total CO2 emission
  }
},
{ timestamps: true });

module.exports = mongoose.model("carbon", CarbonSchema);
