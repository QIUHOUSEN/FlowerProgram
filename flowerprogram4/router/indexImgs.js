/**
 * Created by Administrator on 2016/10/10.
 */
var mysql_init=require("./mysqlConfig.js");

exports.selectImgs=function(req,res){
    var sqlSelect = "select *from flower where flower_src=? or flower_name=? or flower_name=? or flower_name=? or flower_name=? or flower_src=? or flower_src=? or flower_src=? or flower_src=?";
    console.log('进入。。。');
    var param=[];

    param.push('../images/new_sale01.jpg');
    param.push('主页玫瑰花');
    param.push('主页康乃馨');
    param.push('主页牡丹');
    param.push('主页杜鹃');
    param.push('../images/best_choice01.jpg');
    param.push('../images/best_choice02.jpg');
    param.push('../images/best_choice03.jpg');
    param.push('../images/best_choice04.jpg');
    var zhuyetuijian=[];//存放查出来的推荐
    var zhuyemeigui=[];//存放查出来的玫瑰
    var zhuyekangnaixin=[];//存放查出来的康乃馨
    var zhuyemudan=[];//存放牡丹
    var zhuyedujuan=[];//存放杜鹃
    var zhuyejinxuan=[];//存放查出来的精选

    mysql_init.unit_mysql(sqlSelect,param,function(err,data){
        if(err==null && data.length>=1){
            console.log(data.length);
            //console.log("所有的花"+data);
            console.log("1:"+JSON.stringify(data[0]));
            console.log("2:"+JSON.stringify(data[1]));
            console.log("3:"+JSON.stringify(data[2]));
            console.log("4:"+JSON.stringify(data[3]));
            console.log("5:"+JSON.stringify(data[4]));
            console.log("6:"+JSON.stringify(data[5]));
            console.log("7:"+JSON.stringify(data[6]));
            console.log("8:"+JSON.stringify(data[7]));
            console.log("9:"+JSON.stringify(data[8]));
            console.log("10:"+JSON.stringify(data[9]));
            console.log("11:"+JSON.stringify(data[10]));
            console.log("12:"+JSON.stringify(data[11]));
            console.log("13:"+JSON.stringify(data[12]));
            console.log("14:"+JSON.stringify(data[13]));
            console.log("15:"+JSON.stringify(data[14]));
            console.log("16:"+JSON.stringify(data[15]));
            console.log("17:"+JSON.stringify(data[16]));

            zhuyetuijian.push(data[16]);

            zhuyemeigui.push(data[6]);
            zhuyemeigui.push(data[2]);
            zhuyemeigui.push(data[0]);

            zhuyekangnaixin.push(data[1]);
            zhuyekangnaixin.push(data[5]);
            zhuyekangnaixin.push(data[11]);

            zhuyemudan.push(data[3]);
            zhuyemudan.push(data[4]);
            zhuyemudan.push(data[8]);

            zhuyedujuan.push(data[7]);
            zhuyedujuan.push(data[9]);
            zhuyedujuan.push(data[10]);

            zhuyejinxuan.push(data[12]);
            zhuyejinxuan.push(data[13]);
            zhuyejinxuan.push(data[14]);
            zhuyejinxuan.push(data[15]);


            res.render("index.html",{zhuyetuijian:zhuyetuijian,zhuyemeigui:zhuyemeigui,zhuyekangnaixin:zhuyekangnaixin,zhuyemudan:zhuyemudan,zhuyedujuan:zhuyedujuan,zhuyejinxuan:zhuyejinxuan});

        }else{
            console.log('错误'+err);
        }
    });
    //最后将从数据库查询到的数据渲染到页面
}


exports.qiehuan=function(req,res){
    var fname = req.body.fname;
    fname="主页"+fname;
    console.log(fname);
    var sqlSelect = "select *from flower where flower_name=?";
    var param=[];
    param.push(fname);
    var flag=false;
    var arrData=[];

    mysql_init.unit_mysql(sqlSelect,param,function(err,data){
        if(err==null && data.length>=1){
            arrData.push(data[0]);
            arrData.push(data[1]);
            arrData.push(data[2]);
            console.log(arrData);
            res.render("index.html",{arrData:arrData});
        }else{
            console.log('错误');
        }
    });

}







