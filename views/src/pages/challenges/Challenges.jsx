// Challenges.jsx
import React, { useState } from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import originalChallengesData from '../../components/challengeComponents/challengeData';
import ChallengeService from '../../components/challengeComponents/challengeService'; // Import the new service
import { ChakraProvider, Box, Text, Button, VStack } from "@chakra-ui/react";
import './challenges.css'; 

function Challenges() {
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [challengeStatus, setChallengeStatus] = useState(
    originalChallengesData.availableChallenges.reduce((status, challenge) => {
      status[challenge.id] = false; // Initially, no challenges are added
      return status;
    }, {})
  );

  const handleToggleChallenge = (challengeId) => {
    setChallengeStatus(prevStatus => ({
      ...prevStatus,
      [challengeId]: !prevStatus[challengeId] // Toggle the status
    }));

    setActiveChallenges(prevActiveChallenges => {
      if (prevActiveChallenges.includes(challengeId)) {
        return prevActiveChallenges.filter(id => id !== challengeId); // Remove the challenge
      } else {
        return [...prevActiveChallenges, challengeId]; // Add the challenge
      }
    });
  };

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
