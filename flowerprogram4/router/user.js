/**
 * Created by Administrator on 2016/10/9.
 */
var mysql_init=require("./mysqlConfig.js");

exports.regin=function(req,res){
    var regusernames = req.body.regusernames;
    var reguseraddrs = req.body.reguseraddrs;
    var regpasswords = req.body.regpasswords;
    var regrepasswords = req.body.regrepasswords;
    var tels = req.body.tels;
    console.log("---------"+regusernames);
    console.log("---------"+reguseraddrs);
    console.log("---------"+regpasswords);
    console.log("---------"+regrepasswords);
    console.log("---------"+tels);
    //SELECT *FROM USER WHERE user_name='li' OR user_password='123'
    //var sqlSelect = "select * from user where user_name=? or user_email=? or user_telphone=?";
    //查询用户注册的数据，能否注册此条数据
    var sqlSelectReg = "select * from user where user_name=? or user_email=? or user_telphone=?";
    var param=[];
    param.push(regusernames);
    param.push(reguseraddrs);
    param.push(tels);
    console.log("====="+param);
    //插入用户的注册信息
    var sqlInsertReg = "insert into user(user_name,user_email,user_password,user_repassword,user_telphone) values(?,?,?,?,?)";
    var insertParam=[];
    insertParam.push(regusernames);
    insertParam.push(reguseraddrs);
    insertParam.push(regpasswords);
    insertParam.push(regrepasswords);
    insertParam.push(tels);
    var insertStatus=false;//这个是插入状态

    mysql_init.unit_mysql(sqlSelectReg,param,function(err,data){
        if(err==null && data.length>=1){
            console.log('服务器查出来了ok');//就不能注册此条数据
            res.send(data);//将从数据库查询到的已经注册的用户数据发送回去
        }else{
            //console.log('noo');
            //res.send('error');//没查出来这条注册数据，可以插入此条数据
            insertData(sqlInsertReg,insertParam);
            /*console.log("装哎"+insertStatus);
            if(insertStatus==true){
                res.send('inserted');
            }*/
        }
    });

    function insertData(sqlInsertReg,insertParam){
        mysql_init.unit_mysql(sqlInsertReg,insertParam,function(err,data){
            /*if(err==null && data.length>=1){
                console.log('服务器查出来了ok');//就不能注册此条数据
                res.send('ok');
            }else{
                //console.log('noo');
                res.send('error');//没查出来这条注册数据，可以插入此条数据
            }*/
            if(data.affectedRows>=1){
                console.log("插入数据条数"+data.affectedRows);
                insertStatus=true;
                res.send('inserted');
                //return insertStatus;
            }
        });

    }
}

exports.login=function(req,res){
    console.log("这是session"+req.session);
    var logusername = req.body.logusername;
    var logpassword = req.body.logpassword;
    console.log("---------"+logusername);
    console.log("---------"+logpassword);
    var sqlSelectlog = "select * from user where user_name=? and user_password=?";
    var param=[];
    param.push(logusername);
    param.push(logpassword);
    mysql_init.unit_mysql(sqlSelectlog,param,function(err,data){

        if(err==null && data.length>=1){

            req.session.username=logusername;
            req.session.pwd=logpassword;
            console.log("这是session后"+req.session.username+" "+req.session.pwd);
            res.send(data);//将从数据库查询到的已经登录的用户数据发送回去

        }else{
            //console.log('noo');
            res.send('error');//没查出来这条登录数据，可以插入此条数据
            /*console.log("装哎"+insertStatus);
             if(insertStatus==true){
             res.send('inserted');
             }*/
        }
    });
}

exports.checkStatus=function(req,res){
   // req.session.username;
  //  req.session.pwd;
    console.log('检查登录session==='+req.session.username+" "+req.session.pwd);

    if(req.session.username!=null && req.session.pwd){
        var obj = {uname:req.session.username,upwd:req.session.pwd};
        res.send(obj);
    }else{
        res.send('error');
    }
}





