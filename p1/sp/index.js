/**
 * Created by DHUser on 2017/2/14.
 */

angular.module("myApp",["ui.router","myfooter","myheader","mynav","mymenu","html"])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state("sp",{
            url:"/index",
            templateUrl:"cloth.html"
        }).state("cloth",{
            url:"/cloth",
            templateUrl:"cloth.html",
            controller:function($scope,$http) {
                $http.get("../../data/sp/colth.json", {cache: true}).success(function(data){
                    $scope.list = data;
                });
                $http.get("../../data/sp/html.json", {cache: true}).success(function(data){
                    $scope.html = data.data;
                });
            },controllerAs:'vipC'
        }).state("food",{
            url:"/food",
            templateUrl:"food.html",
            controller:function($scope,$http) {
                $http.get("../../data/sp/food.json", {cache: true}).success(function(data){
                    $scope.list = data;
                });
            },controllerAs:'CC'
        }).state("shoes",{
            url:"/shoes",
            templateUrl:"shoes.html",
            controller:function($scope,$http) {
                $http.get("../../data/sp/shoes.json", {cache: true}).success(function(data){
                    $scope.list = data;
                });
            },controllerAs:'adminC'
        });
        $urlRouterProvider.otherwise("/cloth");//默认进入页面
    }
]).controller("myCtrl",function($scope,$http){
    $scope.title="员工管理";
    $http.get("../../data/menu/paramMenu.json", {cache: true}).success(
        function(data){
            $scope.navs= data;
        }
    );
});

