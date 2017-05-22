/*页面载入的效果*/
window.onload=function(){
    var b1=document.getElementById("block1");
    b1.style.animation="animation_1 3s";
    var b2=document.getElementById("block2");
    b2.style.animation="animation_2 2.5s";
    var b3=document.getElementById("block3");
    b3.style.animation="animation_3 1.5s";
    var line2=document.getElementById("line2");
    line2.style.animation="animation_4 3s";
    var h1=document.getElementById("h1");
    h1.style.marginTop="0px";
    h1.style.transition="all 2s";
    /*var p1=document.getElementById("birthday_p");
    p1.style.*/
    var sp1=document.getElementById("birthday1");
    sp1.style.opacity=1;
    sp1.style.transition="all 1.5s"
};
/*滚动鼠标的效果*/
window.onscroll = function(){

    var t = document.documentElement.scrollTop || document.body.scrollTop;
    /*console.log(scrollY);*/
    var b4 = document.getElementById( "block4" );
    var b5=document.getElementById("block5");
    var b6=document.getElementById("block6");

    var line4=document.getElementById("line4");
    var h2=document.getElementById("h2");
    var sp2=document.getElementById("birthday2");

    var b7 = document.getElementById( "block7" );
    var b8=document.getElementById("block8");
    var b9=document.getElementById("block9");

    var line6=document.getElementById("line6");
    var h3=document.getElementById("h3");
    var sp3=document.getElementById("birthday3");

    var b10 = document.getElementById( "block10" );
    var b11=document.getElementById("block11");
    var b12=document.getElementById("block12");

    var line8=document.getElementById("line8");
    var h4=document.getElementById("h4");
    var sp4=document.getElementById("birthday4");
    if(t>220){
        h2.style.marginTop="0px";
        h2.style.transition="all 2s";
        sp2.style.opacity=1;
        sp2.style.transition="all 1.5s";
        line4.style.animation="animation_4 3s";
    }
    if(t>270&&t<500){
        b4.style.animation="animation_1 3s";
        b5.style.animation="animation_2 2.5s";
        b6.style.animation="animation_3 1.5s";
    }
    if(t>800){
        line6.style.animation="animation_4 3s";
        h3.style.marginTop="0px";
        h3.style.transition="all 2s";
        sp3.style.opacity=1;
        sp3.style.transition="all 1.5s"
    }
    if(t>900&&t<1300){
        b7.style.animation="animation_1 3s";
        b8.style.animation="animation_2 2.5s";
        b9.style.animation="animation_3 1.5s";
    }
    if(t>1400){
        line8.style.animation="animation_4 3s";
        h4.style.marginTop="0px";
        h4.style.transition="all 2s";
        sp4.style.opacity=1;
        sp4.style.transition="all 1.5s"
    }
    if(t>1500){
        b10.style.animation="animation_1 3s";
        b11.style.animation="animation_2 2.5s";
        b12.style.animation="animation_3 1.5s";
    }
};


/*birthday页面中保存的产品的classname【存入他的id】*/
var idBoxs=document.getElementsByClassName("idBox");
/*birthday页面中点击购买或者产品详情的classname*/
var imgS = document.getElementsByClassName("img_look");
//点击购买将产品数据传入后台
for(var i=0;i<imgS.length;i++) {
    if (document.addEventListener) {
        imgS[i].onclick = function () {
            sendImg(this.getAttribute('index'));
        }
    } else {
        imgS[i].click = function () {
            //alert(this.getAttribute('index'));
            sendImg(this.getAttribute('index'));
        }
    }
    function sendImg(x) {
        //console.log("imgS的长度" + imgS.length);
        var imgId = idBoxs[x].innerHTML;
        //console.log(imgId);
        var xhr;
        if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        };
        xhr.open("post","/send.do",true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        /* xhr.send("imgId=" + imgId);*/
        xhr.onreadystatechange = function () {
        };
        xhr.send("imgId="+imgId);
    }
}


/*
var shadow=document.getElementsByClassName("img_shadow");
console.log(shadow.length);
for(var x=0;x<shadow.length;x++){
    shadow[x].setAttribute("onclick","sendImg("+x+")");
}
/!*checkLogin*!/
function sendImg(x) {
 //获取相对就的表单元素中的值；
 var src;
    console.log("x是"+(parseInt(x)));
 var a = document.getElementsByClassName("img_shadow")[parseInt(x)];
    console.log(a);
    var c= a.parentNode;
    console.log("c是"+c);
 var b = a.parentNode.getElementsByTagName("img")[0];/!*tagname是一个数组*!/
    console.log(b);
 var src = b.getAttribute("src");
    console.log("src是"+src);
 //创建XMLHttpRequest
 var xhr;
 //IE
 if (window.ActiveXObject) {
 xhr = new ActiveXObject("Microsoft.XMLHTTP");
 } else if (window.XMLHttpRequest) {
 //DOM,非IE。
 xhr = new XMLHttpRequest();
 }
 //配置AJAX。
 xhr.open("post","/sendSrc.do",true);
 xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
 xhr.send("src="+src);
 var data;
 xhr.onreadystatechange=function(){
 //操作网页：
 };

 //console.log(data);//如果是同步，则输出data的值，如果是异步，则是undefined.

 }
*/


































