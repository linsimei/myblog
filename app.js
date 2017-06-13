var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var index = require('./routes/index');
var users = require('./routes/users');
var account = require('./routes/account');
var article = require('./routes/article');
var life = require('./routes/life');
var web = require('./routes/web');
var feeling = require('./routes/feeling');
var introduction = require('./routes/introduction');
var files = require('./routes/files');
var type = require('./routes/type');
var admin = require('./routes/admin');
var manage = require('./routes/manage');
var photo = require('./routes/photo');
var comment = require('./routes/comment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', index);
app.use('/users', users);
app.use('/account', account);
app.use('/article', article);
app.use('/life', life);
app.use('/web', web);
app.use('/feeling', feeling);
app.use('/introduction', introduction);
app.use('/files', files);
app.use("/type", type);
app.use("/admin", admin);
app.use("/manage", manage);
app.use("/photo", photo);
app.use("/comment", comment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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