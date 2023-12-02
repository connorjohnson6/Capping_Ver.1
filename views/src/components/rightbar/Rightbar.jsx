import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {useToast, VStack, HStack, Text, StackDivider, Box } from '@chakra-ui/react';


export default function Rightbar({ user, pageType, emissionsData }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [isGoalSet, setIsGoalSet] = useState(false);
  const toast = useToast();
  const [addedRoutes, setAddedRoutes] = useState(new Set()); // Using a Set to store added route indexes
  const [userRoutes, setUserRoutes] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser && currentUser.followings ? currentUser.followings.includes(user?.id) : false
  );


  useEffect(() => {
    const checkUserGoal = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL_GOALS}/checkGoal/${currentUser._id}`);
        setIsGoalSet(response.data.hasGoal);
      } catch (error) {
        console.error('Error checking goal:', error);
      }
    };
  
    if (currentUser && currentUser._id) {
      checkUserGoal();
    }
  }, [currentUser]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  useEffect(()=>{
    const getActivities = async () => {
      try {
        //const activities = await axios.get("/users/userCarbons/" + currentUser._id);
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/userCarbons/${user._id}`;
        const activities = await axios.get(url);
        console.log("-------------------------------");
        // Assuming activities.data.routes is your array of objects
        const routesArray = activities.data.routes.map((route) => {//for whatever reason this is some how an array of characters so this weirdness is required
          let charArray = Object.values(route["$numberDecimal"]);
          let valueStr = charArray.join('');
          return parseFloat(valueStr);
        });
        console.log(routesArray);

        setUserRoutes(routesArray);
      } catch(err){}
    };
    getActivities();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="goalImg" src="assets/celebration.png" alt="" />
          <span className="goalText">
            <b>Pola Foster</b> and <b>3 other friends</b> have completed their goals for the month!
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad1.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {

    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            {followed ? "Unfollow" : "Follow"}
            {followed ? <span className="material-symbols-outlined">person_remove</span> : <span className="material-symbols-outlined">person_add</span>}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
        
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
        <h4 className="rightbarTitle">Past Activities</h4>
        <div className="rightbarFollowings">
          {userRoutes.map((route) => (
            <Box
              p={4}
              borderRadius="8"
              bgColor='lightgrey'
              shadow="base"
              minW='container.md'
              zIndex='1'
              
              mb={4}>
                {route} kg CO2e
            </Box>
          ))}
        </div>
      </>
    );
  };



  const handleAddRoute = async (data, index) => {
    const userId = currentUser._id;
    const co2E = data.co2e;
  
    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL_CARBON, { userId, co2E });
      console.log('Route added successfully');
  
      // Update the state to include the index of the added route
      setAddedRoutes(prev => new Set(prev).add(index));
  
      // Provide feedback to the user
      toast({
        title: 'Success',
        description: 'Route added to your profile.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding route:', error);
    }
  };
  

  const CalculationsRightbar = ({ emissionsData }) => {

    if (!emissionsData.length) {
      return <div>No route calculations yet.</div>;
    }
  
    return (
      <>
      <h4 className="rightbarTitle">Emissions Data</h4>
      {emissionsData.map((data, index) => {
        if (addedRoutes.has(index)) return null; // Do not render routes that have been added

        return (
          <div key={index} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <div style={{ fontWeight: "bold" }}>Route #{index + 1}</div>
            <div>Method: {data.method}</div> 
            <div>Origin: {data.origin.name}</div>
            <div>Destination: {data.destination.name}</div>
            <div>Direct Emissions: {data.direct_emissions.co2e} {data.direct_emissions.co2e_unit}</div>
            <div>Indirect Emissions: {data.indirect_emissions.co2e} {data.indirect_emissions.co2e_unit}</div>

            <button 
              onClick={() => handleAddRoute(data, index)} // Pass the index as well
              style={{ backgroundColor: "#38a169", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}
              disabled={addedRoutes.has(index)} // Disable the button if the route has been added
            >
              Add Route
            </button>
            
            </div>
          );
        })}
      </>
    );
  };


  const GoalsRightbar = () => {
    const [usersGoals, setUsersGoals] = useState([]);
    const { user: currentUser } = useContext(AuthContext);
    
    useEffect(() => {
      const fetchUsersGoalsAndEmissions = async () => {
        const combinedUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users/allUsersGoalsAndEmissions`;
      
        try {
          const response = await axios.get(combinedUrl);
          const combinedData = response.data;
      
          setUsersGoals(combinedData);
        } catch (error) {
          console.error('Error fetching combined users goals and emissions:', error);
        }
      };
    
      if (currentUser && currentUser._id) {
        fetchUsersGoalsAndEmissions();
      }
    }, [currentUser]);
    
    const calculateProgress = (goal, emissions) => {
      const progress = goal > 0 ? (emissions / goal) * 100 : 0; // Calculates the percentage
      console.log(`Progress for goal ${goal} and emissions ${emissions}:`, progress);
      return progress;
    };
  
    if (!isGoalSet) {
      return <div>Set a goal to see the leaderboard.</div>;
    }
  
    return (
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
        <Text fontWeight="bold" fontSize="2xl" alignSelf="center" p={4}>Others Goals </Text>
        {usersGoals.map((user, index) => {
          const progress = calculateProgress(user.goal, user.totalCo2E);
  
          return (
            <HStack key={index} p={4} justify="space-between" align="center">
              <img
                src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                alt=""
                className="rightbarFollowingImg"
              />
              <VStack align="start" spacing={1} width="100%">
                <Text fontWeight="bold">{user.username}</Text>
                <Text fontSize="sm">{user.city}</Text>
                <Text fontWeight="semibold">
                  Emissions: {parseFloat(user.totalCo2E).toFixed(2)}
                </Text>
                <Text fontWeight="semibold">
                  Goal: {user.goal}
                </Text>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <Text fontSize="xs" color="gray.600">
                  {progress.toFixed(0)}%
                </Text>
              </VStack>
            </HStack>
          );
        })}
      </VStack>
    );
  };
  
  
  const LeaderboardRightbar = () => {
    const [usersGoals, setUsersGoals] = useState([]);
    const { user: currentUser } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchUsersGoalsAndEmissions = async () => {
        const combinedUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users/allUsersGoalsAndEmissions`;
  
        try {
          const response = await axios.get(combinedUrl);
          const combinedData = response.data;
  
          // Sort users based on progress (descending order)
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
  
    const calculateChallengesCompleted = (progress) => {
      // Calculate the number of challenges completed based on every 10% progress
      const challengesCompleted = Math.floor(progress / 10);
      return challengesCompleted;
    };
  
    return (
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
        <Text fontWeight="bold" fontSize="2xl" alignSelf="center" p={4}>
          Challenges Completed
        </Text>
        {usersGoals.map((user, index) => {
          const progress = calculateProgress(user.goal, user.totalCo2E);
          const challengesCompleted = calculateChallengesCompleted(progress);
  
          return (
            <HStack key={index} p={4} justify="space-between" align="center">
              <img
                src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'}
                alt=""
                className="rightbarFollowingImg"
              />
              <VStack align="start" spacing={1} width="100%">
                <Text fontWeight="bold">{user.username}</Text>
                <Text fontSize="sm">{user.city}</Text>
                <Text fontWeight="semibold">
                  Challenges Completed: {challengesCompleted}
                </Text>
              </VStack>
            </HStack>
          );
        })}
      </VStack>
    );
  };
  
  

  const GreenRightbar = () => {
    const [funFacts, setFunFacts] = useState([
      "Did you know that trees absorb carbon dioxide and release oxygen during photosynthesis?",
      "One tree can absorb about 48 pounds of carbon dioxide per year.",
      "The fashion industry contributes to carbon emissions; consider sustainable clothing options!",
      // Add more fun facts as needed
    ]);
  
    const [randomFact, setRandomFact] = useState("");
  
    useEffect(() => {
      // Generate a random index to select a random fun fact
      const randomIndex = Math.floor(Math.random() * funFacts.length);
      setRandomFact(funFacts[randomIndex]);
    }, [funFacts]);
  
    return (
      <div className="rightbarContainer">
        <div className="rightbarContent">
          <h4 className="rightbarTitle">Did you know?</h4>
          <p className="rightbarFunFact">{randomFact}</p>
        </div>
        <ul className="rightbarFriendList">
          {/* Render online friends (assuming 'Online' component is defined) */}
          {friends.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </div>
    );
  };

  

  // Determine which Rightbar to display
  // const renderRightBar = () => {
  //   switch (pageType) {
  //     case "calculations":
  //       return <CalculationsRightbar emissionsData={emissionsData} />;
  //     case "goals":
  //       return <GoalsRightbar />;
  //     case "profile":
  //       return user ? <ProfileRightbar /> : <HomeRightbar />;
  //     default:
  //       return <HomeRightbar />;
  //   }
  // };

  const renderRightBar = () => {
    if (pageType === "calculations") {
      return <CalculationsRightbar emissionsData={emissionsData} />;
    } else if (pageType === "goals") {
      return <GoalsRightbar />;
    } else if (user) {
      return <ProfileRightbar />;
    } else if (pageType=== "leaderboard"){
      return <LeaderboardRightbar />;
    } else if (pageType === "green") {
      console.log("here")
      return <GreenRightbar />;
    } else {
      return <HomeRightbar />;
    }
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {renderRightBar()}
      </div>
    </div>
  );
}