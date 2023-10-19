import "./topbar.css"

   



export default function TopBar() {
    
    return (
        
        <div className="topbarContainer">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> 
            <div className="topbarLeft">
                <span className="logo">Carbon Bigfoot</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <span class="material-symbols-outlined" id="searchIcon">search</span>
                    <input placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">TimeLine</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <span class="material-symbols-outlined" id="personIcon">person</span>                        
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <span class="material-symbols-outlined" id="chatIcon">chat</span>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <span class="material-symbols-outlined" id="notificationsIcon">notifications</span>               
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <img src="/assets/person/1.jpeg" alt="" className="topbarImg"/>
            </div>
        </div>
    );
}