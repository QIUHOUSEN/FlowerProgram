/**
 * Created by Administrator on 2016/10/11.
 */

var mysql_init=require("./mysqlConfig.js");

exports.myOrder=function(req,res){
    //var sqlSelect = "SELECT *FROM orders o,USER u,collection c,goods g,flower f WHERE o.`user_id`=u.`user_id` AND u.`user_id`=c.`user_id` AND c.`goods_id`=f.`goods_id`";
    //console.log('asdgasdg');
    //res.render('personal.html',{});

    console.log('gggg');
    var sqlSelectOrder = "SELECT f.`flower_id`,f.`goods_id`,f.`flower_price`,f.`flower_color`,f.`flower_name`,f.`flower_src`,f.`flower_describe` FROM orders o,USER u,collection c,goods g,flower f WHERE o.`user_id`=u.`user_id` AND u.`user_id`=c.`user_id` AND c.`goods_id`=g.`goods_id` AND g.`goods_id`=f.`goods_id` AND u.`user_name`=?";
    var sqlSelectStore = "SELECT f.`flower_id`,f.`goods_id`,f.`flower_price`,f.`flower_color`,f.`flower_name`,f.`flower_src`,f.`flower_describe` FROM USER u,collection c,goods g,flower f WHERE u.`user_id`=c.`user_id` AND c.`goods_id`=g.`goods_id` AND g.`goods_id`=f.`goods_id` AND u.`user_name`=?";
    var param=[];
    var uname = req.session.username;
    console.log(uname+"-=-=-=-=-=-==");
    if(uname!=null){
        param.push(uname);
        console.log('数组：'+param[0]);
    }
    var dataOrder;
    var dataStore;
    mysql_init.unit_mysql(sqlSelectOrder,param,function(err,data){
        if(err==null && data.length>=1){
            console.log(data);
            console.log(data.length);
            dataOrder=data;
            if(data!=null){
                mysql_init.unit_mysql(sqlSelectStore,param,function(err,data){
                    if(err==null && data.length>=1){
                        console.log(data);
                        console.log(data.length+"这是收藏");
                        //console.log(data[0].flower_name);
                        //res.send(data);//将从数据库查询到的已经登录的用户数据发送回去
                        dataStore=data;
                        res.render("personal.html",{dataOrder:dataOrder,dataStore:dataStore});

                    }else{
                        console.log('noo');
                        res.send('error');//没查出来这条登录数据，可以插入此条数据
                    }
                });
            }

            //console.log(data[0].flower_name);
            //res.send(data);//将从数据库查询到的已经登录的用户数据发送回去
        }else{
            console.log('noo');
            res.send('error');//没查出来这条登录数据，可以插入此条数据
        }
    });

    //console.log("后台数据订单："+dataOrder+" "+dataStore);

}

exports.headImg=function(req,res){
    var uname = req.session.username;
    var upwd = req.session.pwd;
    var param=[];
    console.log(uname+"=========="+upwd);
    var imgSrcs = req.body.imgSrcs;
    console.log("imgskdfjkkl"+imgSrcs);
    if(uname!=null && upwd!=null){
        //res.render('head.html',{data:imgSrcs});
        req.session.imgSrcs=imgSrcs;
        console.log(req.session);
       // res.send("");
    }
    var sql = "UPDATE USER SET user_head=? WHERE user_name=?";
    param.push(imgSrcs);
    param.push(uname);
    mysql_init.unit_mysql(sql,param,function(err,data){
        if(err==null && data.affectedRows>=1){
            console.log(data.affectedRows+"=========");
            //res.render("index.html",{imgSrcs:imgSrcs});
        }else{
            console.log('错误');
        }
    });
    //req.session.headImg_src
}

//下面是修改联系方式
exports.changelx=function(req,res){
    var sjh = req.body.sjh;
    var yx = req.body.yx;
    var uname = req.session.username;
    //console.log(sjh+"-----"+yx);
    var param=[];
    var sql = "UPDATE USER SET user_telphone=?,user_email=? where user_name=?";
    param.push(sjh);
    param.push(yx);
    param.push(uname);
    mysql_init.unit_mysql(sql,param,function(err,data){
        if(err==null && data.affectedRows>=1){
            console.log(data.affectedRows+"=========");
            //res.render("index.html",{imgSrcs:imgSrcs});
            res.send("ok");
        }else{
            console.log('错误');
        }
    });

}


exports.goBack=function(req,res){
    console.log(req.session.username+"=-=-="+req.session.pwd);
    console.log(req.session.cookie);
    //req.session.pwd.clearCookie();
    req.session.cookie.originalMaxAge=0;
    res.send('ok');

}







