/**
 * Created by Administrator on 2016/9/20.
 */
/*var loginBtn = document.getElementById('loginBtn');
var registerBtn = document.getElementById('registerBtn');
var logAndRegister = document.getElementById('logAndRegister');//�õ���ĵ�¼ע�ᰴť

function clickLogin(){
    loginBtn.onclick=function(){

    }

}
clickLogin();

function clickRegister(){
    registerBtn.onclick=function(){

    }

}
clickRegister();*/

var forms = document.getElementsByClassName("forms");//登录注册按钮
var logregs = document.getElementsByClassName("logreg");//登录注册面板
var login = document.getElementById("login");//登录面板
var regin = document.getElementById("regin");//注册面板
var cover = document.getElementById("cover");
var switchs = document.getElementsByClassName("login-regin-switch");
var closebtns = document.getElementsByClassName("icon-remove");


//判断点击的是登录还是注册按钮
function regAndLogin(){
    var page1;
    var page2;
    for(var i=0; i<forms.length; i++){
        forms[i].onclick=function(){
            if(this.id=="form1"){//表明点击的是登录按钮
                //alert(this.id);
                page1 = login;
                page2 = regin;
                logregs[0].style.height="440px";
                page2.style.webkitTransform="rotateY(-180deg)";
            }else if(this.id=="form2"){
                page1 = regin;
                page2 = login;
                logregs[0].style.height="500px";
                page2.style.webkitTransform="rotateY(180deg)";
            }
            page1.style.webkitTransform="rotateY(0deg)";
            page1.style.display="block";
            page2.style.display="block";
            logregs[0].style.top="100px";
            page1.style.zIndex='31';
            page2.style.zIndex='29';
            cover.style.height="2796px";
            cover.style.width="100%";
            cover.style.zIndex="20";
            cover.style.display="block";
            cover.style.display="visible";
            cover.style.backgroundColor="rgba(0,0,0,0.5)";
        }
    }

}
regAndLogin();


//�����ڵ�¼ע������ϵ���л���¼ע�ắ��
function switchLogReg(){//��ת���������==================================================
    //var temp = login;
    var page;
    var page2;
    for(var i=0; i<switchs.length; i++){
        switchs[i].onclick=function(){
            page = this.parentNode;
            page2 = login;
            if(page.id=="login"){//切换按钮的父节点，判断如果是登录，证明当前面板就是登录面板
                page2=regin;
                logregs[0].style.height="500px";
            }else if(page.id=="regin"){
                page2=login;
                logregs[0].style.height="440px";
            }
            page.style.webkitTransition="all 0.5s linear";
            page2.style.webkitTransition="all 0.5s linear";
            page.style.webkitTransform="rotateY(-180deg)";
            page2.style.webkitTransform="rotateY(0deg)";
            page.style.zIndex='29';
            page2.style.zIndex='31';
        }
    }
}
switchLogReg();


//��¼ע���ϵĹرհ�ť
function closebtn(){

    for(var i=0; i<closebtns.length; i++){
        closebtns[i].onclick=function(){
            //alert(closebtns.length);
            logregs[0].style.top="-1000px";
            login.style.display="none";
            regin.style.display="none";
            cover.style.display="none";
        }
    }
}
closebtn();





var searchValue = document.getElementById('search');//输入框的值
var searchBtn = document.getElementById('searchBtn');//放大镜查询按钮
var rowFive = document.getElementById('rowFive');//这个是装载所有图片的最大div
var pageTh = 1;//定义当前页面是某一种类型的图片的第几页

function getImgTypeValue(){
    //var temp;
    //if(temp!=undefined){
    for(var i=0; i<imgTypes.length; i++){
        imgTypes[i].onclick=function(){
            //return this.innerHTML;
            return this.innerHTML;
        }
    }
    //}
}

/*function searchImg(){
    searchBtns();//查找输入框里面值的相应的图片某一页的图片(设定每一页面只有一个图片)
}
searchImg();*/

