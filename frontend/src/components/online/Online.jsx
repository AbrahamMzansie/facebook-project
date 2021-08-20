import "./online.css";

const Online = ({ user }) => {
  const publicUrl = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <li className="rightBarFriend">
        <div className="profileImageContainer">
          <img
            src={publicUrl + user.profilePicture}
            alt=""
            className="rightBarProfileImage"
          />
          <span className="rightBarOnlineBadge"></span>
        </div>
        <span className="rightBarUserName">{user.username}</span>
      </li>
    </>
  );
};

export default Online;
