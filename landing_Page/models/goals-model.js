const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalsSchema = new Schema({
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User', // Reference to the User model
    //     required: true
    // },
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