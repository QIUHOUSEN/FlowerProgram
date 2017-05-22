//    封装一个AJAX函数
function ajax(obj){
    function create(){
        var xhr;
        if(window.ActiveXObject){
            xhr = new  ActiveXObject("Microsoft.XMLHTTP");
        }else if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }
        return xhr;
    }
    var xhr = create();
    if(obj.async==undefined)
        obj.async=true;
    if(obj.method=="get"){
        obj.url=obj.url+"?"+obj.param;
        obj.param=null;
    }
    xhr.open(obj.method,obj.url,obj.async);
    if(obj.method=="post"){
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            obj.success(JSON.parse(xhr.responseText));
        }
    }
    xhr.send(obj.param||null);
}
//构建一个对象原型，用于作参数传给AJAX函数；
function AJAXObj(method,url,param,updateHtml,async){
//        updateHtml: 更新页面的函数。
    this.method=method;
    this.url=url;
    this.async=async;
    this.param=param;
    this.success=function(jsonText){
        this.values=jsonText;
        this.updateHtml();//调用这个方法须放在success方法中调用，否则 只能支持同步。
    }
    this.updateHtml=updateHtml;
}