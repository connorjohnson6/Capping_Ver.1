import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { VStack, HStack, StackDivider, Text } from '@chakra-ui/react'; // Adjust imports based on your setup
import './ranking.css';
import { AuthContext } from "../../context/AuthContext";

export default function Ranking({ ranking }) {
  const [usersGoals, setUsersGoals] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsersGoalsAndEmissions = async () => {
      const combinedUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users/allUsersGoalsAndEmissions`;

      try {
        const response = await axios.get(combinedUrl);
        const combinedData = response.data;

        const sortedUsers = combinedData.sort((a, b) => {
          const progressA = a.goal > 0 ? (a.totalCo2E / a.goal) * 100 : 0;
          const progressB = b.goal > 0 ? (b.totalCo2E / b.goal) * 100 : 0;
          return progressB - progressA;
        });

        setUsersGoals(sortedUsers);
      } catch (error) {
        console.error('Error fetching combined users goals and emissions:', error);
      }
    };

    if (currentUser && currentUser._id) {
      fetchUsersGoalsAndEmissions();
    }
  }, [currentUser]);

  const calculateProgress = (goal, emissions) => {
    const progress = goal > 0 ? (emissions / goal) * 100 : 0;
    return progress;
  };

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
      className="leaderboard-container"
    >
      <Text fontWeight="bold" fontSize="2xl" alignSelf="center" p={4}>
        Leaderboard
      </Text>
      {usersGoals.map((user, index) => {
        const progress = calculateProgress(user.goal, user.totalCo2E);

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
