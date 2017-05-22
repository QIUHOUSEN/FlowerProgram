var idBoxs=document.getElementsByClassName("idBox");
var imgS = document.getElementsByClassName("hover");
console.log(imgS.length)
for(var i=0;i<imgS.length;i++) {
    if (document.addEventListener) {
        imgS[i].addEventListener("click",sendImg(imgS[i],i),true);

    } else {
        imgS[i].attachEvent("onclick",sendImg(imgS[i],i));
    }
    function sendImg(obj,m) {
        return function() {
            /*  console.log("imgS的长度" + imgS.length);*/
            var imgId = idBoxs[m].innerHTML;
            /*  console.log(imgId);*/
            var xhr;
            if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } else if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            };
            xhr.open("post","/sendImg.do",true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
            };
            console.log("再点击页面图片发送到后台前的imgId："+imgId);
            xhr.send("imgId="+imgId+"&goodType="+"包装纸");
        }
    }
}