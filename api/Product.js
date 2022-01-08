const express = require('express');
const router = express.Router();

const ProductController = require('../controller/Api/ProductController')
const verifyToken = require('../middleware/auth')


router.get('/get/:id', ProductController.getProducts)

router.post('/add',verifyToken, ProductController.addProducts)

router.delete('/delete/:id',ProductController.deleteProduct)


module.exports = router;