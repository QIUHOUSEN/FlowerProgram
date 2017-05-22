/**
 * Created by Administrator on 2016/9/29.
 */
var cookie = require("cookie-parser");
var session = require("express-session");
var express = require("express");
var ejs = require("ejs");

var user = require("./router/user.js");
var order = require("./router/order.js");
var mygood = require("./router/goods.js");
var manage = require("./router/manage.js");
var personalPage = require("./router/personalPage.js");
/*===============田田===================*/
var list=require("./router/list.js");

/*===========================*/
var good = require("./router/good.js");
var lihe = require("./router/lihe.js");
var huapen=require("./router/penzai.js");
var baozhuangzhi=require("./router/baozhuangzhi.js");
var fDJs = require("./router/fD.js");
var qxJs = require("./router/qx.js");
var PtJs = require("./router/Pt.js");
var qx = require("./router/qx.js");
/*=========邱============*/
var myuser = require("./router/user.js");
var indexImgs = require('./router/indexImgs.js');
var personalPage = require('./router/personalPage.js');
/*=====================*/
var app=express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.set("views",__dirname+"/public/views");//设置视图模板路径
app.engine("html",ejs.__express);//设置视图模板的文件类型。
app.set("views engine","html");//启动视图模板引擎 由于ejs提示功能没有html好，所以这里还是html后缀格式

app.configure(function(){
    app.use(express.logger("dev"));
    //cookie和session一般写在比较靠前的地方
    app.use(cookie());
    app.use(session({
       secret:"123456",//编码秘钥
       name:"mycookie",//设置cookie的名称。默认值为connect.sid
        cookie:{
            rolling:true,//是否更新session-cookie的实效时间。
            resave:false,//重新获取session-cookie会导致有效时间重头计算
            maxAge:3000000//表示的是cookie的有效时间
        }//配置的参数在会响应到客户端
    }));//session在使用时候需要传参 这里传入一个对象
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname+"/public"));
    app.use(express.errorHandler());
});
/**********************************************************/
/************************在线聊天socket.io*********************/
/**********************************************************/

//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;

io.on('connection', function(socket){
    console.log('a user connected');

    //监听新用户加入
    socket.on('login', function(obj){
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userid;

        //检查在线列表，如果不在里面就加入
        if(!onlineUsers.hasOwnProperty(obj.userid)) {
            onlineUsers[obj.userid] = obj.username;
            //在线人数+1
            onlineCount++;
        }

        //向所有客户端广播用户加入
        io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
        console.log(obj.username+'加入了聊天室');
    });

    //监听用户退出
    socket.on('disconnect', function(){
        //将退出的用户从在线列表中删除
        if(onlineUsers.hasOwnProperty(socket.name)) {
            //退出用户的信息
            var obj = {userid:socket.name, username:onlineUsers[socket.name]};

            //删除
            delete onlineUsers[socket.name];
            //在线人数-1
            onlineCount--;

            //向所有客户端广播用户退出
            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
            console.log(obj.username+'退出了聊天室');
        }
    });

    //监听用户发布聊天内容
    socket.on('message', function(obj){
        //向所有客户端广播发布的消息
        io.emit('message', obj);
        console.log(obj.username+'说：'+obj.content);
    });

});
/**********************************************************/
/********************在线聊天socket.io  end******************/
/**********************************************************/

app.listen(8888,function(){
    console.log("服务器正在运行中，端口号为8888");
});
/*后台管理页面*/
/*app.get("/manageIndex.html",manage.showManageIndex);*/
app.get("/loadUserList.do",manage.loadUserList);
app.get("/loadStoryList.do",manage.loadStoryList);
app.get("/loadFlowerList.do",manage.loadFlowerList);
app.get("/loadWrapList.do",manage.loadWrapList);
app.get("/loadPottedList.do",manage.loadPottedList);
app.get("/loadGiftList.do",manage.loadGiftList);
app.get("/loadOrderList.do",manage.loadOrderList);
app.post("/delUser.do",manage.delUser);
app.post("/delFlower.do",manage.delFlower);
app.post("/editUser.do",manage.editUser);
app.post("/delWrapper.do",manage.delWrapper);
app.post("/delPotted.do",manage.delPotted);
app.post("/delGift.do",manage.delGift);
app.post("/delStory.do",manage.delStory);



/*===========田=============*/
app.get("/MotherDay.html",mygood.list);
app.get("/sh.html",list.list);
app.get("/huayu.html",mygood.showHuaYu);
app.get("/cycleBuy.html",mygood.showCycleBuy);
app.post("/list.do",list.list);
/*=============邱======================*/
app.post("/regin.do",myuser.regin);
app.post("/login.do",myuser.login);
app.get('/personal.html',personalPage.myOrder);
app.post('/goBack.do',personalPage.goBack);
app.post('/headImg.do',personalPage.headImg);
app.get('/html/index.html',function(req,res,next){
    console.log("检测"+req.session.username+" "+req.session.pwd);
    //console.log("cookie:"+req.cookies);
    if(req.session.username==undefined){
        //res.redirect("/login.html")
        console.log('空空');
        next();
        //res.redirect('/html/index.html');
    }else{
        console.log("sdgasdgsdgdsg"+req.session.username);
    }
});
app.get('/loginStatus.do',myuser.checkStatus);
//这是ejs的部分拦截
app.get('/index.html',indexImgs.selectImgs);
/*=====================================*/


app.get("/shoppingCart.html",mygood.addCart);
app.get("/goodDetails.html",mygood.findDetail);
app.get("/cycleDetails.html",mygood.findCycleDetail);
app.get("/orderSubmit.html",mygood.showOrderList);
app.get("/orderGoods.html",mygood.showOrderGoods);

app.post("/addCart.do",mygood.canAddCart);
app.post("/collection.do",mygood.addCollection);
app.post("/changeOrderImg.do",order.changeOrderImg);
app.post("/findCountPage.do",order.findCountPage);
app.post("/changeNum.do",mygood.changeCartNumber);
app.post("/delOneGood.do",mygood.delOneGood);
app.post("/dellMoreGood.do",mygood.dellMoreGood);
app.post("/addOrderList.do",mygood.addOrderList);
app.post("/insertOrderList.do",mygood.insertOrderList);
app.post("/updateAddr.do",mygood.updateAddr);

/*====================3个组员=======================*/
app.get("/birthday.html",good.showImg);/*生日页面显示图片*/
app.get("/wedding.html",good.showImg1);/*求婚页面显示图片*/
app.get("/festival.html",good.showImg3);
/*app.post("/send.do",good.sendImg);*/


app.get("/lihe.html",lihe.showImg);
app.get("/huapen.html",huapen.showImg);
app.get("/BaoZhuangZhi.html",baozhuangzhi.showImg);
app.post("/sendImg.do",mygood.sendImg);
/*app.post("/send2.do",lihe.sendImg);
app.post("/send3.do",huapen.sendImg);*/



app.get("/qixi.html",qxJs.showImg);
app.get("/faD.html",fDJs.showImg);
app.get("/Pt.html",PtJs.showImg);
app.post("/register.do",PtJs.registerPost);
app.post("/ajaxLogin.do",PtJs.ajaxLogin);
/*app.post("/send.do",qx.sendImg);
app.post("/send1.do",fDJs.sendImg);*/

//修改联系方式：
app.post("/changelx.do",personalPage.changelx);



