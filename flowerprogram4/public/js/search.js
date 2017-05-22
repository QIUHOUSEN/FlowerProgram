/**
 * Created by Administrator on 2016/10/12.
 */
var searchBtn = document.getElementById("searchBtn");
if(document.addEventListener){
    searchBtn.addEventListener("click",fn,true);
}else{
    searchBtn.attachEvent("onclick",fn);
}
function fn(){
    searchPageCount();//第一次点搜索时，返回总页数；
    seachPic(); //显示第一页。
}
var countPage=0;
var page=1;
function seachPic(){
    var searchValue= document.getElementById("search_input").value;
    var xhr;
    if(window.ActiveXObject){
        xhr = new ActiveXObject();
    }else{
        xhr= new XMLHttpRequest();
    }
    xhr.open("post","/list.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    //假设是按图片的类型来查询：
    xhr.send("phototype="+searchValue+"&page="+page);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            var data=xhr.responseText;
            console.log("页面js的searchjs部分返回的showphopt部分的data的length长度"+data.length);
            if(data=="error"){
                document.getElementById("ct_container").innerHTML="没有查到任何图片";
                return;
            }
            var data = JSON.parse(data);
            var odiv = document.getElementById("ct_container");
            var i;
            odiv.innerHTML="";
            for(i=0;i<data.length;i++){
                odiv.innerHTML+="<div id='main'>" +
                    "<div class='imgbox'>" +
                    "<img src='"+data[i].src+"'>" +
                    "</div>" +
                    "<p class='imgid'>"+data[i].id_img+"</p>" +
                    "<p class='like'><img src='image/pic.png'><span class='fa fa-heart-o'></span></p>" +
                    "</div>";
            }
        }
    }
}


//上一页
function previousPage(){
    page--;
    whatpage.value=page;
    if(page<1){
        page=1;
    }
    seachPic(); //显示上一页的内容

}
//下一页
function nextPage(){
    page++;
    whatpage.value=page;
    if(page>countPage){
        page=countPage;
    }
    seachPic();//显示下一页的内容
}
function toPage(){
    page=Number(whatpage.value);
    if(page>countPage || page<1){
        whatpage.value="输入有误";
    }
    seachPic();
}
//总页数
function searchPageCount() {
    var searchValue = document.getElementById("search_input").value;
    var xhr;
    if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    //配置XMLHttpRequest
    xhr.open("post", "/searchPageCount.do", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("phototype=" + searchValue);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = xhr.responseText;
            countPage = Number(data);
            showallpage.innerHTML=countPage;
            console.log(countPage+"pagecount");//4
        }
    }
}