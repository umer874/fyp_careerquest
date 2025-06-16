require('dotenv').config();


const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/sign-in', authController.login);
router.post('/refresh-tokens', authController.refreshToken);


module.exports = router;

