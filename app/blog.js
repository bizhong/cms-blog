// 加载npm包
var app = require('express')();
var mongoose = require('mongoose');
var MongoSessionStore = require('session-mongoose')(require('connect'));
// 加载Node模块
var config = require('./config/config.js'); //参数设置文件
var domain = require('./middleware/error.js'); //域处理异常
var thread = require('./middleware/cluster.js'); //多线程显示
var test = require('./middleware/test.js'); //单元测试
var admin_routes = require('./blog/routes/admin_routes.js'); //加载管理员页面路由
var routes = require('./blog/routes/routes.js');

var sessionStore = new MongoSessionStore({url: config.mongo.connectionString});

// 初始化配置
require('./config/init.js')(app, mongoose);

// 设置模版引擎
app.engine('html', config.template.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/blog/views');
// 设置端口号
app.set('port', config.PORT);
// 加载域处理未捕获异常中间件
app.use(domain);
// 加载多线程显示中间件
app.use(thread);
// 加载单元测试中间件
app.use(test);

// 加载中间件

// 加载设置静态文件目录的中间件
app.use(require('express').static(__dirname + '/publics'));
// 加载表单处理中间件
app.use(require('body-parser')());
// 加载cookie-parser来设置和访问cookie
app.use(require('cookie-parser')(config.cookieSecret));
// 加载会话
app.use(require('express-session')({store: sessionStore}));

// 路由
admin_routes(app);
routes(app);

// 处理异常
// 定制404页面
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

// 定制500页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// 服务器集群
var startServer = function(){
    app.listen(app.get('port'), function(){
        console.log('Express started in ' + app.get('env') + ' mode on http://localhost:' + app.get('port') + '; Press Ctrl + C to exit.');
    });
};
if (require.main === module) {
    // 应用程序直接运行；启动应用服务器
    startServer();
}
else{
    // 应用程序作为一个模块被导入
    module.exports = startServer;
}