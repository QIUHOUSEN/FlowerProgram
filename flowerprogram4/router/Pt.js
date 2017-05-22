/**
 * Created by Administrator on 2016/10/11.
 */

var mysql = require("./mysqlConfig.js");
exports.showImg=function(req,res) {
    /*console.log("ddddddqweqwe");
    console.log("dsadadadwweqweqwe");*/
    var param = [];
    var sql = "SELECT flower_src FROM flower where flower_name like '%2'";
    mysql.unit_mysql(sql, param, function (err, data) {
        if (err == null && data.length >= 1) {
           /* console.log("data.length和src" + data.length + "\t" + data[0].gift_src);
           */ res.render("Pt.html", {data: data});
            /*console.log(data.flower_src)*/
        } else {
            /*console.log("error");*/
        }
    });
};
exports.registerPost=function(req,res){
    console.log("哈哈哈");
    var odH1 = req.body.dH1;
    /*var ocJ = req.body.cJ;*/
    var osJ = req.body.sJ;
    var odH2 = req.body.dH2;
    var oxQ = req.body.xQ;
    var param=[];
    if(odH1!=null&&odH1!="")param.push(odH1);
    if(osJ!=null&&osJ!="")param.push(osJ);
    if(odH2!=null&&odH2!="")param.push(odH2);
    if(oxQ!=null&&oxQ!="")param.push(oxQ);
    var sql="insert into offline_order(offline_tel,offline_date,offline_address,offline_others)values(?,?,?,?)";
    function dj(err,data){
        console.log(err);
        console.log(data);
        if(err==null){
            res.send("订制成功");
        }else{
            res.send("订制失败");
        }
    }
    mysql.unit_mysql(sql,param,dj);
};

exports.ajaxLogin=function(req,res){
   /* var sql="select * from offline_order where " +
        "user_id=(select user_id from user_name='tian')";*/
    /*var sql="SELECT  * FROM  offline_order  a1,  scene_type a2 WHERE a1.scene_id=a2.scene_id where " +
        "user_id=(select user_id from user_name='tian')";*/
    var sql="SELECT  * FROM  offline_order where offline_tel='18384137856'";
/*var sql="SELECT * FROM offline_order WHERE offline_id=1";*/
    var pam=[];
    function dl(err,data){
        if(err==null&&data.length>=1){
            console.log(data.length+"=====");
           res.send(data);
        }else{

        }
     }
    mysql.unit_mysql(sql,pam,dl);
};