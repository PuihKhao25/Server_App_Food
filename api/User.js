const express = require('express');
const router = express.Router();

const CartController = require('../controller/Api/CartController')


router.post('/add-to-cart', CartController.addCart)

router.get('/cart', CartController.getCart)

router.post('/delete', CartController.removeCartItems)



module.exports = router;