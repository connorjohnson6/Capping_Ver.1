import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Input, Text, Select, useToast } from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext';

function SetGoal() {
  const [goal, setGoal] = useState('');
  const [unit, setUnit] = useState('kg');
  const [isGoalSet, setIsGoalSet] = useState(false);
  const [currentEmissions, setCurrentEmissions] = useState(0); // Added state
  const { user: currentUser } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL_GOALS}/checkGoal/${currentUser._id}`);
        if (response.data.hasGoal) {
          setIsGoalSet(true);
          const goalDetails = await axios.get(`${process.env.REACT_APP_BACKEND_URL_GOALS}/${currentUser._id}`);
          setGoal(goalDetails.data.goal);
          setUnit(goalDetails.data.unit || 'kg');
          setCurrentEmissions(goalDetails.data.emissions); // Assume the response includes emissions
        }
      } catch (error) {
        console.error('Error fetching goal:', error);
      }
    };
  
    if (currentUser && currentUser._id) {
      fetchGoal();
    }
  }, [currentUser]);

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL_GOALS}`, {
        userId: currentUser._id,
        goal: goal,
        unit: unit
      });
      setIsGoalSet(true);
      setCurrentEmissions(response.data.emissions); // Assume the response includes emissions
    } catch (error) {
      console.error('Error setting goal:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL_GOALS}/${currentUser._id}`, {
        goal: goal,
        unit: unit
      });
      toast({
        title: 'Goal updated.',
        description: "Your goal has been successfully updated.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const progress = currentEmissions && goal ? (currentEmissions / goal) * 100 : 0;


  return (
    <Flex direction="column" alignItems="center" m={4}>
      {isGoalSet ? (
        <>
          <Text fontSize="2xl" mb={2}>{currentUser.username}'s Goal</Text>
          <Text fontSize="lg">Current Emissions: {currentEmissions}{unit}</Text>
          <Text fontSize="lg" mb={4}>Goal: {goal}{unit}</Text>
          <Box width="100%" bg="gray.200" rounded="md" mb={4}>
            <Box width={`${progress}%`} bg="green.500" rounded="md" p={1}>
              <Text fontSize="sm" textAlign="center" color="white">{progress.toFixed(0)}%</Text>
            </Box>
          </Box>
          {/* Update goal form */}
        </>
      ) : (
        <>
          <Text fontSize="xl" mb={4}>Set Your Carbon Emissions Goal</Text>
          {/* Set goal form */}
        </>
      )}
      <Box
        p={4}
        borderRadius='lg'
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
        mb={4}
      >
        <Flex justifyContent='space-between' alignItems='center'>
          <Input 
            type='number' 
            placeholder='Enter your goal' 
            value={goal} 
            onChange={handleGoalChange} 
            required
          />
          <Select ml={4} onChange={handleUnitChange} value={unit}>
            <option value="kg">kg</option>
            {/* Add more options if needed */}
          </Select>
          <Button 
            ml={4} 
            colorScheme='green'
            onClick={isGoalSet ? handleUpdate : handleSubmit}
            minWidth="120px"
          >
            {isGoalSet ? "Update Goal" : "Set Goal"}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
  }


export default SetGoal;
