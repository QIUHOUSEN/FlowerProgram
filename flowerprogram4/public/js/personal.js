/**
 * Created by Administrator on 2016/10/7.
 */

var myOrder = document.getElementById('myOrder');
var myCord = document.getElementById('myCord');
var myStore = document.getElementById('myStore');
var closes = document.getElementsByClassName('closes');
var personCover = document.getElementById('personCover');
var doMyOrder = document.getElementById('doMyOrder');
var threeChoose = document.getElementsByClassName('threeChoose');
var panels = document.getElementsByClassName('panels');

var changeInf = document.getElementsByClassName('changeInf');

var doInformation = document.getElementsByClassName('doInformation');
var closeChanges = document.getElementsByClassName('closeChanges');
var informationCover = document.getElementById('informationCover');

var addBtn = document.getElementById('addBtn');//点击添加收获地址按钮
var conforms = document.getElementById('conforms');//点击确认添加收获地址按钮
var cancels = document.getElementById('cancels');//点击取消添加收获地址按钮
var addrLabels = document.getElementById('addrLabels');
var addrInputs = document.getElementById('addrInputs');



//点击各种中心的关闭按钮关闭相应的面板
function closesFunc(){
    for(var i=0; i<closes.length; i++){
        closes[i].onclick=function(){
            var temp = this.getAttribute("index");
            panels[temp].style.display='none';
            personCover.style.display='none';
        }
    }
}
closesFunc();

//点击各种中心打开相应的面板
function showAChoose(){
    for(var i=0; i<threeChoose.length; i++){
        threeChoose[i].onclick=function(){
            var temp = this.getAttribute("index");
            panels[temp].style.display='block';
            personCover.style.display='block';
            /*if(temp==0){
                askMyOrder();
            }*/
        }
    }
}
showAChoose();

/*function changeInformation(){
    for(var i=0; i<changeInf.length; i++){
        changeInf[i].onclick=function(){
            //alert(this.className);
        }
    }
}
changeInformation();*/

function closeChangesPanel(){
    for(var i=0; i<closeChanges.length; i++){
        closeChanges[i].onclick=function(){
            var temp = this.getAttribute("index");
            doInformation[temp].style.display='none';
            informationCover.style.display='none';
        }
    }
}
closeChangesPanel();

function showChangesPanel(){
    for(var i=0; i<changeInf.length; i++){
        changeInf[i].onclick=function(){
            var temp = this.getAttribute("index");
            doInformation[temp].style.display='block';
            informationCover.style.display='block';
        }
    }
}
showChangesPanel();

function addAddress(){


}
addAddress();


//个人中心里面点击我的订单，查询所有订单
var myOrder = document.getElementById('myOrder');
function askMyOrder(){
    var xhr;
    if(window.ActiveXObject){
        xhr = new ActiveXObject();
    }else{
        xhr = new XMLHttpRequest();
    }
    xhr.open("post","/myOrder.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    //console.log(logusername.value+" "+logpassword.value);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var data = xhr.responseText;

        }
    }
    xhr.send();
}

//点击修改联系方式的保存按钮
$("#lxfsSave").click(function () {
    var sjh = $("#sjh").val();
    var yx = $("#yx").val();

    //alert(sjh+"="+yx);
    $.post("changelx.do",{"sjh":sjh,"yx":yx},function(data){
        console.log("下面是修改联系方式");
        console.log(data);
        if(data=="ok"){
            $("#changeTel").css("display","none");
            $("#informationCover").css("display","none");
        }

    });

})
//下面是点击修改收获地址
$("#addBtn").click(function () {
    var shrname = $("#shrname").val();
    var shrtel = $("#shrtel").val();
    var shraddr = $("#shraddr").val();
    var shrtb = $("#shrtb");
    var trs = $("#shrtb tr");
    console.log(trs.length);
    var tr = shrtb.get(0).insertRow(trs.length);
    var cell1 = tr.insertCell(0);
    var cell2 = tr.insertCell(1);
    var cell3 = tr.insertCell(2);
    var cell4 = tr.insertCell(3);

    cell1.innerHTML = shraddr;
    cell2.innerHTML = shrname;
    cell3.innerHTML = shrtel;
    cell4.innerHTML = "<input type='button' value='删除'>";

    var deleteBtns = $("#shrtb input[type=button]");

    deleteBtns.click(function(){
        $(this).parent().parent("tr").remove();
        //console.log($(this).attr("value"));
    })

})



var usernames = document.getElementById('usernames');
var errorText = document.getElementById('errorText');
usernames.onfocus=function(){
    //alert(regusername.value);
    usernames.onblur=function(){
        if(usernames.value.length<3){
            errorText.style.display='block';
        }if(usernames.value.length>2){
            errorText.style.display='none';
            //logUsernameError = true;
        }
    }
}

var aa = document.getElementById('aa');
var xuanze = document.getElementById('xuanze');
var saves = document.getElementById('saves');
var headImg = document.getElementById('headImg');
var arr=[];
var headers = document.getElementById('headers');

saves.onclick=function(){
    //alert('sadfsadf');
    //alert(aa.value);
    console.log(aa.value);
    var imgName = aa.value;
    arr = imgName.split('\\');
    console.log(arr.length);
    imgName=arr[arr.length-1];

    console.log(imgName);
    headImg.setAttribute('src','../images/'+imgName);
    console.log("完整："+headImg.getAttribute("src"));
    var imgSrcs = '../images/'+imgName;
    /*headImg.style.width='40px';
    headImg.style.height='40px';
    headers.setAttribute('src','../images/'+imgName);*/

    var xhr;
    if(window.ActiveXObject){
        xhr = new ActiveXObject();
    }else{
        xhr = new XMLHttpRequest();
    }
    xhr.open("post","/headImg.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var data = xhr.responseText;
            //console.log("这是从服务器返回在客户端的数据："+data);
            console.log(data+"---------------");

        }
    }
    xhr.send("imgSrcs="+imgSrcs);
}


var goBack = document.getElementById('goBack');
function clickGoBack(){
    goBack.onclick=function(){
        var xhr;
        if(window.ActiveXObject){
            xhr = new ActiveXObject();
        }else{
            xhr = new XMLHttpRequest();
        }
        xhr.open("post","/goBack.do",true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 && xhr.status==200){
                var data = xhr.responseText;
                console.log("返回：：："+data);
                if(data=='ok'){
                    window.location.href='./index.html';
                }
            }
        }
        xhr.send(null);
    }
}
clickGoBack();






