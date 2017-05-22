/**
 * Created by lenovo on 2016/10/11.
 */
var mysql = require("./mysqlConfig.js");
exports.showImg=function(req,res){
    console.log("dsadadadwweqweqwe");
    var param=[];
    var sql="SELECT * FROM wrapper";
    mysql.unit_mysql(sql,param,function(err,data){
        console.log("dsadadadwweqweqwe我打我打");
        if(err==null&&data.length>=1){

            res.render("BaoZhuangZhi.html",{data:data});
            console.log(data.wrapper_src)
        }else{
            console.log("error");
        }
    });
};

/*
var imgId;
var goodType;
exports.sendImg=function(req,res){
    imgId = req.body.imgId;
    var i=parseInt(imgId)
    console.log(imgId+"-=-=-=-=-");
    console.log(i+"-=-=-=-=-");
    var param =[];
    if(imgId!=null && imgId!="") param.push(imgId);
    var sql="SELECT * FROM  wrapper";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null && data.length>=1){
            console.log("查询成功"+data);
            // var temp=new String(data[0].flower_name)
            var temp1=data[i-1].wrapper_id;//花的id
            console.log(temp1);
            var temp2=data[i-1].wrapper_name;//商品名字
            console.log(temp2);
            goodType=data;//将数据存入全局变量中
            console.log(goodType);
        }else{
            console.log("err");
        }
    });
};
*/






