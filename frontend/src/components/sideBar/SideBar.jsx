import "./sideBar.css";
import {
  RssFeed,
  Bookmarks,
  HelpOutline,
  WorkOutline,
  Event,
  School,
  Chat,
  VideoLibraryTwoTone,
  PlayCircleFilled,
  Group,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import Friends from "../friends/Friends";

const SideBar = () => {
  return (
    <div className="sideBar">
      <div className="sideBarWrapper">
        <ul className="sideBarList">
          <li className="sideBarListItem">
            <RssFeed className="sideBarIcon" />
            <span className="sideBarListrItemText">Feed</span>
          </li>
          <li className="sideBarListItem">
            <Chat className="sideBarIcon" />
            <span className="sideBarListrItemText">Chat</span>
          </li>
          <li className="sideBarListItem">
            <PlayCircleFilled className="sideBarIcon" />
            <span className="sideBarListrItemText">Videos</span>
          </li>
          <li className="sideBarListItem">
            <Group className="sideBarIcon" />
            <span className="sideBarListrItemText">Group</span>
          </li>
          <li className="sideBarListItem">
            <Bookmarks className="sideBarIcon" />
            <span className="sideBarListrItemText">BookMarks</span>
          </li>
          <li className="sideBarListItem">
            <HelpOutline className="sideBarIcon" />
            <span className="sideBarListrItemText">Questions</span>
          </li>
          <li className="sideBarListItem">
            <WorkOutline className="sideBarIcon" />
            <span className="sideBarListrItemText">Jobs</span>
          </li>
          <li className="sideBarListItem">
            <Event className="sideBarIcon" />
            <span className="sideBarListrItemText">Events</span>
          </li>
          <li className="sideBarListItem">
            <School className="sideBarIcon" />
            <span className="sideBarListrItemText">Courses</span>
          </li>
        </ul>
        <button className="sideBarButton">show more</button>
        <hr className="sideBarHr" />
        <ul className="sideBarFriendList">
          {Users && Users.map((user) => (
            <Friends key = {user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
