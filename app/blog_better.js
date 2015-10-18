var cluster = require('cluster');

var startWorker = function(){
    var worker = cluster.fork();
    console.log('线程%d开始工作\n', worker.id);
};

if(cluster.isMaster){
    require('os').cpus().forEach(function(){
        startWorker();
    });
    // 记录所有断开的工作线程。如果工作线程断开了，它应该退出，
    // 因此我们可以等待exit事件然后繁衍  一个新工作线程来代替它
    cluster.on('disconnect', function(worker){
        console.log('工作线程%d断开\n', worker.id);
    });
    // 当有工作线程死掉（退出）时，创建一个工作线程代替它
    cluster.on('exit', function(worker, code, signal){
        console.log('线程%d退出，代码号%d(%s)\n', worker.id, code, signal);
        startWorker();
    });
}
else{
    // 在这个工作线程上启动我们的应用服务器
    require('./blog.js')();
}