var numPage = 0;
searchBtn.onclick=function(){
    pageTh=1;
    numPage=countPage();//第一次点击搜索的时候，返回某一类的总页数
    searchBtns();
}
//查找输入框里面值的相应的图片某一页的图片(设定每一页面只有一个图片)
function searchBtns(){
    var xhr;
    if(window.ActiveXObject){
        xhr = new ActiveXObject();
    }else{
        xhr = new XMLHttpRequest();
    }
    xhr.open("post","showPhoto.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send("searchValue="+searchValue.value+"&pageTh="+pageTh);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var data = xhr.responseText;
            if(data=="error"){
                //rowFive.innerHTML="没有要找的图片";
                return;
            }else{
                //alert(data);
                var imgSrc = JSON.parse(data);
                rowFive.innerHTML="";
                for(var i=0; i<imgSrc.length; i++){
                    rowFive.innerHTML+="<div class='imgBox'><img src='"+imgSrc[i].src+"'/><p>#2342345</p><div><span class='icon-camera-retro'></span><span class='icon-heart-empty'></span></div></div>";
                }
            }
        }
    }
}


var prePage = document.getElementById('prePage');//得到上一页按钮
var nextPage = document.getElementById('nextPage');//得到下一页按钮
var imgTypes = document.getElementsByClassName('imgTypes');//得到多种类型的
var acountTypes=0;//记录某一种类型有多少种
var typePageth=1;//记录当前类别的第几页


function seperateType(){
    for(var i=0; i<imgTypes.length; i++){
        imgTypes[i].onclick=function(){
            typePageth=1;
            var tempValue=this.innerHTML;
            countTypes(tempValue);//计数某一种类型有多少条数据
            searchTypes(tempValue);//查找该类别的
            prePage.onclick=function(){
                typePageth--;
                if(typePageth<1){
                    typePageth=1;
                }
                searchTypes(tempValue);
            }
            nextPage.onclick=function(){
                typePageth++;
                if(typePageth>acountTypes){
                    typePageth=acountTypes;
                }
                searchTypes(tempValue);
            }
        }
    }
}
seperateType();

//计数下面的某一类别的条数
function countTypes(tempType){
   // alert(tempType);
    var xhr1;
    if(window.ActiveXObject){
        xhr1 = new ActiveXObject();
    }else{
        xhr1 = new XMLHttpRequest();
    }
    xhr1.open("post","searchCountType.do",true);
    xhr1.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr1.send("tempType="+tempType);

    xhr1.onreadystatechange=function(){
        if(xhr1.readyState==4 && xhr1.status==200){
            acountTypes = xhr1.responseText;
            console.log("类型有几种："+acountTypes);
        }
    }
}


//查找点击类别里面值的相应的图片某一页的图片(设定每一页面只有一个图片)
function searchTypes(datas){
    var xhr;
    if(window.ActiveXObject){
        xhr = new ActiveXObject();
    }else{
        xhr = new XMLHttpRequest();
    }
    xhr.open("post","showType.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send("searchType="+datas+"&typePage="+typePageth);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var data = xhr.responseText;
            if(data=="error"){
                //rowFive.innerHTML="没有要找的图片";
                return;
            }else{
                //alert(data);
                var imgSrc = JSON.parse(data);
                rowFive.innerHTML="";
                for(var i=0; i<imgSrc.length; i++){
                    rowFive.innerHTML+="<div class='imgBox'><img src='"+imgSrc[i].src+"'/><p>#2342345</p><div><span class='icon-camera-retro'></span><span class='icon-heart-empty'></span></div></div>";
                }
            }
        }
    }
}





//计数某一类图片有多少页
function countPage(){
    var xhr1;
    if(window.ActiveXObject){
        xhr1 = new ActiveXObject();
    }else{
        xhr1 = new XMLHttpRequest();
    }
    xhr1.open("post","searchCount.do",true);
    xhr1.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr1.send("searchValue="+searchValue.value);
    xhr1.onreadystatechange=function(){
        if(xhr1.readyState==4 && xhr1.status==200){
            numPage = xhr1.responseText;
            console.log("客户端的页数："+numPage);
        }
    }
}

function prePageFn(){
    prePage.onclick=function(){
        pageTh--;
        //typePageth--;
        if(pageTh<1){
            pageTh=1;
        }
        searchBtns();

    }
}
prePageFn();
function nextPageFn(){
    nextPage.onclick=function(){
        pageTh++;
        if(pageTh>numPage){
            pageTh=numPage;
        }
        searchBtns();
    }
}
nextPageFn();


var goPage = document.getElementById('goPage');//点击跳转页面的按钮
var goText = document.getElementById('goText');
goPage.onclick=function(){
    //console.log("跳转"+goText.value);
    pageTh=parseInt(goText.value);
    searchBtns();
}













