const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    description: { type: String, required: true, max: 500 },
    image: { type: String, default: "" },
    likes: { type: Array, default: [] },
    loading : { type: Boolean, default: false},
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
