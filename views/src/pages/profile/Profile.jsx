import TopBar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";

import "./profile.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams} from "react-router"

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    }, [username]);

    return (
        <>
            <TopBar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src={user.coverPicture || PF+"person/noCover.png"} alt="" />
                            <img className="profileUserImg" src={user.profilePicture || PF+"person/noAvatar.png"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>

                            <div className="profileBio">
                                <span className="centerbarInfoValue">City: New York</span>
                                <span className="centerbarInfoValue">From: New Jeresy</span>
                            </div>

                            <div className="profileFollowings">
                                <button className="profileUserFollowers" >Followers</button>
                                <button className="profileUserFollowering" >Following</button>
                            </div>

                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        
                    </div>
                </div>
            </div>
        </>
    );
}