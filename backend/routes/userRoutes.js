const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');

// Public route
router.get('/get-user/:id', userController.getUser);

// Protected routes (require authentication)
//router.use(authMiddleware.protect);

router.get('/get-updated-user', auth, userController.getUpdatedUser);
router.post('/update-profile', userController.updateProfile);
router.patch('/add-fcm-token', userController.addFcmToken);

module.exports = router;