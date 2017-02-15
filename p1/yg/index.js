/**
 * Created by DHUser on 2017/2/14.
 */

angular.module("myApp",["ui.router","myfooter","myheader","mynav","mymenu"])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state("yg",{
            url:"/index",
            templateUrl:"cloth.html"
        }).state("cloth",{
            url:"/cloth",
            templateUrl:"cloth.html",
            controller:function($scope,$http) {
                $http.get("../../data/sp/colth.json").success(function(data){
                    $scope.list = data;
                });
            },controllerAs:'vipC'
        }).state("food",{
            url:"/food",
            templateUrl:"food.html",
            controller:function($scope,$http) {
                $http.get("../../data/sp/food.json").success(function(data){
                    $scope.list = data;
                });
            },controllerAs:'CC'
        }).state("shoes",{
            url:"/shoes",
            templateUrl:"shoes.html",
            controller:function($scope,$http) {
                $http.get("../../data/sp/shoes.json").success(function(data){
                    $scope.list = data;
                });
            },controllerAs:'adminC'
        });
        $urlRouterProvider.otherwise("/cloth");//默认进入页面
    }
]).controller("myCtrl",function($scope,$http){
    $scope.name="当前页面加载控制器";
    $http.get("../../data/menu/paramMenu.json").success(
        function(data){
            $scope.menus= data;
        }
    );
});

