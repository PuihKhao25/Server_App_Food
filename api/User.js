const express = require('express');
const router = express.Router();

const CartController = require('../controller/Api/CartController')


router.post('/add-to-cart', CartController.addCart)

router.delete('/delete/:id', CartController.deleteCart)

router.get('/get-cart', CartController.getCart)


module.exports = router;