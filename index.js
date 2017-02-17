var pageSize=10;
var myApp = angular.module("myApp",["ui.router","myfooter","myheader","mymenu","myInterceptor","mypage"]);
myApp.config(['$stateProvider', '$urlRouterProvider','$httpProvider',
    function($stateProvider, $urlRouterProvider,$httpProvider) {
        $httpProvider.interceptors.push("myInterceptor");
        $stateProvider.state("home",{
            url:"/home",
            template:"<h1>待到来年九月八，我花开后百花杀。<br>冲天香阵透长安，满城尽带黄金甲。</h1>"
        }).state("about",{
            url:"/about",
            template:"<h1>三十年功尘与土，八千里路云和月。<br>莫等闲，白了少年头，空悲切。</h1>"
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
        $urlRouterProvider.otherwise("/exception/404");
    }
]).controller("myCtrl",function($scope,$http){
    $scope.title="首页";
    $http.get("data/menu/fixMenu.json").success(
        function(data){
            $scope.menus= data;
        }
    );
});