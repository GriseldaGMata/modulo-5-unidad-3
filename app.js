var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool=require('./models/bd');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const PoolCluster = require('mysql/lib/PoolCluster');
const { mainModule } = require('process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//MIS CONSULTAS
//SELECT 
// pool.query('select * from clientes').then(function(resultados){
//   console.log(resultados);
// });

//INSERT
// var obj={
//   nombre:'Griselda',
//   apellido: 'Gonzalez de La Mata',
//   profesion: 'Developer Full stack',
//   edad:'46',
//   salario:'500000',
//   email:'zmiomioz@mail.com'
// }
// pool.query("insert into clientes set ?", [obj]).then(function(resultados){
//   console.log(resultados)
// });

//UPDATE
// var id=1;
// var obj={
//   nombre:'Juana Martina',
//   apellido:'Gonzalez de la Mata',
//   email:'juanagdlmata@mail.com'
// }
// pool.query("update clientes set ? where id_cliente=?", [obj,id]).then(function(resultados){
//   console.log(resultados);
// });

//DELETE
// var id=23;
// pool.query("delete from clientes where id_cliente=?", [id]).then(function(resultados){
//   console.log(resultados);
// });

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
