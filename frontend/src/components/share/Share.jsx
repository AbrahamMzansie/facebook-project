import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { AuthContext } from "../context/Auth/AuthContext";
import { PostContext } from "../context/Post/PostContext";
import { useContext, useState } from "react";
import { createPost } from "../context/Post/PostActions";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";

const Share = () => {
  const [newPost, setNewPost] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const { user, loading: userLoading } = useContext(AuthContext);
  const { loading, dispatch } = useContext(PostContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const createNewPostHandler = (e) => {
    e.preventDefault();
     let data = null;
    const new_Post = {
      userId: user._id,
      description: newPost,
    };
    if (imageUpload) {
      data = new FormData();
      const fileName = Date.now() + imageUpload.name;
      data.append("name", fileName);
      data.append("file", imageUpload);      
      new_Post.image = fileName;
    }
    if (!newPost) {
      toast.error("Please enter a post description , video ,picture");
    } else {
      createPost(new_Post, data, dispatch);
    }
  };

  return (
    <div className="shareContainer">
      <ToastContainer />
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user && user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="shareProfilePicture"
          />
          <input
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder={`What's in your mind ,${user && user.username} ?`}
            className="shareInput"
            type="text"
          />
        </div>
        <hr className="shareHr" />
        <form onSubmit={createNewPostHandler} className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo/Video</span>
              <input
                style={{ display: "none" }}
                onChange={(e) => setImageUpload(e.target.files[0])}
                type="file"
                id="file"
                accept="png;jpeg;jpg"
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            {loading ? (
              <CircularProgress style={{ color: "#fff" }} size="30px" />
            ) : (
              "Share"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Share;
