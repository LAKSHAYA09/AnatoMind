const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header: "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using your JWT secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database using the ID in the payload (exclude password)
      const userId = decoded.id || decoded._id;
      req.user = await User.findById(userId).select("-password");

      if (!req.user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      // Continue to the next middleware or controller function
      next();
    } catch (error) {
      console.error("Auth middleware error:", error.message);
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  // If no token is provided in the headers
  if (!token) {
    return res.status(401).json({ success: false,message: "Not authorized, no token" });
  }
};

module.exports = { protect };