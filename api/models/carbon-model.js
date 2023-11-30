/**
 * Mongoose schema definition for the Carbon model.
 *
 * This schema defines the structure of the Carbon document, which is used to track the carbon emissions of a user.
 * It includes a 'userId' field that references the User model and ensures uniqueness. The schema contains an array
 * of Route documents, each capturing individual carbon emission entries, and a field for the total carbon emissions.
 * The 'totalCo2E' field is initialized with a default value.
 *
 * The schema also includes options for timestamps, allowing Mongoose to automatically add `createdAt` and `updatedAt` fields.
 *
 * @fileoverview Mongoose schema definition for the Carbon model in a Node.js application.
 * @author [Connor Johnson]
 */

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
