import "./friends.css";

const Friends = ({user}) => {
  const publicUrl = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
          <li className="sideBarFriend">
            <img
              src={publicUrl + user.profilePicture}
              alt=""
              className="sideBarFriendImage"
            />
            <span className="sideBarFriendName">{user.username}</span>
          </li>
           
        </>
    )
}
export default Friends;
