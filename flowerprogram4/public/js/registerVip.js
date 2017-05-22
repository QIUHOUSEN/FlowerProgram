//global variable
var mainBox=document.getElementsByTagName("main");
var rulesBox=document.getElementById("rulesBox");
var rechargeBox=document.getElementById("rechargeBox");
var paymentBox=document.getElementById("paymentBox");

var bt_registerVip=document.getElementById("bt_registerVip");
var bt_confirm=document.getElementById("bt_confirm");
var bt_pay=document.getElementById("bt_pay");
var bt_close=document.getElementsByClassName("close");

var enter_box=document.getElementById("money");
//add events listener
bt_registerVip.addEventListener("click",onRegister);
bt_confirm.addEventListener("click",onConfirm);
bt_pay.addEventListener("click",onPay);
if(bt_close.length>0){
    var i;
    for(i=0;i<bt_close.length;i++){
        bt_close[i].addEventListener("click",onClose);
    }
}
enter_box.addEventListener('change',moneyChange);
//enter_box.addEventListener('input',moneyChange);
//main code
window.onload();
//function
function onload(){
    //if(mainBox.innerHTML!=""){
    //    mainBox.innerHTML="";
    //}else{
    //    initHtml=mainBox.innerHTML;
    //    var mainHtml=initHtml;
    //    mainBox.innerHTML=mainHtml;
    //}
}
function onRegister(){
    rulesBox.style.display="none";
    rechargeBox.style.display="block"
}
function onConfirm(){
    var money=enter_box.value;
    console.log(enter_box)
    if(money>=500 && money<=100000){
        rechargeBox.style.display="none";
        paymentBox.style.display="block";
    }
    else{
        var warning=document.createElement("p");
        warning.style.color="red";
        warning.innerHTML="输入金额至少为500元";
    }
}
function moneyChange(){
    var money=enter_box.value;
    var recharge=document.getElementById("recharge_box");
    if(money>=500 && recharge.childElementCount>1){
        recharge.removeChild(recharge.lastElementChild);
    }
    if(money<500){
        var warning=document.createElement("p");
        warning.className="warning";
        warning.innerHTML="输入金额至少为500元";
        recharge.appendChild(warning);
    }
    if(money>100000){
        var warning=document.createElement("p");
        warning.className="warning";
        warning.innerHTML="输入金额最多为10万元";
        recharge.appendChild(warning);
    }
}

function onPay(){
    paymentBox.firstElementChild.innerHTML="";//remove all elements
    //get nodes
    var box_inner=paymentBox.firstElementChild;
    var parent=paymentBox.parentNode;
    var mainBox=parent.parentNode;
    var mask=document.getElementById("mask");
    //create new nodes
    var imgSpan=document.createElement("span");
    var payLoad=document.createElement("img");
    var loadText=document.createElement("h3");
    //change boxes to full screen
    mainBox.className="full_main";
    parent.className="full_container";
    paymentBox.className="full_box";
    //change mask state
    mask.style.display="block";
    mask.style.filter="blur(3px)";
    //change the content box
    box_inner.style.position="fixed";
    box_inner.style.top="0";
    box_inner.style.left="0";
    box_inner.style.width="100%";
    //setting new nodes attributes
    imgSpan.className="icon60";
    imgSpan.style.display="block";
    payLoad.src="../images/registerVip/paying.gif";
    loadText.innerHTML="支付跳转中";
    //add new nodes into content box
    imgSpan.appendChild(payLoad);
    box_inner.appendChild(imgSpan);
    box_inner.appendChild(loadText);
    //delay showing the payment finished page
    setTimeout(payFinish,1000);
}
function payFinish(){
    var box_inner=paymentBox.firstElementChild;
    var imgSpan=box_inner.firstElementChild;
    var payLoad=imgSpan.firstElementChild
    var loadText=box_inner.lastElementChild;
    payLoad.src="../images/registerVip/payfinish.png";
    loadText.innerHTML="支付完成";
    //setting change page
   setTimeout(function () {
       mask.style.display="none";
       payLoad.style.display="none";
       loadText.innerHTML="";
   },500);
}
function onClose(){
    var node=this.parentNode;
    var box=node.parentNode;
    //console.log(box)
    box.style.display="none";
    rulesBox.style.display="block";
}

