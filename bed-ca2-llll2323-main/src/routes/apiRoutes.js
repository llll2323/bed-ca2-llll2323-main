// apiRoutes.js
const express = require('express');
const router = express.Router();

// Import controllers for handling registration, login, and messages
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');

// User registration route
router.post('/register', authController.register);

// User login route
router.post('/login', authController.login);

// Retrieve user messages route
router.get('/messages', authController.authenticateUser, messageController.getMessages);

// Send message route
router.post('/messages', authController.authenticateUser, messageController.sendMessage);

module.exports = router;
