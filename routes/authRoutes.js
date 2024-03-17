// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.blacklisted) {
      throw new Error("User is blacklisted. Please contact the administrator for assistance.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.secret_key,
      { expiresIn: "7d" }
    );
    res.status(200).json({ msg: "Login Successfully", token: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get("/users", authenticate, async (req, res) => {
  try {
    const users = await User.find()
      .populate("posts")
      .populate("following")
      .populate("followers");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

module.exports = router;
