import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Ranking from "../../components/ranking/Ranking";


import "./leaderboard.css"

export default function Leaderboard() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Ranking/>
        <Rightbar pageType="leaderboard" />
      </div>
    </>
  );
}