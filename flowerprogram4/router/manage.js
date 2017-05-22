/**
 * Created by admin on 2017/3/29.
 */
var mysql_init=require("./mysqlConfig.js");
exports.showManageIndex=function(req,res){
    var userData=[];
    var orderData=[];
    var flowerData=[];
    var WrappData=[];
    var pottedData=[];
    var storyData=[];

    var arr = [];
    //查询user列表
  /*  var sql = "SELECT * FROM USER";
    mysql_init.unit_mysql(sql,{},function(err,data){
        if(err==null && data.length>=1){
         //   userData = data;
            arr.push(data);
            console.log("后台获取到的data：",data);
        /!*    console.log("用户数据：",userData);
            res.render("manageIndex.html",{userDatas:userData});*!/
        }else{
            console.log("查询user列表失败");
        }
    });*/
    //查询order列表
  /*  var sql2 = "SELECT * FROM USER";
    mysql_init.unit_mysql(sql2,{},function(err,data){
        if(err==null && data.length>=1){
            orderData = data;
            console.log("后台获取到的data：",data);
        }else{
            console.log("查询order列表失败");
        }
    });*/
    //商品列表，三个表
    /*1.鲜花列表*/
/*    var sql3 = "SELECT * FROM USER";
    mysql_init.unit_mysql(sql3,{},function(err,data){
        if(err==null && data.length>=1){
            flowerData = data;
            console.log("后台获取到的data：",data);
        }else{
            console.log("查询鲜花列表失败");
        }
    });*/
    /*2.包装纸列表*/
   /* var sql4 = "SELECT * FROM USER";
    mysql_init.unit_mysql(sql4,{},function(err,data){
        if(err==null && data.length>=1){
            WrappData = data;
            console.log("后台获取到的data：",data);
        }else{
            console.log("查询包装纸列表失败");
        }
    });*/
    /*2.盆栽列表*/
   /* var sql5 = "SELECT * FROM USER";
    mysql_init.unit_mysql(sql5,{},function(err,data){
        if(err==null && data.length>=1){
            pottedData = data;
            console.log("后台获取到的data：",data);
        }else{
            console.log("查询盆栽列表失败");
        }
    });*/
    //故事列表
/*    var sql6 = "SELECT * FROM story s JOIN USER u";
    mysql_init.unit_mysql(sql6,{},function(err,data){
        if(err==null && data.length>=1){
            storyData = data;
            console.log("后台获取到的data：",data);
        }else{
            console.log("查询故事列表失败");
        }
    });*/
   // userData = arr[0];
 //   console.log("用户数据：",userData);
 //   res.render("manageIndex.html",{userDatas:userData});
    res.render("manageIndex.html",{});
  //  res.render("manageIndex.html",{userDatas:userData,orderDatas:orderData,flowerDatas:flowerData,WrappDatas:WrappData,pottedDatas:pottedData,storyDatas:storyData});
}



exports.loadUserList = function(req,res){
   var sql = "SELECT * FROM USER";
    mysql_init.unit_mysql(sql,{},function(err,data){
        if(err==null && data.length>=1){

            res.send(data);

        }else{
          console.log("查询user表出现错误");
        }
    });
}

exports.loadOrderList = function(req,res){
    var sql = "SELECT order_id,order_allMoney,order_cycle,order_cardtext,u.`user_name`,s.address_name,s.address_person_name,s.address_person_tel,g.goods_name FROM orders o JOIN USER u ON o.`user_id` = u.`user_id` JOIN address s ON u.`user_id`= s.`user_id` JOIN collection c ON c.user_id = u.`user_id` JOIN goods g ON g.goods_id = c.goods_id";
    mysql_init.unit_mysql(sql,{},function(err,data){
        if(err==null && data.length>=1){

            res.send(data);

        }else{
            console.log("查询order表出现错误");
        }
    });
}
exports.loadStoryList = function(req,res){
    var sql = "SELECT  * FROM story s JOIN USER u ON s.`user_id`=u.`user_id`";
    mysql_init.unit_mysql(sql,{},function(err,data){
        if(err==null && data.length>=1){
            res.send(data);
        }else{
            console.log("查询user表出现错误");
        }
    });
}
exports.loadFlowerList = function(req,res){
    var sql = "SELECT * FROM Flower";
    mysql_init.unit_mysql(sql,{},function(err,data){
        if(err==null && data.length>=1){
            res.send(data);
        }else{
            console.log("查询user表出现错误");
        }
    });
}
exports.loadFlowerList = function(req,res){
    var sql = "SELECT * FROM Flower";
    mysql_init.unit_mysql(sql,{},function(err,data){
        if(err==null && data.length>=1){
            res.send(data);
        }else{
            console.log("查询user表出现错误");
        }
    });
}
exports.loadWrapList = function(req,res){
    var sql = "SELECT * FROM WRAPPER";
    mysql_init.unit_mysql(sql,{},function(err,data){
        if(err==null && data.length>=1){
            res.send(data);

        }else{
            console.log("查询WRAPPER表出现错误");
        }
    });
}
exports.loadPottedList = function(req,res){
    var sql = "SELECT * FROM potted";
    mysql_init.unit_mysql(sql,{},function(err,data){
        if(err==null && data.length>=1){
            res.send(data);

        }else{
            console.log("查询potted表出现错误");
        }
    });
}

