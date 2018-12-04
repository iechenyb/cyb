/**
 * Created by DHUser on 2017/12/28.
 */
var myApp = angular.module("myApp", []);
myApp.controller('myCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});