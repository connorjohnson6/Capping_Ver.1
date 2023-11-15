const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalsSchema = new Schema({
    // userId: {
    //     type: String,
    //     required: true,
    //     ref: 'User'
    // },
    goal: {
        type: Number
    },
    progress: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Create the Goals model
const Goals = mongoose.model('Goals', goalsSchema);

module.exports = {
    Goals
};