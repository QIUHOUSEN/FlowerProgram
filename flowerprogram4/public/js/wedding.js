
window.onload=function(){

    var b1=document.getElementById("flower_one0");
    b1.style.left="30px";
    b1.style.transition="all 2.5s";
    var b2=document.getElementById("flower_one1");
    b2.style.right="60px";
    b2.style.transition="all 3s";
    var b4=document.getElementById("flower_two1");
    b4.style.left="30px";
    b4.style.transition="all 4s";
    var b3=document.getElementById("flower_two");
    b3.style.right="60px";
    b3.style.transition="all 4s";
    var h1=document.getElementById("space1_header");
    h1.style.margin="15px auto";
    h1.style.transition="all 1.5s";
    var sp0=document.getElementById("space0");
    sp0.style.opacity=1;
    sp0.style.transition="all 1s"
};
window.onscroll = function(){
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    var b4 = document.getElementById( "flower_space2_two" );
    var b5=document.getElementById("flower_two2");
    var b6=document.getElementById("space_flower_one");
    var b7 = document.getElementById( "flower_one2" );
    var h2=document.getElementById("space2_header");
    var sp1=document.getElementById("space1");

    var b8 = document.getElementById( "space3_flower1" );
    var b9=document.getElementById("flower_one3");
    var b10=document.getElementById("flower_two3");
    var b11 = document.getElementById( "space3_flower3" );
    var h3=document.getElementById("space3_header");
    var sp2=document.getElementById("space2");
    console.log(t);
    if(t>500&&t<550){
        h2.style.margin="15px auto";
        h2.style.transition="all 1.5s";
        sp1.style.opacity=1;
        sp1.style.transition="all 1s";
    }
    if(t>550&&t<700){
        b4.style.left="60px";
        b4.style.transition="all 2.5s";
        b5.style.right="30px";
        b5.style.transition="all 3s";
        b6.style.left="60px";
        b6.style.transition="all 4s";
        b7.style.right="30px";
        b7.style.transition="all 4s";

    } if(t>1000){

        h3.style.margin="15px auto";
        h3.style.transition="all 1.5s";
        sp2.style.opacity=1;
        sp2.style.transition="all 1s";
    };
    if(t>1300){
        b8.style.left="60px";
        b8.style.transition="all 2.5s";
        b9.style.right="30px";
        b9.style.transition="all 3s";
        b10.style.left="60px";
        b10.style.transition="all 4s";
        b11.style.right="30px";
        b11.style.transition="all 4s";
    }
};


/*第一个通用型获取数据*/

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


/*第二个非通用型获取数据ajax*/
/*var shadow=document.getElementsByClassName("img_shadow");
console.log(shadow.length);
for(var x=0;x<shadow.length;x++){
    shadow[x].setAttribute("onclick","sendImg("+x+")");
}
/!*sendSrc.do*!/
function sendImg(x) {
    //获取相对就的表单元素中的值；
    var src;
    //console.log("x是"+(parseInt(x)));
    //x是一个字符。。需要转换
    var a = document.getElementsByClassName("img_shadow")[parseInt(x)];
    //console.log(a);
    var b = a.parentNode.getElementsByTagName("img")[0];/!*tagname是一个数组*!/
   // console.log(b);
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
}*/

