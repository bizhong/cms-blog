// 参数设置
module.exports = {
    // 模版设置
    template: require('swig'),
    // 服务器端口号
    PORT: process.env.PORT || 3000,
    // Cookie码
    cookieSecret: 'riLbqTemd3NAdUBwUU7nfsuteqwapN',
    // Mongodb设置
    mongo: {
        // 开发时用的数据库
        'development': {
            connectionString: 'mongodb://localhost/blog'
        },
        // 生产时用的数据库
        'production': {
            connectionString: 'mongodb://localhost/blog' //有待修改
        },
        opts: {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    }
};