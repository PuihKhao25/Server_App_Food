const express = require('express');
const router = express.Router();
const AdminController = require('../controller/Backend/AdminController')

router.get('/', function(req, res, next) {
    res.render('admin/home', { title: 'Admin' });
});
router.get('/add', function(req, res, next) {
    res.render('admin/addproduct', { title: 'Admin' });
});

router.get('/admin/login', function(req, res, next) {
    res.render('login', { title: 'Login', layout : false });
});



module.exports = router;