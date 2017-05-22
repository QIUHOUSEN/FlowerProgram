/**
 * Created by Administrator on 2016/9/21.
 */
var mysql = require("mysql");
exports.unit_mysql=function(sql,param,_callback){
   /* var myConnect = createConnect("localhost","root","010203","test3","3306");*/
    var myConnect = createConnect("localhost","root","qiu","flower","3306");
    myConnect.connect();
    myConnect.query(sql,param,_callback);
    myConnect.end();
}
function createConnect(hostname,username,pwd,db,port){
    var obj = mysql.createConnection(
        {   host:hostname,
            user:username,
            password:pwd,
            database:db,
            port:port
        }
    );
    return obj;
}