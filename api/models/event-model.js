const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true // Ensures there's only one document per user
  },
  events: [{
    eventId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    group: {
      type: String,
      required: true
    }
  }]
},
{ timestamps: true });

module.exports = mongoose.model("Event", EventSchema);
