

var mysql = require("./mysqlConfig.js");
exports.showImg=function(req,res) {
    //console.log("dsadadadwweqweqwe");
    var param = [];
    var datas=[];
    var sql = "SELECT flower_src,flower_id FROM flower where flower_name like '%2'";
    mysql.unit_mysql(sql, param, function (err, data) {
        if (err == null && data.length >= 1) {
            res.render("qixi.html", {data: data});
            console.log(data)
        } else {
            console.log("error");
        }
    });
};

var imgId;
var goodType;
exports.sendImg=function(req,res){
    imgId = req.body.imgId;
    console.log("imgid"+imgId);
    console.log(imgId);
    var param =[];
    if(imgId!=null && imgId!="") param.push(imgId);
    var sql="SELECT flower_name FROM flower WHERE flower_id=?";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null && data.length>=1){
            console.log("查询成功"+data);
            console.log(data[0]);
        }else{
            console.log("err");
        }
    });
};
