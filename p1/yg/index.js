/**
 * Created by DHUser on 2017/2/14.
 */

angular.module("myApp",["ui.router","myfooter","myheader","mymenu","repeatFinish","html"])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state("sp",{
            url:"/index",
            templateUrl:"ld.html"
        }).state("ld",{
            url:"/ld",
            templateUrl:"ld.html",
            controller:function($scope,$http) {
                $scope.show=function($event){
                    $(".hover").removeClass('hover');
                    $($event.target).addClass('hover');
                    var h = $($event.target).find("div").height();
                    var t = (-h * 0.4) -3;//上移动3个像素
                    $($event.target).find("div").css({"top": t,"left":200});//弹出框右移动200像素
                    console.log("show event!")
                };
                $scope.$on("showTip",function () {
                    var h = $(".hover").find("div").height();
                    var t = (-h * 0.4) - 5;
                    $(".hover").find("div").css({"top": t,"left":200});
                    console.log("on event!")
                });
                $http.get("../../data/sp/ry.json").success(function(data){
                    $scope.list = data;
                    var settings = {
                        trigger:'hover',
                        title:'',
                        content:'<img src="../../img/ewm.jpg"/>',
                        width:120,
                        height:110,
                        multi:false,
                        closeable:false,
                        style:'margin: 2px;',
                        padding:false
                    };
                    $('a.pop').webuiPopover('destroy').webuiPopover(settings);
                });

            },controllerAs:'vipC'
        }).state("pt",{
            url:"/pt",
            templateUrl:"pt.html",
            controller:function($scope,$http) {
                $http.get("../../data/sp/food.json").success(function(data){
                    $scope.list = data;
                });
            },controllerAs:'CC'
        }).state("kh",{
            url:"/kh",
            templateUrl:"kh.html",
            controller:function($scope,$http) {
                $http.get("../../data/sp/shoes.json").success(function(data){
                    $scope.list = data;
                });
            },controllerAs:'adminC'
        });
        $urlRouterProvider.otherwise("/ld");//默认进入页面
    }
]).controller("myCtrl",function($scope,$http){
    $scope.title="商品管理";
    var settings = {
        trigger:'hover',
        title:'',
        content:'<img src="../../img/logo.jpg" width="115px" height="80px"/>',
        width:120,
        height:100,
        multi:false,
        closeable:false,
        style:'',
        padding:false
    };
    $('a.pop').webuiPopover('destroy').webuiPopover(settings);
    $http.get("../../data/menu/paramMenu.json").success(
        function(data){
            $scope.menus= data;
        }
    );
});

