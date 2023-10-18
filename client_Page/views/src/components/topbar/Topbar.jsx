import "./topbar.css"

export default function TopBar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">Carbon Bigfoot</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar"></div>
            </div>
            <div className="topbarRight"></div>
        </div>
    )
}