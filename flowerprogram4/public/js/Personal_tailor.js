/**
 * Created by Administrator on 2016/10/7.
 */
/*�������*/
function years(obj, Cyear) {
    var len = 20; // select����,��option����
    var selObj = document.getElementById(obj);
    var selIndex = len - 1;
    var newOpt; // OPTION����

    // ѭ�����OPIONԪ�ص����select������
    for (i = 1; i <= len; i++) {
        if (selObj.options.length != len) { // ���Ŀ��������������Ȳ������趨�ĳ�����ִ�����´���
            newOpt = window.document.createElement("OPTION"); // �½�һ��OPTION����
            newOpt.text = Cyear  + i -1; // ����OPTION���������
            newOpt.value = Cyear  + i -1; // ����OPTION�����ֵ
            selObj.options.add(newOpt, i); // ��ӵ�Ŀ�������
        }

    }
}
function months(){
    var month = document.getElementById("month");
    month.length = 0;
    for (i = 1; i < 13; i++) {
        month.options.add(new Option(i, i));
    }

}
function change_date(){
    // var birthday = document.birthday;
    var year  = document.getElementById("year");
    var month = document.getElementById("month");
    var day   = document.getElementById("date");
    vYear  = parseInt(year.value);
    vMonth = parseInt(month.value);
    date.length=0;

    //�������»�ȡ����
    var max = (new Date(vYear,vMonth, 0)).getDate();
    for (var i=1; i <= max; i++) {
        date.options.add(new Option(i, i));
    }
}
/*Carousel0*/
var oCarousel_1=document.getElementById("Carousel_1");
var oCarousel_2=document.getElementById("Carousel_2");
var oCarousel_3=document.getElementById("Carousel_3");
var oCarousel_4=document.getElementById("Carousel_4");
var oxiax1=document.getElementById("xiax1");
var bwedding=document.getElementById("wedding");
var opening=document.getElementById("opening");
var Anniversary=document.getElementById("Anniversary");
var Birthday=document.getElementById("Birthday");
/*var lwedding=parseInt(wedding.style.marginLeft);*/

var about1=document.getElementById("about1");
oCarousel_2.onclick=function(){
    oxiax1.style.marginLeft=530+"px";
    oxiax1.style.width=40+"px";
    opening.style.display="none";
    Anniversary.style.display="block";
    Birthday.style.display="none";
    bwedding.style.display="none";
}
oCarousel_3.onclick=function(){
    oxiax1.style.marginLeft=770+"px";
    oxiax1.style.width=40+"px";
    opening.style.display="block";
    Anniversary.style.display="none";
    Birthday.style.display="none";
    bwedding.style.display="none";
}
oCarousel_4.onclick=function(){
    oxiax1.style.marginLeft=1010+"px";
    oxiax1.style.width=40+"px";
    opening.style.display="none";
    Anniversary.style.display="none";
    Birthday.style.display="block";
    bwedding.style.display="none";
}
oCarousel_1.onclick=function(){
    oxiax1.style.marginLeft=290+"px";
    oxiax1.style.width=40+"px";
    /*wedding.style.marginLeft=0+"px";*/
    bwedding.style.display="block";
    opening.style.display="none";
    Anniversary.style.display="none";
    Birthday.style.display="none";

}
/*了解更多*/

var oXS;
about1.onclick=function(){
    oXS=setInterval(fastToTop,1);
}
function fastToTop(){
    if(window.scrollY>780){//还没开始滚动
        clearInterval(oXS);
    }else{
        window.scrollTo(0,window.scrollY+20);//代表x不变，y每次回滚50
    }
}
function checkLogin(){
    var xhr;
   /* var uname,upwd;
    uname=document.getElementById("dianH").value;
    upwd=document.getElementById("password").value;*/
    var odiv=document.getElementById("ts1");
    if(window.ActiveXObject){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }else if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }
    xhr.open("post","/ajaxLogin.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send("username="+uname+"&password="+upwd);
    xhr.onreadystatechange=function(){
        console.log("xhr.readyState");
        console.log("xhr.status");
        if(xhr.onreadystate==4&&xhr.status==200){
            var data=xhr.responseText;
            console.log("从服务器返回的数据："+data)
            if(data=="ok"){
                alert('agdsg');
                odiv.innerHTML=uname+"登录";
            }else if(data='error'){
                alert('adsggagadg');
                odiv.innerHTML=uname+"shibai";
            }
        }
        var data=xhr.responseText;
        /*console.log(data);*/

    }
}





