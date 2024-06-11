var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require("./routes/users");              
var approveRouter = require('./routes/approve');                  // เส้นทาง approve [PUT] /api/v1/approve/:id
var productsRouter = require('./routes/products');                // เส้นทาง products[POST] /api/v1/products
var ordersRouter = require('./routes/orders');                // เส้นทาง products[POST] /api/v1/products
var loginRouter = require('./routes/login');



require("dotenv").config()

var app = express();
const mongoose = require('mongoose');                             //เชื่อมdatadase
const {DB_HOST , DB_PORT , DB_NAME } = process.env      
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);   //เชื่อมdatadase



//  var loginRouter = require('./routes/login');  
// // เพิ่มเส้นทางสำหรับ login
//  app.use('/api/v1', loginRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);         
app.use('/api/v1/approve', approveRouter);                              // เส้นทาง approve [PUT] /api/v1/approve/:id
app.use('/api/v1', productsRouter);      
app.use('/api/v1', ordersRouter) ;                   // เส้นทาง products[POST] /api/v1/products
app.use('/api/v1/login', loginRouter) ;

//catch 404 and forward to error handler
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
