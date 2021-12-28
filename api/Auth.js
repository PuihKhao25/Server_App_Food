const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

const AuthController = require('../controller/Api/AuthController');


router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.get('/logout', verifyToken, AuthController.logout)

module.exports = router;