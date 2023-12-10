import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./topbar.css";


export default function Topbar() {
    // useContext to access the user from AuthContext
    const { user } = useContext(AuthContext); 

    // Environment variable for public folder path
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // useState hooks for managing search term and suggestions
    const [searchTerm, setSearchTerm] = useState(""); // State for the search term
    const [suggestions, setSuggestions] = useState([]); // State for storing search suggestions

    // hook to fetch users as search suggestions
    useEffect(() => {  
        if (searchTerm) {
            const loadUsers = async () => {
                try {
                    // Axios GET request to fetch users based on search term
                    //check env folder for route information
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/search?name=${searchTerm}`);
                    setSuggestions(response.data); // Updating suggestions state
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };
            loadUsers();
        } else {
            setSuggestions([]); // Clearing suggestions if search term is empty
        }
    }, [searchTerm]); // Dependency array to re-run effect when searchTerm changes



    return (
        
        <div className="topbarContainer">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> 
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                <span className="logo">Carbon Bigfoot</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <span className="material-symbols-outlined" id="searchIcon">search</span>
                    <input 
                        placeholder="Search for friend, post or video" 
                        className="searchInput"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Updating searchTerm state on change
                    />
                    {suggestions.length > 0 && (
                        <div className="searchSuggestions">
                            {suggestions.map((suggestion) => (
                                <Link key={suggestion._id} to={`/profile/${suggestion.username}`}>
                                    <div className="searchSuggestionItem">
                                        {suggestion.username}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <span className="material-symbols-outlined" id="personIcon">person</span>                        
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <span className="material-symbols-outlined" id="chatIcon">chat</span>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <span className="material-symbols-outlined" id="notificationsIcon">notifications</span>               
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img
                        src={
                        user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className="topbarImg"
                    />
                </Link>
            </div>
        </div>
    );
}