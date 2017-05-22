var x;
/*页面载入的效果*/
window.onload=function(){
    var cir1=document.getElementById("circle1");
    cir1.style.backgroundColor="lightgray";
};
var odiv1=document.getElementById("first_festival");
var odiv2=document.getElementById("second_festival");
var odiv3=document.getElementById("third_festival");
var cir1=document.getElementById("circle1");
var cir2=document.getElementById("circle2");
var cir3=document.getElementById("circle3");
var count=document.getElementsByClassName("festival");
/*第一次div轮播和滚动事件*/
function time(x){
    if(x==1){
        odiv1.style.left="0px";
        odiv1.style.transition="all 1s";
        odiv2.style.left="1349px";
        odiv2.style.transition="all 2s";
        odiv3.style.left="2698px";
        odiv3.style.transition="all 2s";


        cir1.style.backgroundColor="lightgray";
        cir2.style.backgroundColor="white";
        cir3.style.backgroundColor="white";
    }else if(x==2){
        odiv1.style.left="-1349px";
        odiv1.style.transition="all 2s";
        odiv2.style.left="0px";
        odiv2.style.transition="all 1s";
        odiv3.style.left="1349px";
        odiv3.style.transition="all  2s";


         cir2.style.backgroundColor="lightgray";
        cir1.style.backgroundColor="white";
        cir3.style.backgroundColor="white";
    }else if(x==3){
       odiv1.style.left="-2698px";
        odiv1.style.transition="all 2s";
        odiv2.style.left="-1349px";
        odiv2.style.transition="all 2s";
        odiv3.style.left="0px";
        odiv3.style.transition="all 1s";

        cir3.style.backgroundColor="lightgray";
        cir2.style.backgroundColor="white";
        cir1.style.backgroundColor="white";
    }

}
document.body.onmousewheel = function(event) {
    event = event || window.event;
  var x=odiv1.style.left;
    var left=odiv1.scrollLeft;
    console.log(left);
    //console.log(odiv1.style.left);
    if(event.wheelDelta<0){
        odiv1.style.left="-1349px";
        odiv1.style.transition="all 2s";
        odiv2.style.left="0px";
        odiv2.style.transition="all 1s";
        odiv3.style.left="1349px";
        odiv3.style.transition="all  2s";


        cir2.style.backgroundColor="lightgray";
        cir1.style.backgroundColor="white";
        cir3.style.backgroundColor="white";
    }else if(event.wheelDelta>0&&x=="-1349px"){
        odiv1.style.left="0px";
        odiv1.style.transition="all 1s";
        odiv2.style.left="1349px";
        odiv2.style.transition="all 2s";
        odiv3.style.left="2698px";
        odiv3.style.transition="all 2s";


        cir1.style.backgroundColor="lightgray";
        cir2.style.backgroundColor="white";
        cir3.style.backgroundColor="white";
    }
    if(event.wheelDelta<0&&x=="-1349px"){
        odiv1.style.left="-2698px";
        odiv1.style.transition="all 2s";
        odiv2.style.left="-1349px";
        odiv2.style.transition="all 2s";
        odiv3.style.left="0px";
        odiv3.style.transition="all 1s";

        cir3.style.backgroundColor="lightgray";
        cir2.style.backgroundColor="white";
        cir1.style.backgroundColor="white";
    }
    if(event.wheelDelta>0&&x=="-2698px"){
        odiv1.style.left="-1349px";
        odiv1.style.transition="all 2s";
        odiv2.style.left="0px";
        odiv2.style.transition="all 1s";
        odiv3.style.left="1349px";
        odiv3.style.transition="all  2s";


        cir2.style.backgroundColor="lightgray";
        cir1.style.backgroundColor="white";
        cir3.style.backgroundColor="white";
    }
    if(event.wheelDelta<0&&x=="-2698px"){
        odiv1.style.left="-2698px";
        odiv1.style.transition="all 2s";
        odiv2.style.left="-1349px";
        odiv2.style.transition="all 2s";
        odiv3.style.left="0px";
        odiv3.style.transition="all 1s";

        cir3.style.backgroundColor="lightgray";
        cir2.style.backgroundColor="white";
        cir1.style.backgroundColor="white";
    }

};


