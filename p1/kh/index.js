/**
 * Created by DHUser on 2017/2/14.
 */

angular.module("myApp",["ui.router","myfooter","myheader","mynav","mymenu"])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state("kh",{
            url:"/index",
            templateUrl:"../../p1/infor/index.html",
            abstrace:true,
            controller:function($scope,$http) {
                $http.get("../../data/infor/list.json").success(function(data){
                    $scope.list = data;
                });
            }
        }).state("kh.vip",{
            url:"/vip",
            templateUrl:"vip.html",
            controller:function($scope) {
                $scope.name="vip";
            },controllerAs:'vipC'
        }).state("kh.customer",{
            url:"/customer",
            templateUrl:"customer.html",
            controller:function($scope) {
                $scope.name="customer";
            },controllerAs:'CC'
        }).state("kh.admin",{
            url:"/admin",
            templateUrl:"vip.html",
            controller:function($scope) {
                $scope.name="admin";
            },controllerAs:'adminC'
        });
        $urlRouterProvider.otherwise("/index/vip");
    }
]).controller("myCtrl",function($scope,$http){
    $scope.title="登录管理";
    $http.get("../../data/menu/paramMenu.json").success(
        function(data){
            $scope.menus= data;
        }
    );
});
/*var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.name="chenyb";
    console.log("xx");
});*/
