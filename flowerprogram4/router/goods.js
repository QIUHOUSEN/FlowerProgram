/**
 * Created by Administrator on 2016/10/8.
 */
var mysql=require("./mysqlConfig.js");
/*var good=[];*/
/*===========传图片id和goodType过来==========*/
var goodType="";
var imgId=0;
exports.sendImg=function(req,res){
    console.log("JIN如拦截sendImg");
    imgId = req.body.imgId;
    goodType=req.body.goodType;
    if(goodType=="包装纸"){
        goodType="包装纸";
    }else if(goodType=="花"){
        goodType="花";
    }else if(goodType=="礼盒"){
        goodType="礼盒";
    }else if(goodType=="包装纸"){
        goodType="包装纸";
    }
};


/*========点击查看详情，进入详情页面动态更新页面内容======*/
exports.findDetail=function(req,res){
    //1.需要知道点击的是哪个大的类别，通过传过来的图片id查询到goods_name
    //2.根据大的类别，动态更改页面商品需要显示的信息
    //3.根据需要的内容将数据发送到页面
//需要传给我图片id和类别（花，盆栽，礼盒，包装纸）
    var param=[];
    //goodType = "包装纸";//假设分类为花
    // var f_id=1;//花对应的花的表里面图片的id
    // var gift_id=1;
    var type_id=imgId;
    console.log("type_id："+type_id);
    var datas=[];
    if(goodType!=null && goodType!="") datas.push(goodType);
    /*if(f_id!=null && f_id!="") param.push(f_id);*/
    if(type_id!=null && type_id!="") param.push(type_id);
    //根据给出的花的类别判断出执行的sql
    if(goodType=="花") {
        //flower_describe
        //flower_src
        //flower_name
        //flower_price
        //--------------flower_color
        var sql = "SELECT * FROM flower WHERE flower_id=?";
    }else if(goodType=="盆栽") {
        //potted_describe
        //potted_src
        //potted_name
        //potted_price
        var sql = "SELECT * FROM potted WHERE potted_id=?";
    }else if(goodType=="礼盒") {
        console.log("判断为礼盒");
        // gift_describe
        //gift_src
        //gift_price
        //gift_name
        //----gift_color
        //----gift_size 基本都需要
        var sql = "SELECT * FROM gift WHERE gift_id=?";
    }else if(goodType=="包装纸") {
        //wrapper_describe
        //wrapper_src
        //------wrapper_color;
        //wrapper_name
        //wrapper_price
        var sql = "SELECT * FROM wrapper WHERE wrapper_id=?";
    }
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null&&data.length>0){
            good=data;
            console.log("data.length"+data.length);
            datas.push(data[0]);
            console.log("sql查到的data："+data[0]);
            res.render("goodDetails.html",{datas:datas});
        }else{
            console.log("查询出错了");
        }
    });
}
/*==============查询周期购详情===========*/
exports.findCycleDetail=function(req,res){
    var param = [];
    var sql = "SELECT * FROM flower WHERE flower_name='康乃馨' LIMIT 3 ";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null&&data.length>0){
            res.render("cycleDetails.html",{data:data});
        }else{
        }
    });
}
/*===============添加收藏==================*/
exports.addCollection=function(req,res){
    var uname = req.session.username;
    var type_id=req.body.type_id;
    var param=[];
    if(type_id!=null&&type_id!="")
        param.push(type_id);
    if(uname!=null && uname!="")
        param.push(uname);
    if(goodType=="花"){
        var sql="SELECT * FROM collection WHERE goods_id=(SELECT goods_id FROM flower " +
            "WHERE flower_id=?) AND user_id=(SELECT user_id FROM USER WHERE user_name=?) and flag=0";
    }else if(goodType=="礼盒"){
        var sql="SELECT * FROM collection WHERE goods_id=(SELECT goods_id FROM gift " +
            "WHERE gift_id=?) AND user_id=(SELECT user_id FROM USER WHERE user_name=?) and flag=0";
    }else if(goodType=="盆栽"){
        var sql="SELECT * FROM collection WHERE goods_id=(SELECT goods_id FROM potted " +
            "WHERE potted_id=?) AND user_id=(SELECT user_id FROM USER WHERE user_name=?) and flag=0";
    }else if(goodType=="包装纸"){
        var sql="SELECT * FROM collection WHERE goods_id=(SELECT goods_id FROM wrapper " +
            "WHERE wrapper_id=?) AND user_id=(SELECT user_id FROM USER WHERE user_name=?) and flag=0";
    }

    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null&&data.length>=1){//说明已收藏
            console.log("已收藏");
            res.send("error");
        }else{//说明没有收藏,那么插入收藏表
            console.log("没收藏");
            var param2=[];
            if(uname!=null && uname!="") param2.push(uname);
            if(type_id!=null&&type_id!="") param2.push(type_id);
            console.log("param2："+param2[0]+"\t"+param2[1]);
            if(goodType=="花"){
                var sql2="INSERT INTO collection VALUES((SELECT user_id FROM USER WHERE user_name=?)," +
                    "(SELECT goods_id  FROM flower WHERE flower_id=?),default,default)";
            }else if(goodType=="礼盒"){
                var sql2="INSERT INTO collection VALUES((SELECT user_id FROM USER WHERE user_name=?)," +
                    "(SELECT goods_id  FROM gift WHERE gift_id=?),default,default)";
            }else if(goodType=="盆栽"){
                var sql2="INSERT INTO collection VALUES((SELECT user_id FROM USER WHERE user_name=?)," +
                    "(SELECT goods_id  FROM potted WHERE potted_id=?),default,default)";
            }else if(goodType=="包装纸"){
                var sql2="INSERT INTO collection VALUES((SELECT user_id FROM USER WHERE user_name=?)," +
                    "(SELECT goods_id  FROM wrapper WHERE wrapper_id=?),default,default)";
            }
            mysql.unit_mysql(sql2,param2,function(err,data){
                console.log(err);
                if(err==null){
                    res.send("ok");
                    console.log("收藏成功");
                }else{
                    console.log("收藏失败");
                }
            });
        }
    });
}
/*================加入购物车======================*/
exports.canAddCart=function(req,res){
    var username = req.session.username;
    var number = req.body.number;
    var tableName;
    var type_id;
    var type_idname;
    var param=[];
    if(goodType=="花"){
        /* tableName="flower";*/
        var flower_id = good[0].flower_id;
        type_id=flower_id;
        if(type_id!=null&&type_id!="") param.push(type_id);
        if(username!=null && username!="") param.push(username);
        var sql="SELECT * FROM collection WHERE goods_id=(SELECT goods_id FROM flower WHERE flower_id=?) AND user_id=(SELECT user_id FROM USER WHERE user_name=?) AND flag=1";
        mysql.unit_mysql(sql,param,function(err,data){
            if(err==null && data.length>=1){//已经添加到购物车，不需要插入新数据，只需要更新number
                console.log("以前已经添加过到购物车了");
                var param3=[];
                if(number!=null&&number!="") param3.push(parseInt(number));
                if(username!=null && username!="") param3.push(username);
                if(type_id!=null && type_id!="") param3.push(type_id);
                var sql3="UPDATE collection SET num=num+? WHERE flag=1 AND user_id=(select user_id from user where user_name=?) AND goods_id=(SELECT goods_id FROM flower WHERE flower_id=?)";
                mysql.unit_mysql(sql3,param3,function(err,data){
                    console.log(err);
                    console.log(data.affectedRows);
                    if(err==null){
                        res.send("ok");
                    }
                });
            }else{//未添加过，将数据插入购物车，
                console.log("还未添加到购物车");
                var param2=[];
                if(username!=null && username!="") param2.push(username);
                if(type_id!=null&&type_id!="") param2.push(type_id);
                if(number!=null&&number!="") param2.push(number);
                console.log("在未添加前提加，加入购物车前获取到的tableName和type_id"+tableName+"\t"+type_id);
                for(var i=0;i<param2.length;i++){
                    console.log(param2[i]);
                }
                var sql2="INSERT INTO collection VALUES((SELECT user_id FROM USER WHERE user_name=?)," +
                    "(SELECT goods_id  FROM flower WHERE flower_id=?),1,?)";
                mysql.unit_mysql(sql2,param2,function(err,data){
                    console.log(err);
                    if(err==null){
                        console.log("查询数据成功");
                        res.send("ok");
                    }else{
                        console.log("插入数据失败");
                    }
                });
            }
        });
    }else if(goodType=="礼盒"){
        /* tableName="gift";*/
        var gift_id = good[0].gift_id;
        type_id=gift_id;
        if(type_id!=null&&type_id!="") param.push(type_id);
        if(username!=null && username!="") param.push(username);
        var sql="SELECT * FROM collection WHERE goods_id=(SELECT goods_id FROM gift WHERE gift_id=?) AND user_id=(SELECT user_id FROM USER WHERE user_name=?) AND flag=1";
        mysql.unit_mysql(sql,param,function(err,data){
            if(err==null && data.length>=1){//已经添加到购物车，不需要插入新数据，只需要更新number
                console.log("以前已经添加过到购物车了");
                var param3=[];
                if(number!=null&&number!="") param3.push(number);
                if(username!=null && username!="") param3.push(username);
                if(type_id!=null && type_id!="") param3.push(type_id);
                var sql3="UPDATE collection SET num=num+? WHERE flag=1 AND user_id=(select user_id from user where user_name=?) AND goods_id=(SELECT goods_id FROM gift WHERE gift_id=?)";
                mysql.unit_mysql(sql3,param3,function(err,data){
                    console.log(err);
                    if(err==null){
                        res.send("ok");
                    }else{
                        console.log("礼盒更新购物车数量失败");
                    }
                });
            }else{//未添加过，将数据插入购物车，
                console.log("还未添加到购物车");
                var param2=[];
                if(username!=null && username!="") param2.push(username);
                if(type_id!=null&&type_id!="") param2.push(type_id);
                if(number!=null&&number!="") param2.push(number);
                console.log("在未添加前提加，加入购物车前获取到的tableName和type_id"+tableName+"\t"+type_id);
                for(var i=0;i<param2.length;i++){
                    console.log(param2[i]);
                }
                var sql2="INSERT INTO collection VALUES((SELECT user_id FROM USER WHERE user_name=?)," +
                    "(SELECT goods_id  FROM gift WHERE gift_id=?),1,?)";
                mysql.unit_mysql(sql2,param2,function(err,data){
                    console.log(err);
                    if(err==null){
                        console.log("查询数据成功");
                        res.send("ok");
                    }else{
                        console.log("插入数据失败");
                    }
                });
            }
        });
    }else if(goodType=="盆栽"){
        /* tableName="potted";*/
        var potted_id = good[0].potted_id;
        type_id=potted_id;
        if(type_id!=null&&type_id!="") param.push(type_id);
        if(username!=null && username!="") param.push(username);
        var sql="SELECT * FROM collection WHERE goods_id=(SELECT goods_id FROM potted WHERE potted_id=?) AND user_id=(SELECT user_id FROM USER WHERE user_name=?) AND flag=1";
        mysql.unit_mysql(sql,param,function(err,data){
            if(err==null && data.length>=1){//已经添加到购物车，不需要插入新数据，只需要更新number
                console.log("以前已经添加过到购物车了");
                var param3=[];
                if(number!=null&&number!="") param3.push(number);
                if(username!=null && username!="") param3.push(username);
                if(type_id!=null && type_id!="") param3.push(type_id);
                var sql3="UPDATE collection SET num=num+? WHERE flag=1 AND user_id=(select user_id from user where user_name=?) AND goods_id=(SELECT goods_id FROM potted WHERE potted_id=?)";
                mysql.unit_mysql(sql3,param3,function(err,data){
                    if(err==null){
                        res.send("ok");
                    }
                });
            }else{//未添加过，将数据插入购物车，
                console.log("还未添加到购物车");
                var param2=[];
                if(username!=null && username!="") param2.push(username);
                if(type_id!=null&&type_id!="") param2.push(type_id);
                if(number!=null&&number!="") param2.push(number);
                console.log("在未添加前提加，加入购物车前获取到的tableName和type_id"+tableName+"\t"+type_id);
                for(var i=0;i<param2.length;i++){
                    console.log(param2[i]);
                }
                var sql2="INSERT INTO collection VALUES((SELECT user_id FROM USER WHERE user_name=?)," +
                    "(SELECT goods_id  FROM potted WHERE potted_id=?),1,?)";
                mysql.unit_mysql(sql2,param2,function(err,data){
                    console.log(err);
                    if(err==null){
                        console.log("查询数据成功");
                        res.send("ok");
                    }else{
                        console.log("插入数据失败");
                    }
                });
            }
        });
    }else if(goodType=="包装纸"){
        /* tableName="wrapper";*/
        var wrapper_id = good[0].wrapper_id;
        type_id=wrapper_id;
        if(type_id!=null&&type_id!="") param.push(type_id);
        if(username!=null && username!="") param.push(username);
        var sql="SELECT * FROM collection WHERE goods_id=(SELECT goods_id FROM wrapper WHERE wrapper_id=?) AND user_id=(SELECT user_id FROM USER WHERE user_name=?) AND flag=1";
        mysql.unit_mysql(sql,param,function(err,data){
            if(err==null && data.length>=1){//已经添加到购物车，不需要插入新数据，只需要更新number
                console.log("以前已经添加过到购物车了");
                var param3=[];
                if(number!=null&&number!="") param3.push(number);
                if(username!=null && username!="") param3.push(username);
                if(type_id!=null && type_id!="") param3.push(type_id);
                var sql3="UPDATE collection SET num=num+? WHERE flag=1 AND user_id=(select user_id from user where user_name=?) AND goods_id=(SELECT goods_id FROM wrapper WHERE wrapper_id=?)";
                mysql.unit_mysql(sql3,param3,function(err,data){
                    if(err==null){
                        res.send("ok");
                    }
                });
            }else{//未添加过，将数据插入购物车，
                console.log("还未添加到购物车");
                var param2=[];
                if(username!=null && username!="") param2.push(username);
                if(type_id!=null&&type_id!="") param2.push(type_id);
                if(number!=null&&number!="") param2.push(number);
                for(var i=0;i<param2.length;i++){
                    console.log(param2[i]);
                }
                var sql2="INSERT INTO collection VALUES((SELECT user_id FROM USER WHERE user_name=?)," +
                    "(SELECT goods_id  FROM wrapper WHERE wrapper_id=?),1,?)";
                mysql.unit_mysql(sql2,param2,function(err,data){
                    console.log(err);
                    if(err==null){
                        console.log("查询数据成功");
                        res.send("ok");
                    }else{
                        console.log("插入数据失败");
                    }
                });
            }
        });
    }


}
/*================查询购物车列表=====================*/
exports.addCart=function(req,res){
    console.log("进入addCart");
    var param=[];
    var uname = req.session.username;
    if(uname!=null && uname!="") param.push(uname);
    console.log("param:"+param[0]);
    var sql="SELECT * FROM flower f JOIN collection c ON f.goods_id=c.goods_id " +
        "WHERE user_id=(SELECT user_id FROM USER WHERE user_name=?) AND flag=1";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null){
            console.log("查询购物车，返回的数据长度："+data.length);
            res.render("shoppingCart.html",{data:data});
        }else{
            console.log("error");
        }
    });
}
/*================动态更新number=================*/
exports.changeCartNumber=function(req,res){
    var uname = req.session.username;
    var newNumber = req.body.number;
    var f_id = req.body.flower_id;
    var param=[];
    if(newNumber!=null&&newNumber!="") param.push(newNumber);
    if(uname!=null && uname!="") param.push(uname);
    if(f_id!=null&&f_id!="") param.push(f_id);
    /*=============更新数据==============*/
    var sql="UPDATE collection SET num=? WHERE flag=1 AND user_id=(select user_id from user where user_name=?) AND goods_id=(SELECT goods_id FROM flower WHERE flower_id=?)";
    mysql.unit_mysql(sql,param,function(err,data){
    });
}
/*==============删除单个商品===============*/
exports.delOneGood=function(req,res){
    var f_id = req.body.flower_id;
    var uname = req.session.username;
    var param=[];
    if(uname!=null && uname!="") param.push(uname);
    if(f_id!=null&&f_id!="") param.push(f_id);
    console.log("在sql删除之前获取到的fid和name："+f_id+"\t"+uname);
    var sql = "DELETE FROM collection WHERE user_id=(SELECT user_id FROM USER WHERE user_name=?) AND goods_id=(SELECT goods_id  FROM flower WHERE flower_id=?)";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null){
            console.log("删除单条数据的时候成功");
            res.send("ok");
        }else{
            console.log("删除单条数据的时候出错");
        }
    });
}
/*==================删除所有商品====================*/
exports.dellMoreGood=function(req,res){
    var uname = req.session.username;
    var f_id = req.body.f_id;
    var param=[];
    if(uname!=null && uname!="") param.push(uname);
    if(f_id!=null && f_id!="") param.push(f_id);
    console.log("在sql删除所有数据之前获取到f_id："+f_id);
    var sql = "DELETE FROM collection WHERE user_id=(SELECT user_id FROM USER WHERE user_name=?) AND goods_id=(SELECT goods_id  FROM flower WHERE flower_id=?)";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null){
            console.log("删除所有数据成功");
            res.send("ok");
        }else{
            console.log("删除所有数据出错");
        }
    });
}

