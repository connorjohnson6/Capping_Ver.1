import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Event from "../../components/events/Events";
import "./events.css";

function Events() {

  return (
    <>
      <Topbar />
      <div className="eventContainer">
        <Sidebar />
        <Event/>

      </div>
    </>
  );
}

export default Events;
