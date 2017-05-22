/**
 * Created by Administrator on 2016/9/29.
 */

var searchBtn = document.getElementById('searchBtn');
var searchInput = document.getElementById('searchInput');
var centers =document.getElementById('centers');
centers.onclick=function(){
    //alert("sdfsdfsdf");
    window.location.href="personal.html";
}

//设置点击搜索按钮出现放大镜搜索效果
function clickSearchBtn(){
    searchBtn.onclick=function(){
        searchInput.style.width="140px";
        searchInput.style.paddingLeft="35px";
        searchInput.style.right="180px";

        searchBtn.style.color="black";
        searchBtn.style.right="330px";
        searchInput.focus();
    }
    //当输入框失去焦点时候
    searchInput.onblur=function(){
        searchInput.style.width="0px";
        searchInput.style.paddingLeft="0px";
        searchInput.style.right="180px";

        searchBtn.style.color="white";
        searchBtn.style.right="180px";
    }
}
clickSearchBtn();



//下面是鲜花周边移动上去的显示和隐藏事件
var navSeven = document.getElementById('navSeven');
var flowerRound = document.getElementById('flowerRound');
//移动上去显示和隐藏选项
function showFlowerRound(){
    navSeven.onmouseover=function(){
        flowerRound.style.display="block";
        flowerRound.style.height="110px";

    }
    flowerRound.onmouseout=function(){
        flowerRound.style.display="none";
    }

}
//showFlowerRound();



//这个是banner轮播图效果
var leftdiv = document.getElementById('leftdiv');
var rightdiv = document.getElementById('rightdiv');
var langdiv = document.getElementById('langdiv');
var imgdivs = document.getElementsByClassName('imgdivs');
var btns = document.getElementsByName('btns');
var wrapAll = document.getElementById('wrapAll');
var index = 1;
var timer;
var ainimates = false;
window.onload=function(){
    function showBtns(){
        for(var i=0; i<btns.length; i++){
            if(btns[i].className=='on'){
                btns[i].className='';
                break;
            }
        }
        btns[index-1].className='on';
    }


    function animates(offset){
        ainimates = true;
        var newLeft = parseInt(langdiv.style.left)+offset;
        var time = 400;//要移动一次得总时间
        var inter = 10;//每隔多久移动一次;
        var speed = offset/(time/inter);//移动的总距离除以次数，就是一次移动的距离

        function isgo(){
            if((speed<0 && newLeft<parseInt(langdiv.style.left)) || (speed>0 && newLeft>parseInt(langdiv.style.left))){
                langdiv.style.left = parseInt(langdiv.style.left) +speed+'px';
                setTimeout(isgo,inter);
            }else{
                //ainimates = false;
                langdiv.style.left=newLeft+'px';
                //说明此时此刻在第10张上面，左边距为-7200
                if(newLeft<-4047){
                    langdiv.style.left=-1349+'px';
                }
                //说明此时此刻在第1张上面，左边距为0
                if(newLeft>-1349){
                    langdiv.style.left=-4047+'px';
                }
                ainimates = false;
            }
        }
        isgo();

    }
    //自动播放
    function play(){
        timer=setInterval(function(){
            rightdiv.onclick();
        },6000);
    }
    play();

    function stop(){
        clearInterval(timer);
    }

    wrapAll.onmouseover=function(){
        stop();
    }
    wrapAll.onmouseout=function(){
        play();
    }

    rightdiv.onclick=function(){
        //如果是在动画的时候，那么就不能点击左右按钮，否则才可以点亮按钮和动画
        if(ainimates){
            return;
        }
        if(index==3){
            index=1;
        }else {
            index++;
        }
        animates(-1349);
        showBtns();
    }
    leftdiv.onclick=function(){
        //如果是在动画的时候，那么就不能点击左右按钮，否则才可以点亮按钮和动画
        if(ainimates){
            return;
        }
        if(index==1){
            index=3;
        }else {
            index--;
        }
        showBtns();
        animates(1349);
    }
    for(var i=0; i<btns.length; i++){
        btns[i].onclick=function(){
            //如果动画还未结束，那么就不能点击下面的按钮
            if(ainimates){
                return;
            }
            if(this.className=='on'){
                return;
            }
            //这里的自定义属性不可以用this点属性名的方式获得，只有对象本身的
            //属性，比如id class之类的才可以直接用this.classname的方式获得
            var myindex = parseInt(this.getAttribute('index'));
            var offset = (myindex - index)*-1349;
            animates(offset);
            index=myindex;
            showBtns();
        }
    }
}


