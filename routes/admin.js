const express = require('express');
const router = express.Router();
const ProductController = require('../controller/Backend/ProductsController')
const CategoryController = require('../controller/Backend/CategoryController')
const AuthController = require('../controller/Backend/AuthController')
const UserControler = require('../controller/Backend/UserControler')

router.get('/', UserControler.getUser)

router.get('/login', AuthController.getLogin)

router.get('/get-user', UserControler.getUser)

router.post('/delete-user/:id',UserControler.deleteUser)

router.get('/get-category', CategoryController.getCategory);

router.get('/get-product', ProductController.getProducts)

router.get('/add-product',ProductController.getAddProducts)

router.post('/add-product',ProductController.addProducts)

router.get('/edit-product',ProductController.getEditProducts)

router.post('/edit-product/:id',ProductController.postEditProducts)



module.exports = router;