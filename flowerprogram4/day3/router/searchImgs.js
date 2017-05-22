/**
 * Created by Administrator on 2016/9/21.
 */
var mysql = require("mysql");
var Connect = require('./Connect.js');

exports.findImgs=function(req,res){
    var searchValue = req.body.searchValue;
    searchValue = "%"+searchValue.trim()+"%";
    console.log("值"+searchValue);
    var pageTh = req.body.pageTh;//得到传过来的页数
    console.log("页数"+pageTh+"" +searchValue);
    //console.log("打印"+searchValue);
    /*var myConn = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"qiu",
        database:"gxaimg",
        port:"3306"
    });
    myConn.connect();*/
    var sql = "select i.id_img,i.id_user,i.type_id,i.src,i.about,i.more,i.news,i.hot from types t,imgs i where t.type_id=i.type_id and t.types like ?"
    var param = [];
    if(searchValue!=null && searchValue!=""){
        param.push(searchValue);
    }
    var pgNum = (pageTh-1)*1;//定义一页显示几个
    param.push(pgNum);
    sql = sql + " limit ?, 1";

    function search(err,data){
        console.log("错误"+err);
        console.log("数据"+data);
        if(data!=undefined && data.length>=1){
            res.send(data);
        }else{
            res.send('error');
        }
    }
    Connect.connect(sql,param,search);

}



exports.countPage=function(req,res){
    var searchValue = req.body.searchValue;
    searchValue = "%"+searchValue.trim()+"%";
    var sql = "select i.id_img,i.id_user,i.type_id,i.src,i.about,i.more,i.news,i.hot from types t,imgs i where t.type_id=i.type_id and t.types like ?";
    var param = [];
    if(searchValue!=null && searchValue!=""){
        param.push(searchValue);
    }
    function counts(err,data){
        var countNum=0;
        if(data!=undefined && data.length>=1){
            countNum = data.length;
            console.log("页数"+countNum);
            res.send(countNum+"");
        }else{
            res.send('error');
        }
    }
    Connect.connect(sql,param,counts);

}


exports.searchTypes=function(req,res){
    var searchType = req.body.searchType;
    //searchType = "%"+searchType.trim()+"%";
    var sql;
    var param = [];
    if(searchType=="相关"&&searchType!=null && searchType!=""){
        //searchType="生活";
        sql = "select *from imgs where about=?";
        param.push('生活');
        console.log("diandao:"+searchType);
    }else if(searchType=="多样化"&&searchType!=null && searchType!=""){
        //searchType="漂亮";
        sql = "select *from imgs where more=?";
        param.push('创新');
    }else if(searchType=="最新"&&searchType!=null && searchType!=""){
        //searchType="2016-2-10";
        sql = "select *from imgs where news>?";
        param.push('2016-2-5');
    }else if(searchType=="热门"&&searchType!=null && searchType!=""){
        //searchType="生活";
        sql = "select *from imgs where hot>?";
        param.push(1500);
    }
    //console.log("gasgsd"+sql);
    console.log("值"+searchType);
    var typePage = req.body.typePage;//得到传过来的页数
    console.log("页数"+typePage+"" +searchType);
    //console.log("打印"+searchValue);
    /*var myConn = mysql.createConnection({
     host:"localhost",
     user:"root",
     password:"qiu",
     database:"gxaimg",
     port:"3306"
     });
     myConn.connect();*/
    //var sql = "select i.id_img,i.id_user,i.type_id,i.src,i.about,i.more,i.news,i.hot from types t,imgs i where t.type_id=i.type_id and t.types like ?"

    /*if(searchType!=null && searchType!=""){
        param.push(searchType);
    }*/
    var pgNum = (typePage-1)*1;//定义一页显示几个
    param.push(pgNum);
    sql = sql + " limit ?, 1";

    function search(err,data){
        console.log("错误"+err);
        console.log("数据"+data);
        if(data!=undefined && data.length>=1){
            res.send(data);
        }else{
            res.send('error');
        }
    }
    Connect.connect(sql,param,search);
}

exports.searchCount=function(req,res){
    var tempType = req.body.tempType;
    console.log("从客户端接收到的："+tempType);
    //tempType = "%"+tempType.trim()+"%";
    var sql;
    var param = [];
    if(tempType=="相关"&&tempType!=null && tempType!=""){
        //searchType="生活";
        sql = "select *from imgs where about=?";
        console.log("进入到相关"+sql);
        param.push("生活");
    }else if(tempType=="多样化"&&tempType!=null && tempType!=""){
        //searchType="漂亮";
        sql = "select *from imgs where more=?";
        param.push("漂亮");
    }else if(tempType=="最新"&&tempType!=null && tempType!=""){
        //searchType="2016-2-10";
        sql = "select *from imgs where news>?";
        param.push('2016-2-5');
    }else if(tempType=="热门"&&tempType!=null && tempType!=""){
        //searchType="生活";
        sql = "select *from imgs where hot>?";
        param.push(1500);
    }

    /*if(searchValue!=null && searchValue!=""){
        param.push(searchValue);
    }*/
    function counts(err,data){
        var countNum=0;
        if(data!=undefined && data.length>=1){
            countNum = data.length;
            console.log("查询到的某一类总页数"+countNum);
            res.send(countNum+"");
        }else{
            res.send('error');
        }
    }
    Connect.connect(sql,param,counts);

}





