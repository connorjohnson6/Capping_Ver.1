/**
 * Mongoose schema definition for the Post model.
 *
 * This schema defines the structure of the Post document, which includes fields for the user ID of the post creator,
 * a description, an image, and a list of likes. The likes field is an array, which will store the user IDs of those who liked the post.
 *
 * The schema also includes options for timestamps, which Mongoose will use to automatically add `createdAt` and `updatedAt` fields to each post document.
 *
 * @fileoverview Mongoose schema definition for the Post model in a Node.js application.
 * @author [Connor Johnson]
 */

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);