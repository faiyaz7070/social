// routes/postRoutes.js
const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const authenticate = require("../middleware/authenticate");

const router = express.Router();
router.post("/post", authenticate, async (req, res) => {
    try {
      const { content } = req.body;
      const post = new Post({ content, author: req.userId });
      await post.save();
      await User.findByIdAndUpdate(req.userId, { $push: { posts: post._id } });
      
      // Combine the message and post object into a single object
      const response = {
        message: "Content posted successfully",
        post: post
      };
  
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.patch("/updatePost", authenticate, async (req, res) => {
  try {
    const { postId, content } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.author.toString() !== req.userId) {
      throw new Error("You are not authorized to update this post");
    }
    post.content = content;
    await post.save();
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/deletePost/:postId", authenticate, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    if (post.author.toString() !== req.userId) {
      throw new Error("You are not authorized to delete this post");
    }
    await Post.findByIdAndDelete({ _id: postId });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