//这个是滚动加载到一定的高度后，让图片向上冒
var scrollYs=0;
var img1 = document.getElementById('img1');
var flowerBoxs = document.getElementsByClassName('flowerBox');

window.onscroll=function(){
    scrollYs = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollYs>260){
        //alert(img1.id);
        img1.style.top=-100+"px";
    }
    //这个是当滚动达到一定的高度后，并排的三束花向上移动
    if(scrollYs>1300){
        //alert('asdg');
        for(var i=0; i<flowerBoxs.length; i++){
            flowerBoxs[i].style.marginTop="50px";
        }

    }
}





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
                logregs[0].style.height="550px";
                page2.style.webkitTransform="rotateY(180deg)";
            }
            page1.style.webkitTransform="rotateY(0deg)";
            page1.style.display="block";
            page2.style.display="block";
            logregs[0].style.top="50px";
            page1.style.zIndex='1001';
            page2.style.zIndex='1000';
            logregs[0].style.zIndex='999';
            logregs[0].style.display='block';
            cover.style.height="2796px";
            cover.style.width="100%";
            cover.style.zIndex="99";
            cover.style.display="block";
            cover.style.display="visible";
            cover.style.backgroundColor="rgba(0,0,0,0.5)";
        }
    }

}
regAndLogin();


