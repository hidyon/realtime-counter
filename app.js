/**
 * realtime counter
 * 
 * 概要
 * 
 *  /rooms の同時接続人数のカウント、通知、上限以上接続した場合リダイレクトをするサンプルアプリケーション 
 *  同時接続数はsocket.ioのコネクション数とする
 * 
 *  サーバー側の仕様
 *  /        現在接続数はカウントされない
 *  /users   現在接続数はカウントされない
 *  /rooms   現在接続数をカウントし接続者に通知する、上限以上接続した場合はルートへリダイレクト
 *
 * 
 *  クライアント側の仕様
 *  /rooms をリクエストしたあとで、websocketの接続を要求すること
 * 
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);

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

const server = require('http').createServer(app)
const io = require('./socketio').createIo(server)
server.listen(3000)

//module.exports = app;
