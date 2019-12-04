var createError = require('http-errors'); // 错误页处理
var express = require('express'); //
var path = require('path');
var cookieParser = require('cookie-parser'); // 解析cookie 类似原生中 split(;)的过程
var logger = require('morgan'); // 记录日志

// 引用路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

// 本次http请求实例
var app = express();

// // view engine setup // 注册视图引擎
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json()); // 获取 postData 赋到 req.body
app.use(express.urlencoded({extended: false})); // 兼容 post数据
app.use(cookieParser()); // 解析 cookie
// app.use(express.static(path.join(__dirname, 'public'))); // 注册静态文件

// 处理路由 访问不在路由内，则404
// app.use('/', indexRouter); // 注册路由 拼接路径
// app.use('/users', usersRouter); // (父路径，子路径(在路由文件中有体现))
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
