/* Main front end file for challenges page. Applies functionality to add/remove challenges. As well as a feature
to save changes to local storage */
import React, { useState, useEffect } from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import originalChallengesData from '../../components/challengeComponents/challengeData';
import ChallengeService from '../../components/challengeComponents/challengeService'; // Import the new service
import { ChakraProvider, Box, Text, Button, VStack } from "@chakra-ui/react";
import './challenges.css'; 

function Challenges() {
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [challengeStatus, setChallengeStatus] = useState(() => {
    // Get the saved challenges from localStorage or default to the initial state
    const saved = localStorage.getItem('challengeStatus');
    const initialValue = saved ? JSON.parse(saved) : originalChallengesData.availableChallenges.reduce((status, challenge) => {
      status[challenge.id] = false;
      return status;
    }, {});
    return initialValue;
  });

  // Update localStorage whenever the challengeStatus changes
  useEffect(() => {
    localStorage.setItem('challengeStatus', JSON.stringify(challengeStatus));
  }, [challengeStatus]);

  const handleToggleChallenge = (challengeId) => {
    setChallengeStatus(prevStatus => {
      const newStatus = {
        ...prevStatus,
        [challengeId]: !prevStatus[challengeId]
      };
      // Update localStorage with the new status
      localStorage.setItem('challengeStatus', JSON.stringify(newStatus));
      return newStatus;
    });

    setActiveChallenges(prevActiveChallenges => {
      const newActiveChallenges = prevActiveChallenges.includes(challengeId) ?
        prevActiveChallenges.filter(id => id !== challengeId) :
        [...prevActiveChallenges, challengeId];
      // Update localStorage with the new active challenges
      localStorage.setItem('activeChallenges', JSON.stringify(newActiveChallenges));
      return newActiveChallenges;
    });
  };

  // Restore active challenges from localStorage on component mount
  useEffect(() => {
    const savedActiveChallenges = localStorage.getItem('activeChallenges');
    if (savedActiveChallenges) {
      setActiveChallenges(JSON.parse(savedActiveChallenges));
    }
  }, []);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <ChakraProvider>
          <Box className="challengesContainer" minW="sm">
            <Text fontSize="2xl" mb="4" mt="3" ml="170">Challenges</Text>
            <Box d="flex" mb="4">
              <Box flex="1" textAlign="center" bg="orange.100" p="4" borderRadius="md" mr="2">
                <Text fontSize="lg" fontWeight="bold">Active</Text>
                <Text fontSize="xl">{activeChallenges.length}</Text>
              </Box>
              <Box flex="1" textAlign="center" bg="green.100" p="4" borderRadius="md" mr="2">
                <Text fontSize="lg" fontWeight="bold">Completed</Text>
                <Text fontSize="xl">0</Text>
              </Box>
            </Box>
            <VStack spacing="4">
              {originalChallengesData.availableChallenges.map(challenge => (
                <Box key={challenge.id} p="4" boxShadow="md" borderRadius="md" bg="gray.50" width="100%">
                  <Text fontWeight="bold">{challenge.name}</Text>
                  <Text mb="2">Ends: {challenge.endDate}</Text>
                  <Button
                    colorScheme={challengeStatus[challenge.id] ? "red" : "green"}
                    variant={challengeStatus[challenge.id] ? "outline" : "solid"}
                    _hover={{
                      bg: challengeStatus[challenge.id] ? "gray.200" : "green.300",
                      color: challengeStatus[challenge.id] ? "gray.600" : "white",
                    }}
                    onClick={() => handleToggleChallenge(challenge.id)}
                  >
                    {challengeStatus[challenge.id] ? "Remove" : "Add"}
                  </Button>
                </Box>
              ))}
            </VStack>
          </Box>
        </ChakraProvider>
        <Rightbar pageType="leaderboard" />
      </div>
    </>
  );
}

export default Challenges;
