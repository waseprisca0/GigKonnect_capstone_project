const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/workers - Get all workers with category info
router.get('/', async (req, res) => {
  try {
    const workers = await User.findAllWorkersWithCategory();
    console.log(workers)
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workers' });
  }
});

module.exports = router; 