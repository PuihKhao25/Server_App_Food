const express = require('express');
const router = express.Router();

const CategoryController = require('../controller/Api/CategoryController')

router.post('/add', CategoryController.addCategory)

router.get('/get', CategoryController.getCategory)



module.exports = router;