/**
 * Created by DHUser on 2017/2/14.
 */
app = angular.module("myApp",["ui.router","mynav","myfooter","mymenu"]);
app.controller("myCtrl",function($scope,$http){
    $scope.title="注册";
    $http.get("../..data/menu/fixMenu.json").success(
        function(data){
            $scope.menus= data;
        }
    );
});