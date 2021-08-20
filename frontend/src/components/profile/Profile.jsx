import RightBar from "../../components/rightBar/RightBar";
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import Feed from "../../components/feed/Feed";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserProfile } from "../context/User/UserActions";
import { UserContext } from "../context/User/UserContext";

import "./profile.css";
import { CircularProgress } from "@material-ui/core";

const Profile = (props) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { loading, user, dispatch } = useContext(UserContext);
  const params = useParams();

  useEffect(() => {
    const retriveUser = () => {
      getUserProfile(params.username , dispatch);
    };
    retriveUser();
  }, [params.username]);
  return (
    <>
      <TopBar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
        {loading ? (
          <CircularProgress
            style={{ margin: "20px 50%", color: "#1877f2" }}
            size="30px"
          />
        ) : (
          <div className="profileRightTop">
          <div className="profileCover">
            <img
              src={
                user.coverPicture
                  ? PF + user.coverPicture
                  : PF + "person/noCover.png"
              }
              alt=""
              className="profileCoverImage"
            />
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="profileUserImage"
            />
          </div>
          <div className="profileInformation">
            <h4 className="profileName">{user.username}</h4>
            <span className="profileDescription">{user.description}</span>
          </div>
        </div> 
        )}
          <div className="profileRightBottom">
            <Feed username={params.username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
