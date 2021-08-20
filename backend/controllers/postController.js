const Post = require("../models/Post");
const User = require("../models/User");

//create a new post
const newPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update a post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated successfully");
    } else {
      res.status(403).json("You can update your own post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("You can delete your own post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//like and unlike a post
const likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(403).json("Post does not exist");
    }
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been unliked");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllUserPost = async (req, res) => {
  try {
    const currentUser = await User.findOne({ username: req.params.username });
    const userPosts = await Post.find({ userId: currentUser._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTimelinePost = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id }).sort({
      createdAt: -1,
    });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = {
  newPost,
  updatePost,
  deletePost,
  likeAndUnlikePost,
  getPost,
  getTimelinePost,
  getAllUserPost,
};
