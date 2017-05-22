/**
 * Created by lenovo on 2016/10/9.
 */
var share_url = encodeURIComponent(location.href);
var share_title = "Filed's FLORAL 连锁花店，为‘雅致生活’提供时尚、高品质的产品和服务。 这里将是您的私人花园，有时间就来逛逛、来看看。我们一直在为客户能够拥有最佳消费体验而不断努力着" ;
var share_pic = "http://localhost:8888/images/logo2.png";  //默认的分享图片


/*function  weibo(){

    window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url='+share_url+'&pics='+share_pic+'&title='+share_title+'&site='+share_from+'','newwindow');
 http://v.t.qq.com/share/share.php?url=http://www.jb51.net&title='分享内容'" target="_blank"
}*/http://v.t.sina.com.cn/share/share.php?url=http://www.jb51.net&title='分享内容'" target="_blank"
function qq(){

window.open('http://share.v.t.qq.com/index.php?c=share&a=index&title='+share_title+'&pic='+share_pic+'&url='+share_url+'','newwindow');


};
function  renren(){
    window.open('http://widget.renren.com/dialog/share?resourceUrl='+share_url+'&title='+share_title+'&images='+share_pic+'','newwindow');
};
function  weibo(){
    var param = {
        url:share_url ,
        /*appkey:'678438995',*/
        title:share_title,
        pic:share_pic,
       /* ralateUid:'3061825921',*/
        rnd:new Date().valueOf()
    }
    var temp = [];
    for( var p in param ){
        temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
    }
    window.open('http://v.t.sina.com.cn/share/share.php?' + temp.join('&'));
};