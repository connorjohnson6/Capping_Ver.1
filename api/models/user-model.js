/**
 * Mongoose schema definition for the User model.
 *
 * This schema defines the structure of the User document, including fields for username, email,
 * password, authentication method, profile and cover pictures, follower and following lists, and other
 * personal details. It uses Mongoose for MongoDB interaction.
 *
 * The schema also includes options for timestamps, which Mongoose will use to automatically add `createdAt`
 * and `updatedAt` fields to the document.
 *
 * @fileoverview Mongoose schema definition for the User model in a Node.js application.
 * @author [Connor Johnson]
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 6,
      },
    googleId: String,
    registrationType: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    profilePicture:{
        type: String,
        default: ""
    },
    coverPicture:{
        type: String,
        default: ""
    },
    followers:{
        type: Array,
        default:[]
    },
    followings:{
        type: Array,
        default:[]
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    desc:{
        type: String,
        max: 50,
        default: ""
    },
    city: {
        type: String,
        max: 50,
        default: ""
    },
    from: {
        type: String,
        max: 50,
        default: ""
    }

},
{timestamps: true}
);

const User = mongoose.model('user', userSchema);

module.exports = User;