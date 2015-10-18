// 多线程显示中间件
module.exports = function(req, res, next){
    var cluster = require('cluster');
    if(cluster.isWorker){
        console.log('线程%d接收请求数据\n', cluster.worker.id);
    }
    next();
};