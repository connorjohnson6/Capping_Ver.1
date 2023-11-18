const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalsSchema = new Schema({
    username: String,
    goal: {
        type: String
    },
    progress: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Goals = mongoose.model('Goals', goalsSchema);

module.exports = Goals;