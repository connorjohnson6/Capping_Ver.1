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
