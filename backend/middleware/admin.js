const User = require('../models/User');

const admin = async (req, res, next) => {
  try {
    // req.user should be set by auth middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // If user object has is_admin property
    if (req.user.is_admin) {
      return next();
    }
    // If not, try to fetch from DB (for JWT-only payloads)
    if (req.user.id) {
      const user = await User.findById(req.user.id);
      if (user && user.is_admin) {
        return next();
      }
    }
    return res.status(403).json({ message: 'Admin access required' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = admin; 