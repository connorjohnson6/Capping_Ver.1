import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]); // store posts
  const { user } = useContext(AuthContext); // Accessing current user from AuthContext

  // fetch posts when component mounts or dependencies change
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username) // Fetching posts for a specific profile
        : await axios.get("posts/timeline/" + user._id); // Fetching posts for the current user's timeline

      // Sorting posts by creation date in descending order
      // used from timeago.js
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]); // Dependencies for re-running the effect


  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}