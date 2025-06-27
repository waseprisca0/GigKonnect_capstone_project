const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// GET /api/admin/dashboard
router.get('/dashboard', auth, admin, (req, res) => {
  res.json({
    message: 'Welcome to the Admin Dashboard!',
    user: req.user
  });
});

// GET /api/admin/users - Get all users
router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// POST /api/admin/users - Create a new user
router.post('/users', auth, admin, async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, user_type, is_admin } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: 'First name, last name, email, and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password_hash: passwordHash,
      phone: phone || null,
      user_type: user_type || 'client',
      is_admin: is_admin || false
    });

    // Return user without password
    const { password_hash, ...userWithoutPassword } = newUser;
    res.status(201).json({ 
      message: 'User created successfully',
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// DELETE /api/admin/users/:id - Delete a user
router.delete('/users/:id', auth, admin, async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (user.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    // Delete user
    await User.deleteById(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router; 