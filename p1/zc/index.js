/**
 * Created by DHUser on 2017/2/14.
 */
app = angular.module("myApp",["ui.router","mynav","myfooter"]);
app.controller("myCtrl",function($scope){
    console.log("xxxx");
    $scope.name="chenyb1";
});