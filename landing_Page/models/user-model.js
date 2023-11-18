const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
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
    profilePicture:{
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
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    goal: {
        type: String
    },
    progress: {
        type: Number,
        default: 0
    }

},
{timestamps: true}
);

const User = mongoose.model('user', userSchema);

module.exports = User;
