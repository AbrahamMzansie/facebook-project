import "./rightBar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

const RightBar = ({ user }) => {
  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className="birthDayImage" />
          <span className="birthdayText">
            {" "}
            <b>Vusa Mzansie Nkomo</b> and other <b> 3 friends</b> have a
            birthday day
          </span>
        </div>
        <img
          src="assets/ad.png"
          alt=""
          className="rightBarAdvertisementImage"
        />
        <h4 className="rightBarTitle">Online Friends</h4>
        <ul className="rightBarFriendList">
          {Users && Users.map((user) => <Online key={user.id} user={user} />)}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    const publicUrl = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <>
        <h4 className="rightBarTitle">User Information</h4>
        <div className="rightBarInfo">
          <div className="rightBarInfoItem">
            <span className="rightInfoKey">Suburb :</span>
            <span className="rightInfoValue">{user.suburb}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightInfoKey">City :</span>
            <span className="rightInfoValue">{user.city}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightInfoKey">Province :</span>
            <span className="rightInfoValue">{user.province}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightInfoKey">Country :</span>
            <span className="rightInfoValue">{user.country}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightInfoKey">Relationship :</span>
            <span className="rightInfoValue">Married</span>
          </div>

          <h4 className="rightBarTitle">User Friends</h4>
          <div className="rightBarFollowings">
            <div className="rightBarFollowing">
              <img src="/assets/person/1.jpeg" alt="" className="rightBarFollowingImage" />
              <span className="rightBarFollowingName">
                Vusa Mzansi Nkomo
              </span>
            </div>       
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightBarContainer">
      <div className="rightBarWrapper">
       {user ? <ProfileRightBar/> : <HomeRightBar/>}
      </div>
    </div>
  );
};

export default RightBar;
