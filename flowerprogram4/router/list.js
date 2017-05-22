/**
 * Created by Administrator on 2016/10/10.
 */
var mysql = require("./mysqlConfig.js");
exports.list=function(req,res){
    console.log("进入good");
    var param=[];
    var datas=[];
    var sql="SELECT * FROM flower WHERE flower_name like '%12'";
    mysql.unit_mysql(sql,param,function(err,data){
        console.log(err);
        if(err==null&&data.length>=1){
            datas.push(data);
            res.render("sh.html",{data:data});/*res.render("/birthday.html",{data:data});不加斜杠加洛就错误*/
        }else{
            console.log("error");
        }
    });
};
