// routes/followerRoutes.js
const express = require("express");
const User = require("../models/User");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/follow/:userId", authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.following.includes(userId)) {
      throw new Error("Already following this user");
    }
    await User.findByIdAndUpdate(req.userId, { $push: { following: userId } });
    await User.findByIdAndUpdate(userId, { $push: { followers: req.userId } });
    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/unfollow/:userId", authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (!user.following.includes(userId)) {
      throw new Error("User is not being followed");
    }
    await User.findByIdAndUpdate(req.userId, { $pull: { following: userId } });
    await User.findByIdAndUpdate(userId, { $pull: { followers: req.userId } });
    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
