
var mysql = require("./mysqlConfig.js");
exports.showImg=function(req,res) {
    console.log("FDSA342");
    var param = [];
    var sql = "SELECT flower_src,flower_id FROM flower where flower_name like '%花束'";
    mysql.unit_mysql(sql, param, function (err, data) {
        if (err == null && data.length >= 1) {
            console.log("data.length和src" + data.length + "\t" + data[0].gift_src);
            res.render("faD.html", {data: data});
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
         console.log(data);
        if(err==null && data.length>=1){
            console.log("查询成功"+data);
            console.log(data[0]);
        }else{
            console.log("err");
        }
    });
};