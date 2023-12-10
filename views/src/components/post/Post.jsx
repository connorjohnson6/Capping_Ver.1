import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length); // like count
    const [isLiked, setIsLiked] = useState(false); // check if post is liked by current user
    const [user, setUser] = useState({}); // storing user data
    const PF = process.env.REACT_APP_PUBLIC_FOLDER; // Environment variable for public folder
    const { user: currentUser } = useContext(AuthContext); // Accessing current user from AuthContext
  
    // useEffect to set the isLiked state when component mounts or dependencies change
    useEffect(() => {
      setIsLiked(post.likes.includes(currentUser._id)); // Checking if post is liked by current user
    }, [currentUser._id, post.likes]);
  
    // useEffect to fetch user data of the post creator
    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data); // Setting the fetched user data to state
      };
      fetchUser();
    }, [post.userId]);
  
    // Function to handle like and unlike actions
    const likeHandler = () => {
      try {
        axios.put("/posts/" + post._id + "/like", { userId: currentUser._id }); // Sending like/unlike request
      } catch (err) {}
      setLike(isLiked ? like - 1 : like + 1); // Updating like count if you press the heart
      setIsLiked(!isLiked); // Toggling like state
    };


    return (
        <div className="post">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> 
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                className="postProfileImg"
                                src={
                                user.profilePicture
                                    ? PF + user.profilePicture
                                    : PF + "person/noAvatar.png"
                                }
                                alt=""
                            />
                        </Link>

                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                    <span className="material-symbols-outlined">more_vert</span>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img
                        className="likeIcon"
                        src={`${PF}heart.png`}
                        onClick={likeHandler}
                        alt=""
                        />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}