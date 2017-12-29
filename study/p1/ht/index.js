/**
 * Created by DHUser on 2017/2/14.
 */

angular.module("myApp",["ui.router","mymenu","myheader","myfooter"])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/ht");
        $stateProvider.state("ht",{
            url:"/ht",
            templateUrl:"index.html",
            abstract:true,
            controller:function($scope,$state) {
            }
        }).state("ht.menu1",{
            url:"/menu1",
            templateUrl:function getTemplateUrl($params) {
                return "1.html";
            }
        }).state("ht.menu2",{
            url:"/menu2",
            templateUrl:"2.html"
        }).state("menu",{
            url:"/menu/{id}",
            controller:function($scope,$state,$http) {
               $http.get("../../data/sp/shoes.json",{cache:true}).success(function(data){
                    $scope.list = data;
                });
                console.log("初始化页面："+$state.params.id);
                $scope.param=$state.params.id;
            },
            templateUrl:function getTemplateUrl($params) {
                console.log($params.id);
                return $params.id;
            },
        });
        $urlRouterProvider.otherwise("/ht");
    }
]).controller("myCtrl",function($scope){
    console.log("xxxx");
    $scope.name="chenyb";
});
