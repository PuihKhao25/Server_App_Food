const express = require('express');
const router = express.Router();
const AdminController = require('../controller/Backend/AdminController')

router.get('/', function(req, res, next) {
    res.render('admin/home', { title: 'Admin' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login', layout : false });
});



module.exports = router;