/*===========将购物车选中的商品加入订单列表中===========*/
var arrChooseMore=[];
var allMoney;
exports.addOrderList=function(req,res){
    arrChooseMore = JSON.parse(req.body.arrChooseMore);//反序列化
    allMoney = req.body.allMoney;
    console.log("arrChooseMore+allMoney:"+arrChooseMore+"\t"+allMoney);

}
/*================显示订单列表=======================*/
var address;
exports.showOrderList=function(req,res){
    console.log("拦截到了orderSubmit");
    console.log("allMoney:"+allMoney);
    var datas = arrChooseMore;
    var param=[];
    var address="";
    var uname = req.session.username;
    if(uname!=null && uname!="") param.push(uname);
    console.log("在查询地址之前看看uname的值："+uname);
    var sql="SELECT * FROM address WHERE user_id=(SELECT user_id FROM USER WHERE user_name=?)";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null && data.length>=1){
            address=data;
            var param2=[];
            if(uname!=null && uname!="") param2.push(uname);
            var sql2="SELECT user_status FROM USER WHERE user_name=?";
            mysql.unit_mysql(sql2,param2,function(err,data){
                if(err==null && data.length>=1){
                    console.log("查询vip成功,打印data[0].user_status："+data[0].user_status);
                    if(data[0].user_status=="1"){
                        var newMoney=allMoney*0.8;
                        console.log("datas"+datas);
                        res.render("orderSubmit.html",{data:address,allMoney:allMoney,datas:datas,newMoney:newMoney});
                    }else{
                        var newMoney=0;

                        res.render("orderSubmit.html",{data:address,allMoney:allMoney,datas:datas,newMoney:newMoney});
                    }
                }else{
                    console.log("查询vip失败");
                }
            });

        }else{
            console.log("查询地址出错");
        }
    });
}

