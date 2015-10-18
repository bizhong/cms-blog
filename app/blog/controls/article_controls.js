var article = require('../models/models').articles;
exports.getArticle = function(req,res){
	var id = req.params.id;
	article.findOne({_id: id}).exec(
		function(err,thisArticle){
			if (err) {
				console.log(err);
			};
			var visitor = [],users = [],tags = [];
			for(var i = 0;i<thisArticle.comments.visitor.length;i++){//将获得的数据遍历成数组
				visitor[i] = thisArticle.comments.visitor[i];
			}
			for(var i = 0;i<thisArticle.comments.users.length;i++){
				users[i] = thisArticle.comments.users[i];
			}
			var ccomment = users.concat(visitor);
			ccomment.sort(function(a,b){
				return b.time - a.time;
			})
			for(var i = 0;i<thisArticle.tag.length;i++){
				tags[i] = thisArticle.tag[i];
			}
			var commentsLen = thisArticle.comments.visitor.length + thisArticle.comments.users.length;
			res.render('article',{
				title:'egg文章页',
				art_title:thisArticle.title,
				art_author:thisArticle.author,
				art_id:thisArticle.id,
				art_content:thisArticle.content,
				art_time:thisArticle.time,
				art_files:thisArticle.files,
				art_comments:ccomment,
				art_tags:tags
			})
		}
	)
		
}
exports.commentsSave = function(req,res){
	var visitorEmail = req.body.emial;
	var articleId = req.body.articleId;
	var content = req.body.contents;
	var userName = req.body.userName;
	if(visitorEmail){
			article.findOne({_id: articleId}).exec(
			function(err,Article){
			Article.comments.visitor.push({
				userEmail: visitorEmail,
	            content: content,
	            time: Date.now()
			});
			Article.save(function(err,Article){
				if (err) {console.log(err)};
			})
		})
	}else if (userName){
		article.findOne({_id:articleId}).exec(
			function(err,Article){
			Article.comments.users.push({
				userName: userName,
	            content: content,
	            time: Date.now()
			});
			Article.save(function(err,Article){
				if (err) {console.log(err)};
			})
		}
		)
	}
	res.redirect('/article/'+articleId);
}
