var models = require('../models/models.js');
// 分类目录控制台

// 分类目录: 小组专区、成果展示、团队历程
exports.category = function(req, res){
    var strUrl = req.url,// 字符串URL,如 /group
        arrayUrl = strUrl.split("/"),// 把字符串以“/”分割成字符串数组
        category = arrayUrl[arrayUrl.length-1],// 获取分类目录的值
        total,// 总文章数
        pagenum, // 页数
        perpagenum = 10,// 每页的条数
        posts = [],
        pages = [];
    // console.log(category);
    models.articles.find({classes: category}, function(err, articles){
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
        res.render('category', {
            title: '新思路团队网站 - NewThread',
            total: total,
            category: category,
            current_page: '1',
            perpagenum: perpagenum,
            pages: pages,
            posts: posts
        });
    });
};
// 分类目录分页
exports.category_page = function(req, res){
    var strUrl = req.url,// 字符串URL,如 /group/page/1
        arrayUrl = strUrl.split("/"),// 把字符串以“/”分割成字符串数组
        category = arrayUrl[1],// 获取分类目录的值
        page = arrayUrl[arrayUrl.length-1],// 获取page的值
        total,// 总文章数
        pagenum, // 页数
        perpagenum = 10,// 每页的条数
        posts = [],
        pages = [];
    if( !isNaN(page) ){// 判断是否是数字
        page = page;
    }else{
        page = 1;
    }
    console.log(category);
    models.articles.find({classes: category}, function(err, articles){
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
            category: category,
            current_page: page,
            perpagenum: perpagenum,
            pages: pages,
            posts: posts
        });
    });
};