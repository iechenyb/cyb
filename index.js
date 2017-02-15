var myApp = angular.module("myApp",["ui.router","myfooter","myheader","mymenu"]);
myApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
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
            controller:function($scope,$http){
            $http.get("data/infor/list.json").success(function(data){
               $scope.list = data; 
            });
            }
        });
        $urlRouterProvider.otherwise("/exception/404");
    }
]).controller("myCtrl",function($scope,$http){
    console.log("index page");
    $http.get("data/menu/fixMenu.json").success(
        function(data){
            $scope.menus= data;
            console.log("index page"+ data);
        }
    );
});