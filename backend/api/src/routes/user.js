const express = require('express');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user.' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user information
    user.username = req.body.username || user.username;
    user.password = req.body.password || user.password;
    await user.save();

    res.json({ message: 'User updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user.' });
  }
});

module.exports = router;
