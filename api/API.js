const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

const AuthController = require('../controller/AuthController');
const CategoryController = require('../controller/CategoryController')
const ProductController = require('../controller/ProductController')


router.post('/auth/register',AuthController.register )

router.post('/auth/login', AuthController.login)

router.get('/auth/logout',verifyToken, AuthController.logout) 

router.get('/get-product', ProductController.getProducts)

router.post('/add-product', ProductController.addProducts)

router.post('/add-category', CategoryController.addCategory)

router.get('/get-category', CategoryController.getCategory)

module.exports = router;
