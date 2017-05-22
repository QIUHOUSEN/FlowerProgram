/**
 * Created by Administrator on 2016/9/20.
 */
var mysql = require("mysql");
var Connect = require('./Connect.js');

exports.login=function(req,res){
    var uname = req.body.username;
    var password = req.body.password;
    //创建连接对象
    /*var myConnect = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"qiu",
        database:"gxaimg",
        port:"3306"
    });*/
    /*//打开连接
    myConnect.connect();*/
    var sql = "select name_user,pwd_user from user where name_user=? and pwd_user=?";
    var param = [];
    if(uname!=undefined){
        param.push(uname);
    }if(password!=undefined){
        param.push(password);
    }
    function dl(err,data){
        console.log(param);
        console.log('错误：'+err);
        console.log('数据：'+data);
        if(data!=undefined && data.length>=1){
            res.send("OK");
        }else{
            res.send("error!!");
        }
    }
    Connect.connect(sql,param,dl);

}

exports.register=function(req,res){
    var uname = req.body.username;
    var password = req.body.password;
    var uemail = req.body.email;
    //创建连接对象
    var myConnect = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"qiu",
        database:"gxaimg",
        port:"3306"
    });
    //打开连接
    myConnect.connect();
    var sql = "insert into user(name_user,pwd_user,email_user) values(?,?,?)";
    var param = [];
    if(uname!=undefined && uname!=""){
        param.push(uname);
    }if(password!=undefined && password!=""){
        param.push(password);
    }if(uemail!=undefined && uemail!=""){
        param.push(uemail);
    }
    myConnect.query(sql,param,function(err,data){
        console.log(param);
        console.log('错误：'+err);
        console.log('数据：'+data);
        if(err==null){
            res.send("注册成功");
        }else{
            res.send("注册失败!!");
        }
    });
    myConnect.end();
}








