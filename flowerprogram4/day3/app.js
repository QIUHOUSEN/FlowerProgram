/**
 * Created by Administrator on 2016/9/20.
 */
var userJs = require('./router/user.js');
var searchImgs = require('./router/searchImgs.js');

var express = require("express");//引用express模块
var app = express();//创建服务器
app.set("port",8888);//这是端口号
app.configure(function(){//配置服务器
    app.use(express.logger("dev"));//设置日志中间件，dev表示开发模式
    app.use(express.bodyParser());//处理post请求的数据
    app.use(express.methodOverride());//把非post请求转化成post请求
    app.use(app.router);//设置服务器路由模块
    app.use(express.static(__dirname+"/public"));//设置项目中静态资源目录
    //__dirname,代表当前项目的根目录
    app.use(express.errorHandler());//发生错误时，把错误信息打印显示在控制台
});

app.listen(app.get('port'),function(){
    console.log('监听到');
});

app.post("/login.do",userJs.login);
app.post('/register.do',userJs.register);
app.post('/showPhoto.do',searchImgs.findImgs);
app.post('/searchCount.do',searchImgs.countPage);
app.post('/showType.do',searchImgs.searchTypes);
app.post('/searchCountType.do',searchImgs.searchCount);









