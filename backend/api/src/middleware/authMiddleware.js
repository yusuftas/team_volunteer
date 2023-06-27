const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token not provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
}

module.exports = authenticateToken;
