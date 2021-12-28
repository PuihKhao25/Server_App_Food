const express = require('express');
const router = express.Router();

const CategoryController = require('../controller/Api/CategoryController')
const ProductController = require('../controller/Api/ProductController')
const BannerController = require('../controller/Api/BannerController')
const SearchController = require('../controller/Api/SearchController')
const CartController = require('../controller/Api/CartController')
const verifyToken = require('../middleware/auth')


router.get('/get', ProductController.getProducts)

router.post('/add',verifyToken, ProductController.addProducts)

router.delete('/delete/:id',ProductController.deleteProduct)




module.exports = router;