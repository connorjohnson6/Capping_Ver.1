import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Avatar, VStack, HStack, Text, StackDivider } from '@chakra-ui/react';


export default function Rightbar({ user, pageType, emissionsData }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [isGoalSet, setIsGoalSet] = useState(false);
  const [followed, setFollowed] = useState(
    currentUser && currentUser.followings ? currentUser.followings.includes(user?.id) : false
  );


  const handleAddRoute = async (data) => {
    const userId = currentUser._id;
    const co2E = data.co2e;

    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL_CARBON, { userId, co2E });
      console.log('Route added successfully');
    } catch (error) {
      console.error('Error adding route:', error);
    }
  };

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
      </>
    );
  };

  const CalculationsRightbar = ({ emissionsData }) => {
    if (!emissionsData.length) {
      return <div>No route calculations yet.</div>;
    }
  
    return (
      <>
        <h4 className="rightbarTitle">Emissions Data</h4>
        {emissionsData.map((data, index) => (
          <div key={index} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <div style={{ fontWeight: "bold" }}>Route #{index + 1}</div>
            <div>Method: {data.method}</div> 
            <div>Origin: {data.origin.name}</div>
            <div>Destination: {data.destination.name}</div>
            <div>Direct Emissions: {data.direct_emissions.co2e} {data.direct_emissions.co2e_unit}</div>
            <div>Indirect Emissions: {data.indirect_emissions.co2e} {data.indirect_emissions.co2e_unit}</div>

            <button 
              onClick={() => handleAddRoute(data)} 
              style={{ backgroundColor: "#38a169", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}>
              Add Route
            </button>
            
          </div>
        ))}
      </>
    );
  };


  const GoalsRightbar = () => {
    const [usersGoals, setUsersGoals] = useState([]);
  
    useEffect(() => {
      const fetchUsersGoals = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/allUsersGoals`;
        console.log('Fetching from:', url); // This should log the full URL
        try {
          const response = await axios.get(url);
          console.log("Received Users Goals Data:", response.data); // Log the received data
          setUsersGoals(response.data);
        } catch (error) {
          console.error('Error fetching users goals:', error); // Log any errors that occur during fetching
        }
      };
    
      fetchUsersGoals();
    }, []);
  
    if (!isGoalSet) {
      return <div>Set a goal to see the leaderboard.</div>;
    }
  
    return (
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {usersGoals.map((user, index) => {
          console.log("Rendering user:", user.username); 

          return (
            <HStack key={index} p={4} justify="space-between" align="center">
              <HStack spacing={4}>
                {/* <Avatar src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} name={user.username} /> */}
                <Avatar src={user.profilePicture } name={user.username} />

                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold">{user.username}</Text>
                  <Text fontSize="sm">{user.city}</Text>
                </VStack>
              </HStack>
              <Text fontWeight="semibold">
                {user.goal ? user.goal : 'No goal set'}
              </Text>       
            </HStack>
          );
        })}
      </VStack>
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