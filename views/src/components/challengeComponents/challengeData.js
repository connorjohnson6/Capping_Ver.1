import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

// challengesData.js
const challengesData = {
    activeChallenges: [
      // Populate with active challenges
    ],
    completedChallenges: [
      // Populate with completed challenges
    ],
    availableChallenges: [
      {
        id: 1,
        name: 'Reduce December\'s transportation emissions by 8 Tons, or 30%',
        endDate: '12/31/23',
      },
      {
        id: 2,
        name: 'Achieve a monthly emission total below 10 Tons',
        endDate: '12/31/23',
      },
      {
        id: 3,
        name: 'Achieve the perfect day: < 1lb of emissions',
        endDate: '12/31/23',
      },
      // Add more challenges as needed
    ],
  };

  
    
  
  export default challengesData;
  
