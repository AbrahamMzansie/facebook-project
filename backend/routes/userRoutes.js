const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.put("/:id" , userController.updateUser);
router.delete("/:id" , userController.deleteUser);
router.get("/" , userController.getUser);
router.put("/:id/follow" , userController.followUser);
router.put("/:id/unfollow" , userController.unFollowUser);
module.exports = router;
