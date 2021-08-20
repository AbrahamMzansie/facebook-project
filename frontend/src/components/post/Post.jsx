import { useEffect, useState } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import {Link} from "react-router-dom";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsliked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const retriveUser = async () => {
      const response = await axios.get(`/user/?userId=${post.userId}`);
      setUser(response.data);
      return response;
    };
    retriveUser();
  }, [post.userId]);

  const likeUnlikeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsliked(!isLiked);
  };
  return (
    <div className="postContainer">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              style={{ textDecoration: "none" }}
              to={`/profile/${user.username}`}
            >
              <img
                src={user.profilePicture ? PF + user.profilePicture:  PF + "person/noAvatar.png"}
                alt=""
                className="postProfileImage"
              />
            </Link>  
            <span className="postUserName">{user && user.username}</span>          
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="postOption" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img src={PF + post.image} alt="" className="postImage" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              onClick={likeUnlikeHandler}
              src={`${PF}like.png`}
              alt=""
              className="likeIcon"
            />
            <img src={`${PF}heart.png`} alt="" className="likeIcon" />
            <span className="likePostCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
