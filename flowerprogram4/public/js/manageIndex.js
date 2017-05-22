/**
 * Created by admin on 2017/3/29.
 */
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.tempItem={};
    $scope.tempIndex=1;
    $scope.divIndex = 1;
    $scope.userData={};
    $scope.orderData={};
    $scope.flowerData={};
    $scope.wrapperData={};
    $scope.pottedData={};
    $scope.giftData={};

    $(".navUl li:eq(0)").css("background-color","#262A33");
    $scope.userDatas = [];
    $scope.titleShow = 0;
    $scope.changeIndex = function(index){
        $scope.divIndex = index;

        $(".navUl li").each(function(i,item){
            if(i==0){
                $scope.titleShow = 0;
            }else{
                $scope.titleShow = 1;
            }
            $(item).css("background-color","#0a6eb0");
            if(i==index-1){
                $(item).css("background-color","#262A33")
            }
        })
        switch(index){
            case 2:
                loadUserAjax($scope);
                break;
            case 3:
                loadOrderAjax($scope);
                break;
            case 4:
                loadFlowerAjax($scope);
                break;
            case 5:
                loadWrapperAjax($scope);
                break;
            case 6:
                loadPottedAjax($scope);
                break;
            case 7:
                loadGiftAjax($scope);
                break;
            case 8:
                loadStoryAjax($scope);
                break;
        }
    }

    $scope.showDelModal = function(item,index){
        $scope.tempItem = item;
        $scope.tempIndex = index;
        $("#blackDiv").show();
        $("#blackDiv .delModal").show();
    }
    $scope.hideDelModal = function(item){
        $("#blackDiv").hide();

        $("#blackDiv .delModal").hide();
    }

    $scope.showEditUserModal = function(item){
        $scope.userData = item;
        $("#blackDiv").show();
        $("#blackDiv .editUserModal").show();

    }
    $scope.hideEditUserModal = function(){
        $("#blackDiv").hide();
        $("#blackDiv .editUserModal").hide();
    }

    $scope.showEditOrderModal = function(item){
        $scope.orderData = item;
        $("#blackDiv").show();
        $("#blackDiv .editOrderModal").show();
    }
    $scope.hideEditOrderModal = function(){
        $("#blackDiv").hide();
        $("#blackDiv .editOrderModal").hide();
    }
    $scope.showEditFlowerModal = function(item){
        $scope.flowerData = item;
        $("#blackDiv").show();
        $("#blackDiv .editFlowerModal").show();
    }
    $scope.hideEditFlowerModal = function(){
        $("#blackDiv").hide();
        $("#blackDiv .editFlowerModal").hide();
    }

    $scope.showEditWrapperModal = function(item){
        $scope.wrapperData = item;
        $("#blackDiv").show();
        $("#blackDiv .editWrapperModal").show();
    }
    $scope.hideEditWrapperModal = function(){
        $("#blackDiv").hide();
        $("#blackDiv .editWrapperModal").hide();
    }

    $scope.showEditPottedModal = function(item){
        $scope.pottedData = item;
        $("#blackDiv").show();
        $("#blackDiv .editPottedModal").show();
    }
    $scope.hideEditPottedModal = function(){
        $("#blackDiv").hide();
        $("#blackDiv .editPottedModal").hide();
    }

    $scope.showEditGiftModal = function(item){
        $scope.giftData = item;
        $("#blackDiv").show();
        $("#blackDiv .editGiftModal").show();
    }
    $scope.hideEditGiftModal = function(){
        $("#blackDiv").hide();
        $("#blackDiv .editGiftModal").hide();
    }
/*确定删除*/
    $scope.submitDelInfo = function(){
        switch($scope.tempIndex){
            case 1:
                //删除用户
                delUser($scope);
                break;
            case 2:
                //删除订单
                delOrder($scope);
                break;
            case 3:
                //删除鲜花
                delFlower($scope);
                break;
            case 4:
                //删除包装纸
                delWrapper($scope);
                break;
            case 5:
                //删除盆栽
                delPotted($scope);
                break;
            case 6:
                //删除礼盒
                delGift($scope);
                break;
            case 7:
                //删除故事
                delStory($scope);
                break;
        }
        //发送ajax请求
    }
