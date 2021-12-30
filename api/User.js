const express = require('express');
const router = express.Router();

const CartController = require('../controller/Api/CartController')


router.post('/add-to-cart', CartController.addCart)

router.post('/delete', CartController.removeCartItems)

router.get('/my-cart', CartController.getMyCart)

router.get('/get-product', CartController.getProduct)

module.exports = router;