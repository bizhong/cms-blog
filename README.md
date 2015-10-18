# 实验室内容管理系统

## 说在前面
1. 请使用`git clone git@github.com:FeWeb/Blog.git`克隆这个库
2. 克隆完之后，在本地创建dev分支，`git checkout -b dev origin/dev`
3. 为确保是在dev分之下修改，每次提交修改前执行：`git checkout dev`
4. 提交修改：`git add -A`, `git commit -m "<提交说明>"`
5. 提交后在本地的dev分之上上传到dev分支：`git push origin dev`
6. 若出现冲突，请先使用`git pull`查看冲突
7. Windows图形界面用户请自行查找教程

## 项目结构
```
- Blog(项目根目录)
    |- app(应用程序根目录)
        |- blog(应用程序MVC化)
            |- controls(控制器)
            |- models(模型)
                |- models.js(模型的定义与绑定)
            |- routes(路由)
                |- admin_routes(后台的所有路由写这里)
                |- routes(前端的所有路由写这里)
            |- views(视图)
                |- layouts
                    |- main.html(所有前端页面的母版)
                |- admin.html(管理员操作界面)
                |- admin_login.html(管理员登录界面)
                |- ......(前端的其他模版写在这里)
        |- config(应用程序参数配置文件)
            |- config.js(参数设置)
            |- init.js(应用程序初始化文件)
        |- middleware(自定义中间件)
            |- ...
        |- publics(应用程序静态文件)
            |- files
            |- images(图片所在目录)
            |- script(javascript脚本所在地)
            |- styles(css脚本所在地)
            |- test_statics(单元测试脚本所在地)
        |- tests(应用程序单元测试脚本)
        |- uploads(将上传的文件放到这里)
        |- blog.js(应用程序主文件)
        |- blog_better.js(应用程序多线程，生产环境强烈推荐使用)
        |- package.json
    |- document(项目文档)
    |- README.md(项目说明)
    |- .gitignore(这里说明了那些文件及文件夹不上传到代码库里面)
```
## 前端开发需要学习的内容
* swig(模版引擎，用在html文件中)
[教程](http://www.cnblogs.com/elementstorm/p/3142644.html)
* bootstrap(这个不用多说，强烈推荐使用)
[Bootstrap中文网](http://www.bootcss.com/)
* less(最好学会用这个写css)
[Less教程](http://www.bootcss.com/p/lesscss/)
* express + body-parser(表单处理时要用)
[Github - body-parser](https://github.com/expressjs/body-parser)
* express + formidable(上传文件时要用)
[Github - formidable](https://github.com/felixge/node-formidable)
* cookie-parser + express-session(登录、会话时要用到)
[Github - cookie-parser](https://github.com/expressjs/cookie-parser)
[Github - express-session](https://github.com/expressjs/session)
* mongoose(与数据库交互时要用到)
[教程](https://cnodejs.org/topic/504b4924e2b84515770103dd)

## 前端开发流程
1. 将路由请求写在routes.js文件里；
2. 路由处理的回调函数分离开来，写在controls文件夹里的某个文件里；
3. 写controls的时候对数据库的操作，并用res.render渲染到模版里；
4. 在views文件夹里写好模版；
5. 将模版要用到的js和css文件以及图片都写到publics里面
6. 表单上传的文件存到uploads文件夹里

## 规范
> 1. 注意将开发过程中的代码传到`dev`分支,命令：`git push origin dev`；
> 2. 注意设置`.gitignore`文件，不要将缀余文件上传上来；
> 3. 一个缩进请用4个空格，不要用`tab`；
> 4. 一定要注释，代码要写得易看；
> 5. 本系统采用模块化开发，一定要遵守；

## 已上传的版本有一个MVC的例子，可以看看，以后我会多写一些例子供参考