/*提交修改*/
   $scope.submitEidtUserInfo = function(){
       $.ajax({
           url: "/editUser.do",
           dataType: "json",
           async: true,
           data: $scope.userData,
           type: "POST",
           success: function(req) {
               alert("修改成功！");
               $("#blackDiv").hide();
               $("#blackDiv .editUserModal").hide();
               loadUserAjax(scope);
           },
           error: function() {
               console.log("前台报错，删除用户出现错误");
           }
       });
   }




});
        function delUser(scope){
            $.ajax({
                url: "/delUser.do",
                dataType: "json",
                async: true,
                data: {user_id:scope.tempItem.user_id},
                type: "POST",
                success: function(req) {
                    alert("删除成功！");
                    $("#blackDiv").hide();
                    $("#blackDiv .delModal").hide();
                    loadUserAjax(scope);
                },
                error: function() {
                    console.log("前台报错，删除用户出现错误");
                }
            });
        }

        function delFlower(scope){
            $.ajax({
                url: "/delFlower.do",
                dataType: "json",
                async: true,
                data: {flower_id:scope.tempItem.flower_id},
                type: "POST",
                success: function(req) {
                    alert("删除成功！");
                    $("#blackDiv").hide();
                    $("#blackDiv .delModal").hide();
                    loadFlowerAjax(scope);
                },
                error: function() {
                    console.log("前台报错，删除鲜花出现错误");
                }
            });
        }

        function delPotted(scope){
            $.ajax({
                url: "/delPotted.do",
                dataType: "json",
                async: true,
                data: {potted_id:scope.tempItem.potted_id},
                type: "POST",
                success: function(req) {
                    alert("删除成功！");
                    $("#blackDiv").hide();
                    $("#blackDiv .delModal").hide();
                    loadPottedAjax(scope);
                },
                error: function() {
                    console.log("前台报错，删除盆栽出现错误");
                }
            });
        }
        function delWrapper(scope){
            $.ajax({
                url: "/delWrapper.do",
                dataType: "json",
                async: true,
                data: {wrapper_id:scope.tempItem.wrapper_id},
                type: "POST",
                success: function(req) {
                    alert("删除成功！");
                    $("#blackDiv").hide();
                    $("#blackDiv .delModal").hide();
                    loadWrapperAjax(scope);
                },
                error: function() {
                    console.log("前台报错，删除包装纸出现错误");
                }
            });
        }

function delGift(scope){
    $.ajax({
        url: "/delGift.do",
        dataType: "json",
        async: true,
        data: {gift_id:scope.tempItem.gift_id},
        type: "POST",
        success: function(req) {
            alert("删除成功！");
            $("#blackDiv").hide();
            $("#blackDiv .delModal").hide();
            loadGiftAjax(scope);
        },
        error: function() {
            console.log("前台报错，删除礼盒出现错误");
        }
    });
}
function delStory(scope){
    $.ajax({
        url: "/delStory.do",
        dataType: "json",
        async: true,
        data: {story_id:scope.tempItem.story_id},
        type: "POST",
        success: function(req) {
            alert("删除成功！");
            $("#blackDiv").hide();
            $("#blackDiv .delModal").hide();
            loadStoryAjax(scope);
        },
        error: function() {
            console.log("前台报错，删除故事出现错误");
        }
    });
}
        function loadUserAjax(scope){
            $.ajax({
                url: "/loadUserList.do",
                dataType: "json",
                async: true,
                data: {},
                type: "GET",
                success: function(req) {
                    scope.userDatas = req;
                    scope.$apply();
                    console.log("后台返回到页面的user数据：",scope.userDatas);
                },
                error: function() {
                    console.log("前台报错，加载user表数据错写错误");
                }
            });
        }
function loadOrderAjax(scope){
    $.ajax({
        url: "/loadOrderList.do",
        dataType: "json",
        async: true,
        data: {},
        type: "GET",
        success: function(req) {
            scope.orderDatas = req;
            scope.$apply();
            console.log("后台返回到页面的order数据：",scope.orderDatas);
        },
        error: function() {
            console.log("前台报错，加载order表数据错写错误");
        }
    });
}
function loadFlowerAjax(scope){
    $.ajax({
        url: "/loadFlowerList.do",
        dataType: "json",
        async: true,
        data: {},
        type: "GET",
        success: function(req) {
            scope.flowerDatas = req;
            scope.$apply();
            console.log("后台返回到页面的flower数据：",scope.flowerDatas);
        },
        error: function() {
            console.log("前台报错，加载flower表数据错写错误");
        }
    });
}
function loadWrapperAjax(scope){
    $.ajax({
        url: "/loadWrapList.do",
        dataType: "json",
        async: true,
        data: {},
        type: "GET",
        success: function(req) {
            scope.wrapperDatas = req;
            scope.$apply();
            console.log("后台返回到页面的wrapper数据：",scope.wrapperDatas);
        },
        error: function() {
            console.log("前台报错，加载wrapper表数据错写错误");
        }
    });
}
function loadPottedAjax(scope){
    $.ajax({
        url: "/loadPottedList.do",
        dataType: "json",
        async: true,
        data: {},
        type: "GET",
        success: function(req) {
            scope.pottedDatas = req;
            scope.$apply();
            console.log("后台返回到页面的potted数据：",scope.pottedDatas);
        },
        error: function() {
            console.log("前台报错，加载potted表数据错写错误");
        }
    });
}
function loadGiftAjax(scope){
    $.ajax({
        url: "/loadGiftList.do",
        dataType: "json",
        async: true,
        data: {},
        type: "GET",
        success: function(req) {
            scope.giftDatas = req;
            scope.$apply();
            console.log("后台返回到页面的gift数据：",scope.giftDatas);
        },
        error: function() {
            console.log("前台报错，加载gift表数据错写错误");
        }
    });
}
        function loadStoryAjax(scope){
            $.ajax({
                url: "/loadStoryList.do",
                dataType: "json",
                async: true,
                data: {},
                type: "GET",
                success: function(req) {
                    scope.storyDatas = req;
                    scope.$apply();
                    console.log("后台返回到页面的故事数据：",scope.storyDatas);
                },
                error: function() {
                    console.log("前台报错，加载story表数据错写错误");
                }
            });
        }


