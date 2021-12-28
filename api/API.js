const express = require('express');
const router = express.Router();

const CategoryController = require('../controller/Api/CategoryController')
const BannerController = require('../controller/Api/BannerController')
const SearchController = require('../controller/Api/SearchController')

router.post('/add-category', CategoryController.addCategory)

router.get('/get-category', CategoryController.getCategory)

router.post('/add-banner', BannerController.addBanner)

router.get('/get-banner', BannerController.getBanner)

router.post('/search-key', SearchController.postKey)



module.exports = router;