exports.loadGiftList = function(req,res){
    var sql = "SELECT * FROM gift";
    mysql_init.unit_mysql(sql,{},function(err,data){
        if(err==null && data.length>=1){
            res.send(data);

        }else{
            console.log("查询gift表出现错误");
        }
    });
}

exports.delUser = function(req,res){
    var userId = req.body.user_id;
    console.log("从前台传到后台的userid："+userId);
    var param = [];
    if(userId!=null&&userId!="") param.push(userId);
    var sql = "DELETE FROM USER WHERE user_id=?";
    mysql_init.unit_mysql(sql,param,function(err,data){
        if(err==null){
            res.send(data);
        }else{
            console.log("删除user表中的数据出现错误");
        }
    });
}
exports.delFlower = function(req,res){
    var flower_id = req.body.flower_id;
    console.log("从前台传到后台的flower_id："+flower_id);
    var param = [];
    if(flower_id!=null&&flower_id!="") param.push(flower_id);
    var sql = "DELETE FROM flower WHERE flower_id=?";
    mysql_init.unit_mysql(sql,param,function(err,data){
        if(err==null){
            res.send(data);
        }else{
            console.log("删除鲜花表中的数据出现错误");
        }
    });
}
exports.delWrapper = function(req,res){
    var wrapper_id = req.body.wrapper_id;
    console.log("wrapper_id："+wrapper_id);
    var param = [];
    if(wrapper_id!=null&&wrapper_id!="") param.push(wrapper_id);
    var sql = "DELETE FROM WRAPPER WHERE wrapper_id=?";
    mysql_init.unit_mysql(sql,param,function(err,data){
        if(err==null){
            res.send(data);
        }else{
            console.log("删除包装纸中的数据出现错误");
        }
    });
}

exports.delPotted = function(req,res){
    var potted_id = req.body.potted_id;
    console.log("potted_id："+potted_id);
    var param = [];
    if(potted_id!=null&&potted_id!="") param.push(potted_id);
    var sql = "DELETE FROM potted WHERE potted_id=?";
    mysql_init.unit_mysql(sql,param,function(err,data){
        if(err==null){
            res.send(data);
        }else{
            console.log("删除盆栽中的数据出现错误");
        }
    });
}
exports.delGift = function(req,res){
    var gift_id = req.body.gift_id;
    console.log("gift_id："+gift_id);
    var param = [];
    if(gift_id!=null&&gift_id!="") param.push(gift_id);
    var sql = "DELETE FROM gift WHERE gift_id=?";
    mysql_init.unit_mysql(sql,param,function(err,data){
        if(err==null){
            res.send(data);
        }else{
            console.log("删除礼盒中的数据出现错误");
        }
    });
}

exports.delStory = function(req,res){
    var story_id = req.body.story_id;
    console.log("story_id："+story_id);
    var param = [];
    if(story_id!=null&&story_id!="") param.push(story_id);
    var sql = "DELETE FROM story WHERE story_id=?";
    mysql_init.unit_mysql(sql,param,function(err,data){
        if(err==null){
            res.send(data);
        }else{
            console.log("删除故事中的数据出现错误");
        }
    });
}
exports.editUser = function(req,res){
    var user_id = req.body.user_id;
    var user_name =  req.body.user_name;
    var user_password = req.body.user_password;
    var user_email = req.body.user_email;
    var user_telphone = req.body.user_telphone;
    var user_money = req.body.user_money;

    console.log("user_id："+user_id);
    console.log("user_name："+user_name);
    console.log("user_password："+user_password);
    console.log("user_email："+user_email);
    console.log("user_telphone："+user_telphone);
    console.log("user_money："+user_money);

    var param = [];
    param.push(user_name);
    param.push(user_password);
    param.push(user_email);
    param.push(user_telphone);
    param.push(user_money);
    param.push(user_id);
    var sql = "UPDATE USER SET user_name=?,user_password=?,user_email=?,user_telphone=?,user_money=? WHERE user_id=?";
    mysql_init.unit_mysql(sql,param,function(err,data){
        if(err==null){
            res.send(data);
        }else{
            console.log("修改user表中的数据出现错误");
        }
    });
}