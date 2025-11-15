const express = require('express');
const router = express.Router();
const {
  login,
  register,
  logout,
  getCurrentUser,
  getAllUsers,
  updateUser,
  changePassword
} = require('../controllers/authController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Public routes
router.post('/login', login);
router.post('/logout', logout);

// Protected routes - Sadece giriş yapmış kullanıcılar
router.get('/me', isAuthenticated, getCurrentUser);
router.put('/change-password', isAuthenticated, changePassword);

// Admin only routes
router.post('/register', isAdmin, register); // Sadece admin kullanıcı ekleyebilir
router.get('/users', isAdmin, getAllUsers);
router.put('/users/:id', isAuthenticated, updateUser);

module.exports = router;
