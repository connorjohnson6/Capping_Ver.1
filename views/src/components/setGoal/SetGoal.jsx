import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Input, Text, Select } from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext';

function SetGoal() {
  const [goal, setGoal] = useState('');
  const [unit, setUnit] = useState('kg');
  const [isGoalSet, setIsGoalSet] = useState(false);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const checkUserGoal = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL_GOALS}/checkGoal/${currentUser._id}`);
        if (response.data.hasGoal) {
          setIsGoalSet(true);
        }
      } catch (error) {
        console.error('Error checking goal:', error);
      }
    };
  
    if (currentUser && currentUser._id) {
      checkUserGoal();
    }
  }, [currentUser]);
  

  const handleGoalChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setGoal(value);
    }
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL_GOALS, {
        userId: currentUser._id,
        goal: goal
      });
      setIsGoalSet(true); // Update state to reflect that the goal is now set
      localStorage.setItem('goalSet', 'true'); // Set goal status in localStorage
    } catch (error) {
      console.error('Error setting goal:', error);
    }
  };
  

  if (isGoalSet) {
    return <h1>New Page</h1>; 
  }

  return (
    <Flex direction="column" alignItems="center" m={4}>
      <Text fontSize="xl" mb={4}>Enter Your Desired Carbon Emissions Goal</Text>
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
            onClick={handleSubmit}
            minWidth="120px"
          >
            Set Goal
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default SetGoal;
