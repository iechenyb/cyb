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
                var $page;
                $scope.$watch("res",function () {
                    $scope.cur=1;
                    $scope.start=1;
                    $scope.end=pageSize*1;
                    renderSpilter($scope.result,$scope);
                });
                $scope.refresh=function(){
                    $scope.result = $filter("filter")($scope.list,{name:$scope.q1,work:$scope.q2});
                    /*$scope.total = $scope.result.length;
                    $scope.pages = Math.ceil($scope.result.length / pageSize); //得到总页数
                    $scope.cur=1;
                    $scope.start=1;
                    $scope.end=pageSize*1;*/
               /* $page=$("#page").page({
                    pages:$scope.pages, //页数
                    curr: $scope.cur //当前页
                    /!*type: 'default', //主题
                    groups: 5, //连续显示分页数
                    prev: '<', //若不显示，设置false即可
                    next: '>', //若不显示，设置false即可
                    //first: "首页",
                    //last: "尾页", //false则不显示
                    jump: function(context, first) {
                        if(first) return;
                        console.log('当前第#：' + context.option.curr + "页,pages="+$scope.pages);
                        $scope.$apply(function () {
                            $scope.cur = context.option.curr;
                            $scope.start = ($scope.cur-1)*pageSize+1;
                            $scope.end = $scope.cur*pageSize;
                        });
                    }*!/
                });*/
               /* $page.remove(function() {
                    console.log('移除分页组件成功');
                });*/
                //$scope.$apply();
            };
            $http.get("data/infor/list.json").success(function(data){
                $scope.result = $scope.list = data;
               /* $scope.total =  $scope.result.length;
                $scope.pages = Math.ceil($scope.result.length / pageSize); //得到总页数*/
                renderSpilter(data,$scope);
                /*$page=$("#page").page({
                    pages:$scope.pages, //页数
                    curr: $scope.cur, //当前页
                    type: 'default', //主题
                    groups: 5, //连续显示分页数
                    prev: '<', //若不显示，设置false即可
                    next: '>', //若不显示，设置false即可
                    first: "首页",
                    last: "尾页", //false则不显示
                    jump: function(context, first) {
                        if (first)return;
                        console.log('当前第：' + context.option.curr + "页");
                       /!* $scope.cur = context.option.curr;
                        $scope.start = ($scope.cur-1)*pageSize+1;
                        $scope.end = $scope.cur*pageSize;*!/
                        $scope.$apply(function () {
                            $scope.cur = context.option.curr;
                            $scope.start = ($scope.cur-1)*pageSize+1;
                            $scope.end = $scope.cur*pageSize;
                        });
                        //$scope.$apply();
                    }
                });*/
            });
            }
        });
        //$scope.$apply();
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