//这个是点击登录注册面板上的切换按钮函数
function switchLogReg(){
    //var temp = login;
    var page;
    var page2;
    for(var i=0; i<switchs.length; i++){
        switchs[i].onclick=function(){
            page = this.parentNode;
            page2 = login;
            if(page.id=="login"){//切换按钮的父节点，判断如果是登录，证明当前面板就是登录面板
                page2=regin;
                logregs[0].style.height="550px";
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


//登录注册上的关闭按钮
function closebtn(){
    var closebtns = document.getElementsByClassName("fa fa-times");
    var logregs = document.getElementsByClassName("logreg");
    var login = document.getElementById("login");
    var regin = document.getElementById("regin");
    var cover = document.getElementById("cover");

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



//以下是判定正则表达式登录注册部分
var regusername = document.getElementById('regusername');//用户名输入框
var usernamStauts = document.getElementById('usernamStauts');//提示用户的地方
var reguseraddr = document.getElementById('reguseraddr');//这个是邮箱输入框
var emailStauts = document.getElementById('emailStauts');//这个是提示用户的邮箱
var regpassword = document.getElementById('regpassword');//这个是用户输入密码的
var pwdStauts = document.getElementById('pwdStauts');//这个是用户密码提示的地方
var regrepassword = document.getElementById('regrepassword');//这个是重复密码输入框
var repwdStauts = document.getElementById('repwdStauts');//这个事重复密码输入框状态
var tel = document.getElementById('tel');//这个是输入电话
var telStauts = document.getElementById('telStauts');//这个是电话状态
//以下是定义几个状态（只有当用户的名字邮箱密码电话不为空并且合法才可以注册）
var userName;
var userEmail;
var userPwd;
var userRepwd;
var userTel;



//下面是点击注册按钮的时候将用户信息判断进行注册(2694128434@qq.com 18180545122)
var regBtn = document.getElementById('zhuce');
function regBtnClick(){
    regBtn.onclick=function(){
        var regusername = document.getElementById('regusername');//用户名输入框
        var reguseraddr = document.getElementById('reguseraddr');//这个是邮箱输入框
        var regpassword = document.getElementById('regpassword');//这个是用户输入密码的
        var regrepassword = document.getElementById('regrepassword');//这个是重复密码输入框
        var tel = document.getElementById('tel');//这个是输入电话

        if(regusername.value!="" && reguseraddr.value!="" && regpassword.value!="" && regrepassword.value!="" && tel.value!="" && userName==true && userEmail==true && userPwd==true && userRepwd==true &&userTel==true){
            //ok符合注册的规则(调用ajax请求函数)
            regAjax(regusername.value,reguseraddr.value,regpassword.value,regrepassword.value,tel.value);
        }
    }
}
regBtnClick();

var logBtn = document.getElementById('logBtn');
var logusername = document.getElementById('logusername');
var logpassword = document.getElementById('logpassword');
var logStatus = document.getElementById('logStatus');
var logUsernameError=false;
var logPwdError = false;

function logBtnClick(){
    logBtn.onclick=function(){
        var logusername = document.getElementById('logusername');
        var logpassword = document.getElementById('logpassword');
        if(logusername.value!="" && logpassword.value!="" && logUsernameError==true && logPwdError==true){
            logAjax(logusername,logpassword);
        }
    }
}
logBtnClick();

var logusername = document.getElementById('logusername');
var logUsernamStauts = document.getElementById('logUsernamStauts');
var logpassword = document.getElementById('logpassword');
var logPwdStauts = document.getElementById('logPwdStauts');

logusername.onfocus=function(){
    //alert(regusername.value);
    logusername.onblur=function(){
        if(logusername.value.length<3){
            logUsernamStauts.style.display='block';
        }if(logusername.value.length>2){
            logUsernamStauts.style.display='none';
            logUsernameError = true;
        }
    }
}
logpassword.onfocus=function(){
    logpassword.onblur=function(){
        if(logpassword.value.length<6){
            logPwdStauts.style.display='block';
        }if(logpassword.value.length>5){
            logPwdStauts.style.display='none';
            logPwdError = true;
        }
    }
}


regusername.onfocus=function(){
    //alert(regusername.value);
    regusername.onblur=function(){
        if(regusername.value.length<3){
            usernamStauts.style.display='block';
        }if(regusername.value.length>2){
            usernamStauts.style.display='none';
            userName = true;
        }
    }
}
var exEmail = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
reguseraddr.onfocus=function(){
    reguseraddr.onblur=function(){
        if(!bijiao(exEmail,reguseraddr.value)){
            emailStauts.style.display='block';
        }if(bijiao(exEmail,reguseraddr.value)){
            emailStauts.style.display='none';
            userEmail = true;
        }
    }
}
regpassword.onfocus=function(){
    regpassword.onblur=function(){
        if(regpassword.value.length<6){
            pwdStauts.style.display='block';
        }if(regpassword.value.length>5){
            pwdStauts.style.display='none';
            userPwd = true;
        }
    }
}
regrepassword.onfocus=function(){
    regrepassword.onblur=function(){
        if(regrepassword.value!=regpassword.value){
            repwdStauts.style.display='block';
        }if(regrepassword.value==regpassword.value){
            repwdStauts.style.display='none';
            userRepwd = true;
        }
    }
}
var extel = /0?(13|14|15|18)[0-9]{9}/;
tel.onfocus=function(){
    tel.onblur=function(){
        if(!bijiao(extel,tel.value)){
            telStauts.style.display='block';
        }if(bijiao(extel,tel.value)){
            telStauts.style.display='none';
            userTel = true;
        }
    }
}

function bijiao(str,values){
    if(str.test(values)){
        return true;
    }else {
        return false;
    }
}
//2694128434@qq.com 18180545122
//962591874@qq.com 18408234525
var regStatus = document.getElementById('regStatus');
var cover = document.getElementById('cover');
var logreg = document.getElementById('logreg');
var logandreg = document.getElementById('logandreg');
var controlls = document.getElementById('controlls');
/*var personHead = document.getElementById('personHead');*/

function regAjax(regusernames,reguseraddrs,regpasswords,regrepasswords,tels){
    //xhr.send("regusernames="+regusernames+"&reguseraddrs="+reguseraddrs+"&regpasswords="+regpasswords+"&regrepasswords="+regrepasswords+"&tels="+tels);
    var xhr;
    if(window.ActiveXObject){
        xhr = new ActiveXObject();
    }else{
        xhr = new XMLHttpRequest();
    }
    xhr.open("post","/regin.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    console.log(regusernames+"::"+" "+reguseraddrs+" "+regpasswords+" "+regrepasswords+" "+tels);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            //alert('sdf');
            var data = xhr.responseText;
            //console.log("客户端数据是"+data);
            if(data=="inserted"){
                console.log('插入数据成功');
                regStatus.innerHTML="注册成功正在跳转...";
                regStatus.style.display='block';
                setTimeout(hiddenlogreg(regusername,reguseraddr,regpassword,regrepassword,tel),1000);
                regAndLogin();
            }else{
                console.log('无错误'+data);//证明查出来了用户要注册的数据，说明不能注册
                //console.log("从服务器查询到已经注册的数据:"+data[0].user_name+" "+data[0].user_email+" "+data[0].user_telphone);
                console.log("从服务器查询到已经注册的数据:"+JSON.parse(data)[0]);
                var data = JSON.parse(data)[0];
                if(data.user_name==regusernames){
                    regStatus.innerHTML="该用户名已被注册";
                    regStatus.style.display='block';
                }
                if(data.user_email==reguseraddrs){
                    regStatus.innerHTML="该邮箱已被注册";
                    regStatus.style.display='block';
                }
                if(data.user_telphone==tels){
                    regStatus.innerHTML="该手机号已被注册";
                    regStatus.style.display='block';
                }
            }
        }
    }
    xhr.send("regusernames="+regusernames+"&reguseraddrs="+reguseraddrs+"&regpasswords="+regpasswords+"&regrepasswords="+regrepasswords+"&tels="+tels);

}
var pUsername = document.getElementById('pUsername');
function hiddenlogreg(regusername,reguseraddr,regpassword,regrepassword,tel){
    return function(){
        //console.log(i);
        cover.style.display='none';
        logreg.style.display='none';//隐藏登录注册的大面板
        logandreg.style.display='none';//隐藏扥路注册按钮
        pUsername.innerHTML=regusername.value;
        console.log(regusername.value+"-=-=-=-=-=-=");
        controlls.style.display='block';
      /*  personHead.style.display='block';*/
        regusername.value="";
        reguseraddr.value="";
        regpassword.value="";
        regrepassword.value="";
        tel.value="";
        regStatus.innerHTML="";
    }
}

var logStatus = document.getElementById('logStatus');
function logAjax(logusername,logpassword){
    var xhr;
    if(window.ActiveXObject){
        xhr = new ActiveXObject();
    }else{
        xhr = new XMLHttpRequest();
    }
    xhr.open("post","/login.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    console.log(logusername.value+" "+logpassword.value);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var data = xhr.responseText;
            console.log("这是从服务器返回在客户端的数据："+data);
            data = JSON.parse(data)[0];
            if(data.user_name==logusername.value && data.user_password==logpassword.value){
                logStatus.innerHTML="登录成功正在跳转...";
                logStatus.style.display='block';
                setTimeout(hiddenLogPanel(logusername,logpassword),1000);
                regAndLogin();
                if(data.user_name=="admin" && data.user_password=="123456"){
                    console.log("后台管理员登录");
                    window.location.assign("manageIndex.html");
                }
            }
        }
    }
    xhr.send("logusername="+logusername.value+"&logpassword="+logpassword.value);
}

function hiddenLogPanel(logusername,logpassword){
    return function(){
        //alert('gasdgds');
        //console.log(i);
        cover.style.display='none';
        logreg.style.display='none';
        logandreg.style.display='none';

        pUsername.innerHTML=logusername.value;
        console.log(logusername.value+"-=-=-=-=-=-=");
        controlls.style.display='block';
      /*  personHead.style.display='block';*/
        logusername.value="";
        logpassword.value="";
    }

}


//这里是主页的几个板块之间的切换
var qiehuan1 = document.getElementById('qiehuan1');
var qiehuan = document.getElementsByClassName('qiehuan');
var containFlowers = document.getElementsByClassName('containFlowers');

function clickQiehuan(){
    for(var i=0; i<qiehuan.length; i++){
        qiehuan[i].onclick=function(){
            //qiehuanAjax(this.innerHTML);
            changeColor();
            this.style.color='rgba(169,191,111,1)';
            hiddenPanel();
            containFlowers[this.getAttribute('index')].style.display='block';

        }
    }
    function changeColor(){
        for(var i=0; i<qiehuan.length; i++){
            qiehuan[i].style.color='black';
        }
    }
    function hiddenPanel(){
        for(var i=0;i<containFlowers.length;i++){
            containFlowers[i].style.display='none';
        }
    }
}
clickQiehuan();

function qiehuanAjax(fname){
    var xhr;
    if(window.ActiveXObject){
        xhr = new ActiveXObject();
    }else{
        xhr = new XMLHttpRequest();
    }
    xhr.open("post","/qiehuan.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    console.log(fname);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var data = xhr.responseText;

        }
    }
    xhr.send("fname="+fname);
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
                    window.location.reload();
                }
            }
        }
        xhr.send(null);
    }
}
clickGoBack();























