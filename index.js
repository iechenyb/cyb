var pageSize=10;
var myApp = angular.module("myApp",["ui.router","myfooter","myheader","mymenu","myInterceptor","mypage"]);
myApp.config(['$stateProvider', '$urlRouterProvider','$httpProvider',
    function($stateProvider, $urlRouterProvider,$httpProvider) {
        $httpProvider.interceptors.push("myInterceptor");
        $stateProvider.state("home",{
            url:"/home",
            templateUrl:"p1/gsjj.html",
        }).state("about",{
            url:"/about",
            templateUrl:"/p1/gsjj.html"
        }).state("contacts",{
            url:"/contacts",
            template:"<h1>靖康耻犹未雪，臣子恨何时灭，<br>驾长车踏破贺兰山缺。壮士饥餐胡虏肉，<br>笑谈渴饮匈奴血。待从头，收拾旧山河，朝天阙。</h1>"
        }).state("inner",{
            url:"/inner",
            templateUrl:"p1/infor/index.html",
            controller:function($scope,$http,$rootScope,$filter){
                $scope.del=function (record) {
                    $scope.list.splice($scope.list.indexOf(record),1);
                    $scope.result.splice($scope.result.indexOf(record),1);
                };
                $scope.$watch("res",function () {
                    $scope.cur=1;
                    $scope.start=1;
                    $scope.end=pageSize*1;
                    renderSpilter($scope.result,$scope);
                });//监听list列表变化，更新list，正好解决下边更新的方法
                $scope.refresh=function(){
                    $scope.cur=1;
                    $scope.start=1;
                    $scope.end=pageSize*1;
                   /* $scope.$apply(function(){
                        $scope.cur=1;
                        $scope.start=1;
                        $scope.end=pageSize*1;
                    });*///默认首页参数信息不能及时更新到页面，导致无法展示第一页数据
                    $scope.result = $filter("filter")($scope.list,{name:$scope.q1,work:$scope.q2});
                    renderSpilter($scope.result,$scope);
                };
            $http.get("data/infor/list.json").success(function(data){
                $scope.result = $scope.list = data;
                renderSpilter(data,$scope);
            });
            }
        });
        $urlRouterProvider.otherwise("inner");
    }
]).controller("myCtrl",function($scope,$http){
    $scope.title="首页";
    $http.get("data/menu/fixMenu.json").success(
        function(data){
            $scope.menus= data;
        }
    );
});