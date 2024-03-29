require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const verifyToken = require('./middleware/auth')

const adminRouter = require('./routes/admin');
const homeRouter = require('./routes/home')

//api
const API = require('./api/API');
const ApiAuth = require('./api/Auth');
const ApiUser = require('./api/User');
const ApiProduct = require('./api/Product')
const ApiCategory = require('./api/Category')

const connectDB = require('./database/connectDB')

connectDB()

const app = express();


// view engine setup


app.use(expressLayouts)
app.set('views', path.join(__dirname, 'views'));
app.set('layout', './layouts/layout')
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/stylesheets', express.static(__dirname + 'public/stylesheets'))
app.use('/vendor', express.static(__dirname + 'public/vendor'))

app.use('/', homeRouter)
app.use('/admin', adminRouter);

//api ApiCategory
app.use('/api', API);
app.use('/api/auth', ApiAuth);
app.use('/api/category', ApiCategory);
app.use('/api/product', ApiProduct);
app.use('/api/user',verifyToken, ApiUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;