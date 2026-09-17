const User = require('../models/User');

async function requireAuth(req, res, next) {
  try {
    if (!req.session.userId) return res.status(401).json({ message: 'Please log in first.' });
    const user = await User.findById(req.session.userId).select('_id name email branch year role').lean();
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ message: 'Session is no longer valid.' });
    }
    req.user = user;
    next();
  } catch (error) { next(error); }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Authentication required.' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'You do not have permission for this action.' });
    next();
  };
}

module.exports = { requireAuth, requireRole };
