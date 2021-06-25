const express = require('express');

const postController = require('../controller/postController.js');
const protect = require('../middleware/authMiddleWare.js');

const router = express.Router();


//localhost
router
    .route("/")
    .get(postController.getAllPosts)
    .post(protect, postController.createPost)

router
    .route("/:id")
    .get(postController.getOnePosts)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deletePost)

module.exports = router;
