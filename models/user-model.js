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
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
