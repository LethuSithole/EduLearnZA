// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    // Allow anonymous access but don't set user
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    // Invalid token, continue without user
    next();
  }
};

exports.requireAuth = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route",
    });
  }
  next();
};
