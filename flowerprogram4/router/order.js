/**
 * Created by Administrator on 2016/10/5.
 */
var mysql= require("./mysqlConfig.js");
exports.changeOrderImg=function(req,res){
    console.log("进入了order.js");
    var type = req.body.orderType;
    var page = req.body.nowPage;
    var param = [];
    var sql="";
    if(type!=undefined && type!=""){
        param.push(type);
        sql = "SELECT f.flower_name,f.flower_price,s.scene_name,f.flower_src FROM flower f " +
            "JOIN goods g ON f.goods_id=g.goods_id " +
            "JOIN scene_type AS s ON g.scene_id=s.scene_id " +
            "WHERE s.scene_name=?";
    }
    page = (page-1)*5;
    param.push(page);
    sql+="limit ?,5";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null&&data.length>0){
            res.send(data);
        }else{
            res.send(err);
        }
    });

}

exports.findCountPage = function(req,res){

    console.log("进入orderjs查询多少页");
    var type = req.body.orderType;
    var param = [];
    var sql="";
    if(type!=undefined && type!=""){
        param.push(type);
        sql = "SELECT f.flower_name,f.flower_price,f.flower_src,s.scene_name FROM flower f " +
            "JOIN goods g ON f.goods_id=g.goods_id " +
            "JOIN scene_type AS s ON g.scene_id=s.scene_id " +
            "WHERE s.scene_name=?";
    }
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null&&data.length>0){
            res.send(data);
        }else{
            res.send(err);
        }
    });
}