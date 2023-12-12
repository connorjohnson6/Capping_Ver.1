// For future MongoDB compatibility, this file applies a framework schema for user-specific active challenge list
const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  activeChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
  // Include any other relevant fields for a challenge
});

module.exports = mongoose.model('UserChallenge', challengeSchema);
