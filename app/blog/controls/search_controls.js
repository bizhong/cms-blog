var models = require('../models/models.js');
// 搜索控制台

//搜索
exports.search = function(req, res){
    var s = req.query.s,// 获取输入的关键字。如果是POST方式，语句为 s = req.body.s
        submit = req.query.submit,// 模糊搜索。如果是POST方式，语句为submit = req.body.submit
        regex = eval('/' + s + '/'),// 正则表达式中使用变量，使用eval()将组合的字符串进行转换
        titles = [],// 该数组用于存放与标题相关的文章
        authors = [],// 该数组用于存放与作者相关的文章
        tags = [],// 该数组用于存放与标签相关的文章
        contents = [];// 该数组用于存放与内容相关的文章
        // if(s.charAt(s.length-1) === "/"){
        //     regex = eval('/' + s);
        // }else{
        //     regex = eval('/' + s + '/')
        // }
    console.log(s);
    console.log(submit);
    if(s.length){
        if(submit === "精确搜索"){
            models.articles.find({title: regex}, function(err, articles){// 查询与标题相关的文章
            if(err) return console.error(err);
            // for(var i = 0,len = articles.length; i < len; i++){
            //     titles[i] = articles[len-i-1];
            // }
            titles = articles.reverse();
        });
        models.articles.find({author: regex}, function(err, articles){// 查询与作者相关的文章
            if(err) return console.error(err);
            authors = articles.reverse();
        });
        models.articles.find({tag: regex}, function(err, articles){// 查询与标签相关的文章
            if(err) return console.error(err);
            tags = articles.reverse();
            res.render('search', {
                title: '搜索结果 - 新思路团队网站',
                s: s,
                submit: submit,
                titles: titles,
                authors: authors,
                tags: tags
            });
        });
        }else{
            models.articles.find({content: regex}, function(err, articles){// 查询与内容相关的文章
            if(err) return console.error(err);
            contents = articles.reverse();
            res.render('search', {
                title: '搜索结果 - 新思路团队网站',
                s: s,
                submit: submit,
                contents: contents
            });
        });
        }
        
    }else{
        console.log('输入不能为空');
        res.render('search', {
            title: '搜索结果 - 新思路团队网站',
            err: true,
            signal: '输入不能为空'
        });
    }
};