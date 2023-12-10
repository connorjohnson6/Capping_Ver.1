import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const [user, setUser] = useState({}); // useState hook to handle user state
  const username = useParams().username; // useParams hook to get the 'username' parameter from the URL
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;  // Environment variable for public folder path

  // useEffect hook to fetch user data when 'username' changes
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`); // Axios get request to fetch user data
      setUser(res.data); // Updating user state with fetched data
    };
    fetchUser();
  }, [username]); // Dependency array with 'username' to re-run effect when username changes


  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + `/${user.profilePicture}`
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>

            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}