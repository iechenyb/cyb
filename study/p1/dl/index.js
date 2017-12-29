/**
 * Created by DHUser on 2017/2/14.
 */

angular.module("myApp",["ui.router","myfooter","myheader","mynav","mymenu"])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state("dl",{
            url:"/index",
            templateUrl:"customer.html",
            abstrace:true,
            controller:function($scope,$http) {
            }
        }).state("vip",{
            url:"/vip",
            templateUrl:"vip.html",
            controller:function($scope) {
                $scope.name="vip";
            },controllerAs:'vipC'
        }).state("dl.customer",{
            url:"/customer",
            templateUrl:"customer.html",
            controller:function($scope) {
                $scope.name="customer";
            },controllerAs:'CC'
        }).state("dl.admin",{
            url:"/admin",
            templateUrl:"vip.html",
            controller:function($scope) {
                $scope.name="admin";
            },controllerAs:'adminC'
        });
        $urlRouterProvider.otherwise("/vip");
    }
]).controller("myCtrl",function($scope,$http){
    $scope.title="登录管理";
    $http.get("../../data/menu/paramMenu.json").success(
        function(data){
            $scope.menus= data;
        }
    );
});
