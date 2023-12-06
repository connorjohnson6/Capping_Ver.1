/**
 * Mongoose schema definition for the Event model.
 *
 * This schema defines the structure of the Event document, which includes fields for the user ID (as a reference to the User model),
 * and an array of event details. Each event detail includes an event ID, type, date, title, and group. The `userId` field uses ObjectId to reference the User model
 * and is unique to ensure only one document per user. The `events` array stores multiple events with their specific details. 
 * The schema is equipped with options for timestamps, enabling Mongoose to automatically add `createdAt` and `updatedAt` fields to each event document.
 *
 * @fileoverview Mongoose schema definition for the Event model in a Node.js application.
 * @author [Connor Johnson]
 */

 const mongoose = require("mongoose");

 /**
  * Schema definition for an Event.
  * @typedef {Object} EventSchema
  * @property {mongoose.Schema.Types.ObjectId} userId - Unique identifier for the user; references the User model.
  * @property {Array.<EventDetail>} events - Array of events associated with the user.
  * @property {Date} createdAt - Timestamp for when the document was created. Automatically set by Mongoose.
  * @property {Date} updatedAt - Timestamp for when the document was last updated. Automatically set by Mongoose.
  */
 
 /**
  * Represents details of an event.
  * @typedef {Object} EventDetail
  * @property {String} eventId - Unique identifier for the event.
  * @property {String} type - Type or category of the event.
  * @property {String} date - Date of the event.
  * @property {String} title - Title of the event.
  * @property {String} group - Group or organization associated with the event.
  */
 
 /**
  * Event model based on the schema.
  * @type {mongoose.Model}
  */
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
 