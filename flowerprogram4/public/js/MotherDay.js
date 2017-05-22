var idBox=document.getElementsByClassName("idBox");
var imgS = document.getElementsByClassName("img_look");
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
        console.log(imgId);
        var url = 'detail.html?id='+imgId;
        location.href(url);

    }
}