exports.insertOrderList=function(req,res){
    console.log("拦截insertOrderList成功进来了");
    /* xhr.send("uname="+uname+"&allMoney="+money+"&cardText="+cardContent+"&idArr="+idArr); */
    var uname = req.session.username;
    var allMoney = req.body.allMoney;
    console.log("allMoney："+allMoney);
    var cardText = req.body.cardText;
    var idArr = req.body.idArr;
    var param=[];
    var orderid="";
    var goodsId=[];
    if(uname!=null && uname!="") param.push(uname);
    if(allMoney!=null && allMoney!="") param.push(allMoney);
    if(cardText!=null && cardText!="") param.push(cardText);
    console.log("在后台获取到的uname+allMoney+cardText+idArr："+uname+allMoney+cardText+idArr[0]);
    var sql="INSERT INTO orders(user_id,order_allMoney,order_cardtext) VALUES((SELECT user_id FROM " +
        "USER WHERE user_name=?),?,?)";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null){
            //插入成功，那么通过uname查询出对应的orderid
            console.log("插入成功，那么通过uname查询出对应的orderid");
            var param2=[];
            var sql2="SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1";
            mysql.unit_mysql(sql2,param2,function(err,data){
                if(err==null && data.length>=1){
                    orderid=data[0].order_id;
                    console.log("orderid:"+orderid);
                    /*==============查询出goodsid===============*/
                    var param3=[];
                    var sql3= "SELECT goods_id FROM flower WHERE flower_id IN(";
                    for(var i=0;i<idArr.length;i++){

                        if(i==idArr.length-1){
                            sql3+=idArr[i]+")";
                        }else{
                            sql3+=idArr[i];
                        }
                    }
                    console.log("查看拼接的sql3："+sql3);
                    mysql.unit_mysql(sql3,param3,function(err,data){
                        if(err==null && data.length>=1){
                            //查询所有对应的goodsId成功
                            console.log("查询所有对应的goodsId成功");
                            goodsId=data;
                            console.log("查询到的goodsid："+goodsId.length);
                            /*==========向order_goods表插入数据=============*/
                            for(var i=0;i<goodsId.length;i++){
                                var param4=[];
                                param4.push(orderid);
                                param4.push(goodsId[i].goods_id);
                                console.log("orderid+goodsId[i]:"+orderid+"\t"+goodsId[i].goods_id);
                                var sql4="INSERT INTO order_goods VALUES(?,?)";
                                console.log("sql4:"+sql4);
                                mysql.unit_mysql(sql4,param4,function(err,data){
                                    console.log(err);
                                    if(err==null){
                                        console.log("插入order_goods成功");
                                        res.send("ok");
                                    }else{
                                        console.log("插入order_goods失败");
                                    }
                                });
                            }

                        }else{
                            console.log("查询所有对应的goodsId失败");
                        }
                    });

                }
            });

        }else{
            console.log("插入order表出错");
        }
    });
}

