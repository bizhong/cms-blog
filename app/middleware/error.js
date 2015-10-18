// 处理未捕获的异常
module.exports = function(req, res, next){
    // 为这个请求创建一个域
    var domain = require('domain').create();
    // 处理这个域中的错误
    domain.on('error', function(err){
        console.error('域错误\n', err.stack);
        try{
            // 在5秒内进行故障保护关机
            setTimeout(function(){
                console.error('安全关机\n');
                process.exit(1);
            },5000);
            // 从集群中断开
            var worker = require('cluster').worker;
            if(worker){
                worker.disconnect();
            }
            // 停止接收新请求
            server.close();
            try{
                // 尝试使用Express错误路由
                next(err);
            }
            catch(err){
                // 如果Express错误路由失效，尝试返回普通文本响应
                console.error('Express内部错误.\n', err.stack);
                res.statusCode = 500;
                res.setHeader('content-type', 'text/plain');
                res.end('服务器内部错误.');
            }
        }
        catch(err){
            console.error('无法发送500错误响应.\n', err.stack);
        }
    });
    // 向域中添加请求和相应对象
    domain.add(req);
    domain.add(res);
    // 执行该域中的剩余请求链
    domain.run(next);
};