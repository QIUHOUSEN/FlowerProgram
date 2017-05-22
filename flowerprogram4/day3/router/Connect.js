/**
 * Created by Administrator on 2016/9/21.
 */
var mysql = require("mysql");
exports.connect=function(sql,param,callback){
    var myConnect = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"qiu",
        database:"gxaimg",
        port:"3306"
    });
    //打开连接
    myConnect.connect();
    myConnect.query(sql,param,callback);
    myConnect.end();

}









