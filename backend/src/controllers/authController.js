const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc    Register a new user (Step 10)
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create and save the new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Login existing user (Step 11)
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Compare the incoming password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate a JWT Token
    const token = jwt.sign(
      { userId: user._index }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // 4. Return the token back to the frontend
    res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};