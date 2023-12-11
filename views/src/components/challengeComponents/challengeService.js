// ChallengeService.js
import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL; // Make sure this is set in your .env file

const fetchActiveChallenges = async (userId) => {
  return await axios.get(`${baseURL}/api/challenges/active/${userId}`);
};

const addChallenge = async (userId, challengeId) => {
  return await axios.post(`${baseURL}/api/challenges/add`, { userId, challengeId });
};

const removeChallenge = async (userId, challengeId) => {
  return await axios.post(`${baseURL}/api/challenges/remove`, { userId, challengeId });
};

export default {
  fetchActiveChallenges,
  addChallenge,
  removeChallenge,
};