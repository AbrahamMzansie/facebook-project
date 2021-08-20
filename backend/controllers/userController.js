const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user account
const updateUser = async (req, res) => {
  const { userId, isAdmin } = req.body;
  try {
    if (userId == req.params.id || isAdmin) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json("Account has been updated");
    } else {
      res.status(500).json("You can only update your own account");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete user account
const deleteUser = async (req, res) => {
  const { userId, isAdmin } = req.body;
  try {
    if (userId == req.params.id || isAdmin) {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(404).json("Account does not exist");
      } else {
        res.status(200).json("Account has been deleted");
      }
    } else {
      res.status(500).json("You can only delete your own account");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User Account does not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const followUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already follow a user");
      }
    } else {
      res.status(403).json("You cannot follow yourself");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const unFollowUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You are not following this user");
      }
    } else {
      res.status(403).json("You cannot unfollow yourself");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unFollowUser,
};