/*biaotishi*/

/*
var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
*/

//console.log(str1);
//console.log(str2);
//console.log(str3);
var ochen1=document.getElementById("chen1");
var ochen2=document.getElementById("chen2");
var ochen3=document.getElementById("chen3");
var ochen4=document.getElementById("chen4");
var ochen5=document.getElementById("chen5");
var ochangJ =document.getElementById("changJ").value;
var ochenGong=document.getElementById("chenGong");
var otiS=document.getElementById("otiS");
var tiS=document.getElementById("tiS");
var xtiS=document.getElementById("xtiS");
var chaKan=document.getElementById("chaKan");

function xx(){
    //console.log(odianH);
    //console.log(ochangJ);
    var d = new Date();
    var str1 = d.getFullYear();
    var str2 = (d.getMonth()+1);
    var str3 = d.getDate();
    console.log(oyear+"年"+omonte+"月"+odate+"日");
    var odianH =document.getElementById("dianH").value;
    var oyear =document.getElementById("year").value;
    var omonte =document.getElementById("month").value;
    var odate =document.getElementById("date").value;
    //console.log(ochangJin);
    //console.log(oxuQiu);
    //ochenGong.style.display="block";
    //ochenGong.style.width=1349+"px";
    //odianH=parseFloat(odianH);//把字符型转化为number型
    //oyear=parseFloat(oyear);//把字符型转化为number型
    //omonte=parseFloat( omonte);//把字符型转化为number型
    //odate=parseFloat(odate);//把字符型转化为number型
    //str1=parseFloat(str1);//把字符型转化为number型
    //str2=parseFloat(str2);//把字符型转化为number型
    //str3=parseFloat(str3);//把字符型转化为number型
    //console.log("odianH:"+odianH.length);
    console.log(oyear);
    if( odianH.length>11 || odianH.length <8 || odianH%1!=0 ){
        otiS.innerHTML="请输入正确的电话号码格式！";
        tiS.style.display="block";
        //odianH1.readOnly="true";
    }else if(oyear<str1 || (oyear==str1 && omonte<str2)||(oyear==str1 && omonte==str2 &&odate<str3)) {
        otiS.innerHTML="你输入的时间不正确！";
        tiS.style.display="block";
    }else{
        ochenGong.style.display="block";
        ochenGong.style.width=1349+"px";
        console.log("123");
        parseFloat()
        ochen1.value=odianH;
        ochen2.value=ochangJ;
        ochen3.value=document.getElementById("year").value+"-"+document.getElementById("month").value+"-"+document.getElementById("date").value;
        ochen4.value=document.getElementById("changJin").value;
        ochen5.value=document.getElementById("xuQiu").value;
        console.log(ochen3.value);
    }
};
xtiS.onclick=function(){
    tiS.style.display="none";
    //odianH1.readOnly="false";
}
function quexiao(){
    ochenGong.style.display="none";
    ochenGong.style.width=0+"px";
}
var ochaKan=document.getElementById("chaKan");
var ofrom=document.getElementById("from");
function findMyOrder(){
    var xhr;
    if(window.ActiveXObject){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }else if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }
    xhr.open("post","/ajaxLogin.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

    xhr.onreadystatechange=function(){
        //console.log("xhr.readyState");
        console.log("xhr.status");
        if(xhr.readyState==4&&xhr.status==200){
            ochaKan.style.display="block";
            console.log("xxxxxxx");
            var data=JSON.parse(xhr.responseText);
            console.log("从服务器返回的数据："+data);
            console.log(data[0].offline_tel);
            console.log(data[0].offline_date);
  //var b=parseInt(data[0].offline_date)
  //          console.log(b);

            var  a= new Date(data[0].offline_date)
            //console.log(a);

           var a=data[0].offline_date

            console.log(a)


            chaKan.innerHTML="电话：<div id='lookD'>"+data[0].offline_tel+"</div>" +
                "场景：<div id='lookC'>"+data[0].offline_id+"</div>" +
                "日期：<div id='lookR'>"+ a.slice(0,10)+"</div>" +
                "地址：<div id='lookZ'>"+data[0].offline_address+"</div>" +
                "需求：<div id='lookX'>"+data[0].offline_others+"</div>"+
                 " <div id='queDing' onclick='queRen()'>确定</div>"

        }
        var data=xhr.responseText;
    }
    xhr.send();
}
function queRen(){
    ochaKan.style.display="none";
}