(function mymenu() {
  var menuController=function($scope,$rootScope,$state,$http,$location){
    $("#ybmenu").on("close.offcanvas.amui",function(){
          $("offcanvasbtn").show();
    });
    $("#ybmenu").on("open.offcanvas.amui",function(){
         $("offcanvasbtn").hide();
    });
  };
  var url = basePath+'component/menu/index.html';
  var menu = {
    restrict: 'E',
    templateUrl: url,
    bindings:{title:'='},
    controllerAs:"mymenu",
    controller:menuController
  };
  headerModule = angular.module('mymenu', ['ui.router'])
    .component('mymenu', menu);
})();