import "./share.css";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
    // Using useContext to access the user from AuthContext
    const { user } = useContext(AuthContext);

    // Environment variable for public folder path
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // hook to create a ref for the description input
    const desc = useRef();

    // hook to manage file state
    const [file, setFile] = useState(null);

    // hook to log user data on component mount or update
    useEffect(() => {
        console.log('This is a look for the user:', user);
    }, [user]);

    // Function to handle form submission
    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try {
                await axios.post("/upload", data); // Post request to upload file
            } catch (err) {}
        }
        try {
            await axios.post("/posts", newPost); // Post request to create a new post
            window.location.reload(); // Reload the page to update the UI
        } catch (err) {}
    };
  
    return (
        <div className="share">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> 
            <div className="shareWrapper">
                <div className="shareTop">
                <img
                    className="shareProfileImg"
                    src={
                    user.profilePicture
                        ? PF + `/${user.profilePicture}`
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                />
                <input
                    placeholder={"What's on your mind " + user.username + "?"}
                    className="shareInput"
                    ref={desc}
                />
                </div>

                <hr className="shareHr" />
                <hr className="shareHr" />
                {file && (
                <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    <span class="material-symbols-outlined" close id="shareCancelImg" onClick={() => setFile(null)} />
                </div>
                )}

                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <span style={{ color: 'tomato' }} className="material-symbols-outlined shareIcon">perm_media</span>
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <span style={{ color: 'green' }} className="material-symbols-outlined shareIcon">location_on</span>
                            <span className="shareOptionText">Location</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
                
            </div>
        </div>
    )
}