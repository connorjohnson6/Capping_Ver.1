import "./sidebar.css"
import { Users } from "../../dummyData"
import CloseFriend from "../closeFriend/CloseFriend"

export default function Sidebar(){
    return (
        <div className="sidebar">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> 
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                    <span class="material-symbols-outlined" id="sidebarIcon">rss_feed</span>
                    <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <span class="material-symbols-outlined" id="sidebarIcon">Chat</span>                   
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <span class="material-symbols-outlined" id="sidebarIcon">play_circle</span>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <span class="material-symbols-outlined" id="sidebarIcon">group</span>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <span class="material-symbols-outlined" id="sidebarIcon">bookmark</span>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <span class="material-symbols-outlined" id="sidebarIcon">contact_support</span>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <span class="material-symbols-outlined" id="sidebarIcon">work</span>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <span class="material-symbols-outlined" id="sidebarIcon">event</span>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <span class="material-symbols-outlined" id="sidebarIcon">school</span>
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>

                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">

                    {Users.map((u) =>(
                        <CloseFriend key={u.id} user={u} />
                    ))}
                    
                    
                </ul>


            </div>
        </div>
    )
}