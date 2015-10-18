var app = require('express')();
// 单元测试中间件
module.exports = function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
};