const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.newPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.put("/:id/like", postController.likeAndUnlikePost);
router.get("/:id", postController.getPost);
router.get("/timeline/userPost/:userId", postController.getTimelinePost);
router.get("/userPost/:username", postController.getAllUserPost);

module.exports = router;
