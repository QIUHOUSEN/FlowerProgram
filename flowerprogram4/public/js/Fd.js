var idBoxs=document.getElementsByClassName("idBox");
var imgS = document.getElementsByClassName("img_look");
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
        console.log("idBoxs[x].innerHTML"+imgId);
        var xhr;
        if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        };
        xhr.open("post","/send1.do",true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
        };
        xhr.send("imgId="+imgId);
    }
}