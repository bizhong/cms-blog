var models = require('../models/models.js');
// 首页控制台

// 首页
exports.home = function(req, res){
    var total,// 总文章数
        pagenum,// 页数
        perpagenum = 10,// 每页的条数
        posts = [],
        pages = [];
    // console.log(page);
    models.articles.find({}, function(err, articles){
        articles = articles.reverse();// 颠倒数组中元素的顺序
        total = articles.length;
        pagenum = Math.ceil(total / perpagenum);// 对页数进行上舍入
        // console.log(pagenum);
        for(var i = 0,len = pagenum; i < len; i++){
            pages[i] = i + 1;
        }
        for(var i = 0,len = (perpagenum < total ? perpagenum : total); i < len; i++){
            posts[i] = articles[i];
        }
        res.render('home', {
            title: '新思路团队网站 - NewThread',
            total: total,
            category: 'home',
            current_page: '1',
            perpagenum: perpagenum,
            pages: pages,
            posts: posts
        });
    });
};
// 首页分页
exports.home_page = function(req, res){
    var strUrl = req.url,// 字符串URL,如 /home/page/1
        arrayUrl = strUrl.split("/"),// 把字符串以“/”分割成字符串数组
        page = arrayUrl[arrayUrl.length-1],// 获取page的值
        total,// 总文章数
        pagenum,// 页数
        perpagenum = 10,// 每页的条数
        posts = [],
        pages = [];
    if( !isNaN(page) ){// 判断是否是数字
        page = page;
    }else{
        page = 1;
    }
    // console.log(page);
    models.articles.find({}, function(err, articles){
        articles = articles.reverse();// 颠倒数组中元素的顺序
        total = articles.length;
        pagenum = Math.ceil(total / perpagenum);// 对页数进行上舍入
        // console.log(pagenum);
        for(var i = 0,len = pagenum; i < len; i++){
            pages[i] = i + 1;
        }
        for(var i = (page-1) * perpagenum,j = 0,len = (page * perpagenum < total ? page * perpagenum : total); i < len; i++,j ++){
            posts[j] = articles[i];
        }
        res.render('page', {
            title: '新思路团队网站 - NewThread',
            total: total,
            category: 'home',
            current_page: page,
            perpagenum: perpagenum,
            pages: pages,
            posts: posts
        });
    });
};