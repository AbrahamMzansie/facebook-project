import { useEffect, useContext } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../context/Auth/AuthContext";
import { PostContext } from "../context/Post/PostContext";
import {
  retriveAllPosts,
  retriveAllUserPosts,
} from "../context/Post/PostActions";
import { CircularProgress } from "@material-ui/core";

const Feed = ({ username }) => {
  const { user } = useContext(AuthContext);
  const { loading, allPosts, error, dispatch } = useContext(PostContext);

  useEffect(() => {
    const retrivePost = async () => {
      if (username) {
        retriveAllUserPosts(username, dispatch);
      } else {
        retriveAllPosts(user, dispatch);
      }
    };
    if (user) {
      retrivePost();
    }
  }, [username, user, dispatch]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {username && user && username != user.username ? "" : <Share />}
        {loading ? (
          <CircularProgress
            style={{ margin: "20px 50%", color: "#1877f2" }}
            size="30px"
          />
        ) : (
          allPosts &&
          allPosts.map((post) => <Post key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};
export default Feed;
