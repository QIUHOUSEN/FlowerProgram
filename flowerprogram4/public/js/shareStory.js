/**
 * Created by Administrator on 2016/10/12.
 */
//global variable

var wrapper=document.getElementById("wrapper");
var menu=wrapper.firstElementChild;
var mainBox=document.getElementById("mainBox");
var mask=document.getElementById("mask");
var storyEditBox=document.getElementById("storyEditBox");
var storyShowBox=document.getElementById("storyShowBox");
var promptBox=document.getElementById("prompt");
var textShowBox=document.getElementById("textShowBox");
var textEditBox=document.getElementById("textEditBox");

var bt_closeEditBox=document.getElementById("bt_closeEditBox");
var bt_closeShowBox=document.getElementById("bt_closeShowBox");
var bt_back=document.getElementById("bt_back");
var bt_submit=document.getElementById("submitSotry");
var bt_home=document.getElementById("bt_home");
var bt_menu=document.getElementById("bt_menu");
var bt_arrLeft=document.getElementById("bt_arrLeft");
var bt_arrRight=document.getElementById("bt_arrRight");
var bt_edit=document.getElementById("bt_edit");


var color=["dfdcdd","a83248","d1c470","e3d7d3","95aa92","989879","ef5a84","dcc5b6"];
//test data
var textString;//修改部分 上传字符串变量
var n=1;//修改部分 图片标号
var time;
//events listener
bt_closeEditBox.addEventListener("click",onCloseEdit);
bt_closeShowBox.addEventListener("click",onCloseShow);
bt_submit.addEventListener("click",submitStory);
bt_back.addEventListener("click",backPage);
bt_home.addEventListener("click",backHome);
bt_menu.addEventListener("click",showMenu);
bt_arrLeft.addEventListener("click",silderLeft);
bt_arrRight.addEventListener("click",silderRight);
bt_edit.addEventListener("click",editStory);
//promptBox.addEventListener("forcus",clearText);

textEditBox.addEventListener("focus",clearInitText);
//function
function clearInitText(){
    if(textEditBox.innerHTML="写下你的故事，与我们分享爱与生活……"){
        textEditBox.innerHTML="";
    }
}
function onload(){
    menu.className="short_nav";
    if(mainBox.childElementCount>0){
        mainBox.innerHTML="";
        textEditBox.innerHTML="";
    }
    generatePetal();//调用花瓣生成函数
    textEditBox.innerHTML="写下你的故事，与我们分享爱与生活……";

}
/*
 花朵结构：
 ->花朵块flowerWrapper
 ->花瓣包裹块petalWrapper（动态加载背景图片）
 ->花瓣块petal（颜色层）
 <div class="flowerWrapper">
 <div class="petal_wrapper">
 <div class="petal"></div>
 </div>
 </div>
 */
function generatePetal(){
    var i,j;
    for(j=0;j<6;j++){
        var flowerWrapper=document.createElement("div");
        flowerWrapper.className="flower_wrapper";
        for(i=0;i<4;i++){
            var petalWrapper=document.createElement("div");
            var petal=document.createElement("div");
            var color=randomColor();
            petalWrapper.className="petal_wrapper";
            petal.className="petal";
            petalWrapper.style.backgroundImage="url('../images/shareStory/headPic/"+n+".jpg')";
            petal.style.backgroundColor=color;
            petalWrapper.appendChild(petal);
            flowerWrapper.appendChild(petalWrapper);
            petal.addEventListener('click',showStory);
            n++;
        }
        mainBox.appendChild(flowerWrapper);
    }
}
function randomColor(){
    var a=Math.floor(Math.random()*10)-3;
    return "#"+color[a];
}
function clearText(){
    textEditBox.innerHTML="";
}
function finishLoad(s){
    textString=s;
    storyEditBox.style.display="none";
    //修改部分
    setTimeout(function(){ promptBox.style.display="none";mask.style.display="none";onload() },1000);

}
//button events
function backHome(){
    //page go index.html
}
function showMenu(){
    if(menu.style.top=="0px"){
        menu.style.top="-100px";
    }else{
        menu.style.top="0";
    }
    menu.style.webkitTransition="all 0.2s";
}
function silderLeft(){

}
function silderRight(){

}
function editStory(){
    mask.style.display="block";
    storyEditBox.style.display="block";
}
function showStory(){
    mask.style.display="block";
    storyShowBox.style.display="block";
    textShowBox.readOnly="readonly";
}
function backPage(){
    storyShowBox.style.display="none";
    mask.style.display="none";
}
function onCloseShow(){
    storyShowBox.style.display="none";
    mask.style.display="none";
}
function onCloseEdit(){
    storyEditBox.style.display="none";
    mask.style.display="none";
    textEditBox.innerHTML="";
}

function submitStory(){
    var s;
    s=textEditBox.value;
    //console.log(s)
    if(s!=""){
        promptBox.style.display="block";
        finishLoad(s);
    }
    else{
        alert("请输入内容！");
    }
}

//main code
window.onload();