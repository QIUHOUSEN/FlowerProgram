/**
 * Created by lenovo on 2016/10/10.
 */
var mysql = require("./mysqlConfig.js");
exports.showImg=function(req,res){
    console.log("dsadadadwweqweqwe");
    var param=[];
    var sql="SELECT * FROM potted";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null&&data.length>=1){
            console.log("data.length和src"+data.length+"\t"+data[0].huapen_src);
            res.render("huapen.html",{data:data});
            console.log(data.potted_src)
        }else{
            console.log("error");
        }
    });
};


var imgId;
var goodType;

exports.sendImg=function(req,res){
    imgId = req.body.imgId;
    var i=Math.floor(imgId)
    console.log(imgId+"-=-=-=-=-");
    console.log(i+"-=-=-=-=-");
    var param =[];
    if(imgId!=null && imgId!="") param.push(imgId);
    var sql="SELECT * FROM  potted";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null && data.length>=1){
            console.log("查询成功"+data);
            // var temp=new String(data[0].flower_name)
            var temp1=data[i-1].potted_id;//花的id
            console.log(temp1);
            var temp2=data[i-1].potted_name;//商品名字
            console.log(temp2);
            goodType=data;//将数据存入全局变量中
            console.log(goodType);
        }else{
            console.log("err");
        }
    });
};
