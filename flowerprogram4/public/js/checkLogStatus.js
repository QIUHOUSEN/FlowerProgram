/**
 * Created by Administrator on 2016/10/10.
 */

var controlls = document.getElementById('controlls');
/*var personHead = document.getElementById('personHead');*/
var pUsername = document.getElementById('pUsername');

window.onload=loginStatus();
function loginStatus(){
    var xhr;
    if(window.ActiveXObject){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }else{
        xhr = new XMLHttpRequest();
    }
    xhr.open("get","/loginStatus.do",true);
    //xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            var data = xhr.responseText;
            if(data != "error"){
                console.log("返回到客户端的：session"+data);
                data=JSON.parse(data);
                console.log(data.uname+"   :"+data.upwd);
                controlls.style.display='block';
     /*           personHead.style.display='block';*/
                pUsername.innerHTML=data.uname;


            }else{
                //document.getElementById("status").innerHTML="未登录"; //"登录失败"
            }
        }
    }
    xhr.send(null);
};



