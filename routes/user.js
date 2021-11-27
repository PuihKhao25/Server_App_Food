const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

const AuthController = require('../controller/AuthController');
const ProductController = require('../controller/ProductController')

router.get('/user',verifyToken, (req,res) =>{
    res.json({post: 'my post'})
})
router.post('/add-product', ProductController.AdProduct)

router.post('/register',AuthController.register )

router.post('/login', AuthController.login)

router.get('/logout',verifyToken, AuthController.logout) 

module.exports = router;
