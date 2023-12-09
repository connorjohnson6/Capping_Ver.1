import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { VStack, HStack, StackDivider, Text } from '@chakra-ui/react';
import './ranking.css';
import { AuthContext } from "../../context/AuthContext";

export default function Ranking({ ranking }) {
  // State to hold user goals and emissions data
  const [usersGoals, setUsersGoals] = useState([]);
  
  // Get the current user from the AuthContext
  const { user: currentUser } = useContext(AuthContext);

  // Effect hook to fetch user goals and emissions data
  useEffect(() => {
    // Function to fetch user goals and emissions data
    const fetchUsersGoalsAndEmissions = async () => {
      // Construct the combined URL for the API endpoint
      const combinedUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users/allUsersGoalsAndEmissions`;

      try {
        // Make a GET request to the API
        const response = await axios.get(combinedUrl);
        // Get the combined data from the response
        const combinedData = response.data;

        // Sort the users based on their progress percentage
        const sortedUsers = combinedData.sort((a, b) => {
          const progressA = a.goal > 0 ? (a.totalCo2E / a.goal) * 100 : 0;
          const progressB = b.goal > 0 ? (b.totalCo2E / b.goal) * 100 : 0;
          return progressB - progressA;
        });

        // Update the state with the sorted user data
        setUsersGoals(sortedUsers);
      } catch (error) {
        // Log an error if there's an issue with the API request
        console.error('Error fetching combined users goals and emissions:', error);
      }
    };

    // Fetch data only if a user is logged in
    if (currentUser && currentUser._id) {
      fetchUsersGoalsAndEmissions();
    }
  }, [currentUser]);

  // Function to calculate progress percentage
  const calculateProgress = (goal, emissions) => {
    const progress = goal > 0 ? (emissions / goal) * 100 : 0;
    return progress;
  };

  // JSX rendering
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
      className="leaderboard-container"
    >
      {/* Leaderboard title */}
      <Text fontWeight="bold" fontSize="2xl" alignSelf="center" p={4}>
        Leaderboard
      </Text>
      
      {/* Map through each user and display their information */}
      {usersGoals.map((user, index) => {
        // Calculate progress percentage for each user
        const progress = calculateProgress(user.goal, user.totalCo2E);

        // Render user information
        return (
          <HStack key={index} p={4} justify="space-between" align="center" className="leaderboard-entry">
            <VStack align="start" spacing={1} width="100%">
              <Text fontWeight="bold">{user.username}</Text>
              <Text fontSize="sm">{user.city}</Text>
              <Text fontWeight="semibold">Emissions: {parseFloat(user.totalCo2E).toFixed(2)}</Text>
              <Text fontWeight="semibold">Goal: {user.goal}</Text>
              <Text fontSize="xs" color="gray.600">
                Progress: {progress.toFixed(0)}%
              </Text>
              {/* Progress bar */}
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
            </VStack>
          </HStack>
        );
      })}
    </VStack>
  );
}
