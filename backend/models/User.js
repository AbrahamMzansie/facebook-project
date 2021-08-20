const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      dafault: "",
    },
    coverPicture: {
      type: String,
      dafault: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    suburb: {
      type: String,
      max: 50,
    },
    province: {
      type: String,
      max: 50,
    },
    regCode: {
      type: String,
      min :1,
      max: 6,
    },
    country: {
      type: String,
      max: 50,
    },
    searchType: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
    },
    gender: {
      type: String,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    loading: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
