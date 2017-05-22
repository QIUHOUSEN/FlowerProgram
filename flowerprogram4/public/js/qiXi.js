var otiaoDong=document.getElementById("tiaoDong");
console.log("otiaoDong;"+otiaoDong);
window.setInterval(change,100);
/*window.setInterval(change2,1000);*/
function change(){
    otiaoDong.style.webkitTransform = "scale(1)";
    setTimeout(change2,500);
}
function change2(){
    otiaoDong.style.webkitTransform = "scale(1.2)";
    setTimeout(change,500);
}

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
        //console.log("imgSµÄ³¤¶È" + imgS.length);
        var imgId = idBoxs[x].innerHTML;
        console.log("idBoxs[x].innerHTML"+imgId);
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


