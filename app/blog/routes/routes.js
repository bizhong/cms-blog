var home = require('../controls/home_controls.js');
var category = require('../controls/category_controls.js');
var search = require('../controls/search_controls.js');
var article = require('../controls/article_controls.js');

module.exports = function(app){
    // 首页
    app.get('/home', home.home);
    // 首页分页
    app.get('/home/page*', home.home_page);
    
    //分类目录
    // 小组专区
    app.get('/group', category.category);
    // 成果展示
    app.get('/achieve', category.category);
    // 团队历程
    app.get('/team', category.category);

    // 小组专区分页
    app.get('/group/page*', category.category_page);
    // 成果展示分页
    app.get('/achieve/page*', category.category_page);
    // 团队历程分页
    app.get('/team/page*', category.category_page);

    // 搜索
    app.get('/search', search.search);

    // 文章页
    app.get('/article/:id', article.getArticle);
    app.post('/article/comments', article.commentsSave);
};