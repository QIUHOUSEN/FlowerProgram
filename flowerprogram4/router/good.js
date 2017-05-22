
var mysql = require("./mysqlConfig.js");
/*birthday图片显示*/
exports.showImg=function(req,res){
    console.log("进入good");
    var param=[];
    var sql5="SELECT * FROM flower WHERE flower_name IN ('粉玫瑰和百合1','精选鲜花1','粉康乃馨和百合1','紫色红色康乃馨1')";

    mysql.unit_mysql(sql5,param,function(err,data){
        console.log(err);
        if(err==null&&data.length>=1){
            param.push(data);
            res.render("birthday.html",{data:data});/*res.render("/birthday.html",{data:data});不加斜杠加洛就错误*/
            console.log(data)
        }else{
            console.log("error");
        }
    });

};

/*wedding图片显示*/
exports.showImg1=function(req,res){
    var param=[];
    var sql5="SELECT * FROM flower WHERE flower_name IN ('红玫瑰礼盒1','彩色玫瑰礼盒1','粉色玫瑰礼盒1')";
    /*封装重复的函数*/
    mysql.unit_mysql(sql5,param,function(err,data){
        console.log(err);
        if(err==null&&data.length>=1){
            param.push(data);
            res.render("wedding.html",{data:data});/*res.render("/birthday.html",{data:data});不加斜杠加洛就错误*/
            console.log(data);
        }else{
            console.log("error");
        }
    });
};

exports.showImg3=function(req,res){
    var param1=[];
    var datas1=[];
    var sql11="SELECT * FROM flower WHERE flower_name='红玫瑰礼盒1'";
    var sql22="SELECT * FROM flower WHERE flower_name='彩色玫瑰礼盒1'";
    var sql33="SELECT * FROM flower WHERE flower_name='粉色玫瑰礼盒1'";
    sqll(sql11);
    sqll(sql22);
    /*封装重复的函数*/
    function sqll(x){
        mysql.unit_mysql(x,param1,function(err,data){
            console.log(err);
            if(err==null&&data.length>=1){
                datas1.push(data);
            }else{
                console.log("error");
            }
        });
    }
    mysql.unit_mysql(sql33,param1,function(err,data){
        console.log(err);
        if(err==null&&data.length>=1){
            datas1.push(data);
            res.render("festival.html",{data:datas1});/*res.render("/birthday.html",{data:data});不加斜杠加洛就错误*/
        }else{
            console.log("error");
        }
    });
};

exports.show_e= function (req,res) {

}
var imgId;
var goodType;
//点击返回数据
exports.sendImg=function(req,res){
    imgId = req.body.imgId;
    //console.log(imgId+"-=-=-=-=-");
    var param =[];
    if(imgId!=null && imgId!="") param.push(imgId);
    var sql="SELECT a.flower_name,a.flower_id,b.goods_name  FROM  flower AS a JOIN goods AS b ON  a.goods_id=b.goods_id WHERE a.flower_id=?";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null && data.length>=1){
            console.log("查询成功"+data);
           // var temp=new String(data[0].flower_name)
            var temp1=data[0].flower_id;//花的id
            console.log(temp1);
            var temp2=data[0].goods_name;//商品名字
            console.log(temp2);
            var temp3=data[0].flower_name//花的名字
            console.log(temp3);
            goodType=data;//将数据存入全局变量中
            console.log(goodType);
        }else{
            console.log("err");
        }
    });
};





/*exports.sendImg1=function(req,res){
    imgId = req.body.imgId;
    //console.log(imgId+"-=-=-=-=-");
    var param =[];
    if(imgId!=null && imgId!="")param.push(imgId);
    var sql="SELECT a.flower_name,a.flower_id,b.goods_name  FROM  flower AS a JOIN goods AS b ON  a.goods_id=b.goods_id WHERE a.flower_id=?";
    mysql.unit_mysql(sql,param,function(err,data){
        if(err==null && data.length>=1){
            console.log("查询成功"+data);
            // var temp=new String(data[0].flower_name)
            var temp1=data[0].flower_id;//花的id
            console.log(temp1);
            var temp2=data[0].goods_name;//商品名字
            console.log(temp2);
            var temp3=data[0].flower_name//花的名字
            console.log(temp3);
            goodType=data;//将数据存入全局变量中
            console.log(goodType);
        }else{
            console.log("err");
        }
    });
};*/
exports.showContain=function(req,res){
    var a=req.body.src;
    console.log("a是"+a);
    var param=[];
    var b="SELECT a.flower_name,a.flower_id,b.goods_name  FROM  flower AS a JOIN goods AS b ON  a.goods_id=b.goods_id WHERE a.flower_src=?";
    if(a!=undefined&&a!="")param.push(a);
    mysql.unit_mysql(b,param,function(err,data){
        console.log(b);
        console.log(err);
        //console.log(data);
        //查询结果的判断；
        if( err==null&& data.length>=1){
            console.log(data);
        }else{
            console.log("err");
        }
    });




};
