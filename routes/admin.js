const express = require('express');
const router = express.Router();
const AdminController = require('../controller/Backend/AdminController')

router.get('/', function(req, res, next) {
    res.render('admin/home', { title: 'Admin' });
});
router.get('/add-product', function(req, res, next) {
    res.render('admin/addProduct', { title: 'Admin' });
});
router.get('/list-product', function(req, res, next) {
    res.render('admin/listProduct', { title: 'Admin' });
});
router.get('/edit-product', function(req, res, next) {
    res.render('admin/editProduct', { title: 'Admin' });
});
router.get('/category', function(req, res, next) {
    res.render('admin/category', { title: 'Admin' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login', layout : false });
});



module.exports = router;