/*==============更新默认地址================*/
exports.updateAddr=function(req,res){
    var addrId = req.body.addrId;
    var uname = req.session.username;
    console.log("从页面传过来的地址："+addrId);
    var param=[];
    if(addrId!=null && addrId!="") param.push(addrId);
    var sql="UPDATE address SET address_default=1 WHERE address_id=?";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null){
            console.log("设定默认值成功");
            //把其它几条地址的地址状态设为0
            var param2=[];
            if(uname!=null && uname!="") param2.push(uname);
            param2.push(addrId);
            var sql2="SELECT address_id FROM address WHERE user_id=(select user_id from user where user_name=?) " +
                "AND address_id!=? AND address_default=1";
            mysql.unit_mysql(sql2,param2,function(err,data){
                if(err==null && data.length>=1) {
                    var param3 = [];
                    var sql3 = "UPDATE address SET address_default=0 WHERE address_id IN(";
                    for (var i = 0; i < data.length; i++) {
                        if (i == data.length - 1) {
                            param3.push(data[i].address_id);
                            sql3 += "?)";
                        } else {
                            param3.push(data[i].address_id);
                            sql3 += "?,";
                        }
                    }
                    console.log("sql3:" + sql3);
                    mysql.unit_mysql(sql3, param3, function (err, data) {
                        if(err==null){
                            console.log("更新成功");
                        }else{
                            console.log("更新失败"+err);
                        }
                    });
                }else{
                    console.log("第二条sql查询失败");
                }
            });

        }
    });
}



/*==============showOrderGoods==============*/
exports.showOrderGoods=function(req,res){
    res.render("orderGoods.html",{});
}



/*====================田=================*/
exports.list=function(req,res){
    console.log("进入good");
    var param=[];
    var datas=[];
    var sql="SELECT * FROM flower WHERE flower_name like '%11' ";
    mysql.unit_mysql(sql,param,function(err,data){
        console.log(err);
        if(err==null&&data.length>=1){
            datas.push(data);
            res.render("MotherDay.html",{data:data});/*res.render("/birthday.html",{data:data});不加斜杠加洛就错误*/
        }else{
            console.log("error");
        }
    });
};


exports.showHuaYu=function(req,res){
    console.log('12122');
    res.render("huayu.html",{});
}

exports.showCycleBuy=function(req,res){
    res.render("cycleBuy.html",{});
}





