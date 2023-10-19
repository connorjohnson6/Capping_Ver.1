import "./share.css"

export default function Share(){
    return (
        <div className="share">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> 
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src="/assets/person/1.jpeg" alt="" className="shareProfileImg" />
                    <input
                        placeholder="What's on your mind Safak?"
                        className="shareInput"
                    />
                </div>
                <hr className="shareHr" />

                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <span style={{ color: 'tomato' }} className="material-symbols-outlined shareIcon">perm_media</span>
                            <span className="shareOptionText">Photo or Video</span>
                        </div>
                        <div className="shareOption">
                            <span style={{ color: 'blue' }} className="material-symbols-outlined shareIcon">label</span>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <span style={{ color: 'green' }} className="material-symbols-outlined shareIcon">location_on</span>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <span style={{ color: 'goldenrod' }} className="material-symbols-outlined shareIcon">mood</span>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
                
            </div>
        </div>
    )
}