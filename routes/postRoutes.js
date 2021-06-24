const express = require('express');

const postController = require('../controller/postController.js');

const router = express.Router();


//localhost
router
    .route("/")
    .get(postController.getAllPosts)
    .post(postController.createPost)

router
    .route("/:id")
    .get(postController.getOnePosts)
    .patch(postController.updatePost)
    .delete(postController.deletePost)

module.exports = router;
