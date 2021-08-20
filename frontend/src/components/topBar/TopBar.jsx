import "./topBar.css";
import { Search,Chat, Notifications } from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Auth/AuthContext";
import { signout } from "../apiCalls";
import {useHistory} from "react-router";

const TopBar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const history = useHistory();
  const {dispatch } = useContext(AuthContext);

  const userLogoutHandler = ()=>{
    signout(dispatch);
  }
  return (
    <div className="topBarContainer">
      <div className="tobBarLeft">
        <Link style={{ textDecoration: "none" }} to="/">
          <span className="topBarLogo">Facebook</span>
        </Link>
      </div>
      <div className="topBarCenter">
        <div className="searchBar">
          <Search className="searchTopBarIcon" />
          <input
            placeholder="search for firends , posts , videos"
            className="searchTopBarInput"
          />
        </div>
      </div>
      <div className="topBarRight">
        <div className="topBarLinks">
          <span className="topBarLink">Home Link</span>
          <span className="topBarLink">Timeline Link</span>
        </div>
        <div className="topBarIcons">
          <div className="topBarIconItems">
            <Search />
            <span className="topBarIconBadge">10</span>
          </div>
          <div className="topBarIconItems">
            <Chat />
            <span className="topBarIconBadge">7</span>
          </div>
          
          <div className="topBarIconItems">
            <Notifications />
            <span className="topBarIconBadge">9</span>
          </div>
          <div className="topBarIconItems">
            <ExitToAppIcon onClick = {userLogoutHandler} />           
          </div>
        </div>
        <Link
          style={{ textDecoration: "none" }}
          to={`/profile/${user && user.username}`}
        >
          <img
            className="topBarImage"
            src={user && user.profilePicture || PF + "person/noAvatar.png"}
            alt="profile picture"
          />
        </Link>
      </div>
    </div>
  );
};
export default TopBar;
