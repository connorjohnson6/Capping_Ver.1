import TopBar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";

import "./profile.css"

export default function Profile() {
    return (
        <>
            <TopBar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src="assets/post/3.jpeg" alt="" />
                            <img className="profileUserImg" src="assets/person/7.jpeg" alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Safak Kocaolgu</h4>
                            <span className="profileInfoDesc">Adventurous chap</span>

                            <div className="profileBio">
                                <span className="centerbarInfoValue">City: New York</span>
                                <span className="centerbarInfoValue">From: New Jeresy</span>
                            </div>

                            <div class="profileFollowings">
                                <button class="profileUserFollowers" >Followers</button>
                                <button class="profileUserFollowering" >Following</button>
                            </div>

                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        
                    </div>
                </div>
            </div>
        </>
    );
}