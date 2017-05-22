/**
 * Created by lenovo on 2016/10/7.
 */
var tupian=document.getElementById("hua")
var wenzi=document.getElementById("best_wenzi")
var meigui=document.getElementById("meigui")
var shejishi=document.getElementById("shejishi")
var xijiezhanshi=document.getElementById("xijiezhanshi")
var dakaifenfang=document.getElementById("dakaifenfang")
window.onscroll = function(){
    var t = document.documentElement.scrollTop || document.body.scrollTop;//获取滚动条位置

console.log(tupian.style.right+"dsadadawdad")

    console.log(t+"2454545")
    if(t>1450&&t<2600){
        wenzi.style.left=300+"px"
       tupian.style.right=150+"px"
meigui.style.width=316+"px"
        meigui.style.height=512+"px"
     setTimeout(meiguishow,2000)
    }
    else{
        wenzi.style.left=-400+"px"
        tupian.style.right=-400+"px"
        meigui.style.width=0+"px"
        meigui.style.height=0+"px"
    }
    if(t>2200&&t<3300){
        shejishi.style.left=50+"px"
        xijiezhanshi.style.right=50+"px"
    }
    else{
        xijiezhanshi.style.right = -1021 + "px"
        shejishi.style.left=-1000+"px"
    }

  /*  if(t>2800&&t<3992){
        xijiezhanshi.style.right=226+"px"

    }
    else {
        xijiezhanshi.style.right = -1021 + "px"
    }*/
   function meiguishow(){
       meigui.style.webkitTransform="rotateY(360deg)"
       meigui.style.left=90+"px"
   }
  /*  if(t<1550&&t>){
        wenzi.style.left=-400+"px"
        tupian.style.right=-400+"px"
    }*/

}

var idBoxs=document.getElementsByClassName("idBox");
var imgS = document.getElementsByClassName("chakna_2");
console.log(imgS.length)
for(var i=0;i<imgS.length;i++) {
    if (document.addEventListener) {
        imgS[i].onclick = function () {
            sendImg(this.getAttribute('index'));
            console.log("dasdasdad")
        }
    } else {
        imgS[i].click = function () {
            //alert(this.getAttribute('index'));
            sendImg(this.getAttribute('index'));
        }
    }
    function sendImg(x) {
        /*  console.log("imgS的长度" + imgS.length);*/
        var imgId = idBoxs[x].innerHTML;
        /*  console.log(imgId);*/
        var xhr;
        if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        };
        xhr.open("post","/send2.do",true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
        };
        xhr.send("imgId="+imgId);
    }
}