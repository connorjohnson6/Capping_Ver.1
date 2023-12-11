import "./sidebar.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Sidebar(){
    const { user } = useContext(AuthContext);
    return (
        <div className="sidebar">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> 
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <Link to={`/`}>
                        <li className="sidebarListItem">
                            <span className="material-symbols-outlined" id="sidebarIcon">rss_feed</span>
                            <span className="sidebarListItemText">Feed</span>
                        </li>
                    </Link>
                    
                    <li className="sidebarListItem">
                        <span className="material-symbols-outlined" id="sidebarIcon">Chat</span>                   
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <span className="material-symbols-outlined" id="sidebarIcon">group</span>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <span className="material-symbols-outlined" id="sidebarIcon">editor_choice</span>
                        <span className="sidebarListItemText">Badges</span>
                    </li>
                    <Link to={`/leaderboard/${user.username}`}>
                        <li className="sidebarListItem">
                            <span className="material-symbols-outlined" id="sidebarIcon">social_leaderboard</span>
                            <span className="sidebarListItemText">Leaderboard</span>
                        </li>
                    </Link>
                    <Link to={`/green/${user.username}`}>
                        <li className="sidebarListItem">
                            <span className="material-symbols-outlined" id="sidebarIcon">compost</span>
                            <span className="sidebarListItemText">Tips</span>
                        </li>
                    </Link>
                    <Link to={`/challenges/${user.username}`}>
                    <li className="sidebarListItem">
                        <span className="material-symbols-outlined" id="sidebarIcon">flag</span>
                        <span className="sidebarListItemText">Challenges</span>
                    </li>
                    </Link>
                    <Link to={`/calculator/${user.username}`}>
                        <li className="sidebarListItem">
                            <span className="material-symbols-outlined" id="sidebarIcon">co2</span>
                            <span className="sidebarListItemText">Carbon Calculator</span>
                        </li>
                    </Link>
                    <li className="sidebarListItem">
                        <span className="material-symbols-outlined" id="sidebarIcon">event</span>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <Link to={`/goals/${user.username}`}>
                        <li className="sidebarListItem">
                            <span className="material-symbols-outlined" id="sidebarIcon">task_alt</span>
                            <span className="sidebarListItemText">Goals</span>
                        </li>
                    </Link>
                    </ul>
                    <button className="sidebarButton">Show More</button>
                    <hr className="sidebarHr" />
            </div>
        </div>
  );
}
