/**
 * Created by DHUser on 2017/2/14.
 */
/*var app = angular.module('myApp', ["ui.router","mynav","mymenu"]);
app.controller('myCtrl', function($scope) {
    $scope.title="日历";
    $scope.msg="hahha";
    $scope.yy="2017";
    $scope.mm="12";
    $scope.dd="2";
    $scope.kong = new Array(new Date($scope.yy, $scope.mm - 1, 1).getDay());
    for (var i = 0; i < $scope.kong.length; i++) {
        $scope.kong[i] = i;
    }
    console.log($scope.kong);
    //构建当前月天array
    var temprlarray = new Array(new Date($scope.yy, $scope.mm, 0).getDate());
    console.log(temprlarray);
    $scope.tipDates = [1,8,9,20,27];
    for (var i = 0; i < temprlarray.length; i++) {
        temprlarray[i] = {
            value: i + 1,
            data: ($scope.tipDates.indexOf(i + 1) != -1) ? true : false
        }
    }
    $scope.rlarray = temprlarray;
    $scope.chosedate = function (x) {
        if (x.data) {
            $scope.rlarray.forEach(function (item) {
                if (x.value == item.value) {
                    item.class = 'chose';
                }
                else {
                    item.class = null;
                }
            })
            $scope.dd=x.value;
        }
        return false;
    }
    //月份加
    $scope.addrl = function () {
        var temp = new Date($scope.yy, $scope.mm, 1);
        $scope.mm=temp.getMonth()+1;
        $scope.yy=temp.getFullYear();
        reset();
    };
    //月份减
    $scope.subrl = function () {
        var temp = new Date($scope.yy, $scope.mm - 1, 1);
        $scope.mm=temp.getMonth();
        if ($scope.mm == 0) {
            $scope.yy = parseInt(temp.getFullYear()) - 1;
            $scope.mm = 12;
        }else{
            $scope.yy=temp.getFullYear();
        }
        reset();
    };

    function reset(){
        $scope.kong = new Array(new Date($scope.yy, $scope.mm - 1, 1).getDay());
        for (var i = 0; i < $scope.kong.length; i++) {
            $scope.kong[i] = i;
        }
        console.log($scope.kong);
        //构建当前月天array
        var temprlarray = new Array(new Date($scope.yy, $scope.mm, 0).getDate());
        console.log(temprlarray);
        var tipDates = [1,8,9,20,27];
        var num = Math.ceil(Math.random()*31);
        tipDates=[];
        for(var j=0;j<num;j++){
            tipDates.push(Math.ceil(Math.random()*31));
        }
        console.log(tipDates);
        for (var i = 0; i < temprlarray.length; i++) {
            temprlarray[i] = {
                value: i + 1,
                data: (tipDates.indexOf(i + 1) != -1) ? true : false
            }
        }
        $scope.rlarray = temprlarray;
    }
});*/
/*
angular.module("myApp",["ui.router","mymenu","myheader","myfooter"])
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when("", "/jyts/");
            $stateProvider.state("irl",{
                url:"/index",
                abstract:true,
                templateUrl:"rl.html",
                controller:'jyts',
                controllerAs:'jyts'
            }).state("myrl",{
                url:"/myrl",
                templateUrl:"rl.html",
                controller:function($scope,$state) {
                    console.log("内部日历使用！");
                }
            });
            $urlRouterProvider.otherwise("/jyts");
        }
    ]).controller("myCtrl",function($scope){
        console.log("xxxx");
        $scope.name="chenyb";
    });*/
var jyts = function () {
    this.links = [
        {name: "haha".title, uisref: 'jyts'}
    ];
};
var rl = function ($state, $scope, $filter, $http) {
    //校验日期
    function regyyyymm() {
        var today = new Date();
        if ($state.params.yyyymm == "") {
            $state.go('jyts.rl', {yyyymm: $filter('date')(today, 'yyyyMM')}, {location: 'replace'});
        }
        else {
            var regyyyymm = /[12]\d{3}(0[1-9]|1[0-2])/;
            if (!regyyyymm.test($state.params.yyyymm)) {
                $state.go('jyts.rl', {yyyymm: $filter('date')(today, 'yyyyMM')}, {location: 'replace'});
            }
            else {
                $scope.yy = $state.params.yyyymm.substring(0, 4);
                $scope.mm = $state.params.yyyymm.substring(4, 6);
            }
        }
    }

    regyyyymm();
    //月份加
    $scope.addrl = function () {
        var temp = new Date($scope.yy, $scope.mm, 1);
        $state.go('jyts.rl', {yyyymm: $filter('date')(temp, 'yyyyMM')}, {location: 'replace'});
    };
    //月份减
    $scope.subrl = function () {
        var temp = new Date($scope.yy, $scope.mm - 2, 1);
        $state.go('jyts.rl', {yyyymm: $filter('date')(temp, 'yyyyMM')}, {location: 'replace'});
    };

    if ($state.params.yyyymm == "") return;
    //构建当前月天array
    var temprlarray = new Array(new Date($scope.yy, $scope.mm, 0).getDate());
    //空出1号前几天
    $scope.kong = new Array(new Date($scope.yy, $scope.mm - 1, 1).getDay());
    for (var i = 0; i < $scope.kong.length; i++) {
        $scope.kong[i] = i;
    }
    //获取日历并标注
    $http.get('../../data/rl/2017/02.json')
        // $http.get('../../data/rl/' + $scope.yy + '/' + $scope.mm + '.json')
        .success(function (data) {
            if (jsonPD(data)) {
                var num = Math.ceil(Math.random()*31);
                data.data=[];
                for(var j=0;j<num;j++){
                    data.data.push(Math.ceil(Math.random()*31));
                }//随机生成n个提示日，覆盖固定提示日
                for (var i = 0; i < temprlarray.length; i++) {
                    temprlarray[i] = {
                        value: i + 1,
                        data: (data.data.indexOf(i + 1) != -1) ? true : false
                    }
                }
                $scope.rlarray = temprlarray;
                if (data.data.indexOf(Number($state.params.dd)) == -1) {
                    var today = new Date();
                    if (data.data.indexOf(today.getDate()) != -1 && $scope.yy == today.getFullYear() && today.getMonth() + 1 == $scope.mm) {
                        $scope.chosedate({value: today.getDate(), data: true});
                    }
                    else {
                        $scope.chosedate({value: data.data[0], data: true});
                    }
                }
                else {
                    $scope.chosedate({value: $state.params.dd, data: true});
                }
            }
        })
        .error(function (error) {
            for (var i = 0; i < temprlarray.length; i++) {
                temprlarray[i] = {
                    value: i + 1,
                    data: false
                }
            }
            $scope.rlarray = temprlarray;
            console.log(error);
    });

    $scope.chosedate = function (x) {
        if (x.data) {
            $scope.rlarray.forEach(function (item) {
                if (x.value == item.value) {
                    item.class = 'chose';
                }
                else {
                    item.class = null;
                }
            });
            $state.go('jyts.rl.text', {yyyymm: $scope.yy + $scope.mm, dd: x.value}, {location: 'replace'});
        }
        return false;
    }
};
angular.module('app', ['ui.router',"myfooter","mymenu"])
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/index/');
        $stateProvider
            .state('jyts', {
                url: '/index',
                templateUrl: 'jyts.html',
                abstract: true,
                controller: jyts,
                controllerAs: 'jyts'
            })
            .state('jyts.rl', {
                url: '/{yyyymm}',
                templateUrl: 'rl.html',
                controller: rl,
                controllerAs: 'rl'
            })
            .state('jyts.rl.text', {
                url: '/{dd}',
                templateUrl: function getTemplateUrl($params) {
                    //+ $params.yyyymm.substring(0, 4) + '/' + $params.yyyymm.substring(4, 6) + '/' + $params.dd +
                    return '../../data/rl/content.html';
                },
                controller: function ($scope, $state) {
                    $scope.$parent.dd = $state.params.dd;
                    $scope.date= $state.params.yyyymm+"-"+$state.params.dd;
                }
            });
    })
    .component('app', {
        template: '<div class="app"><div ui-view></div></div>',
        restrict: 'E'
    })
    .controller('headController', function ($scope) {
        $scope.link = {title:"交易提示",url:"/xx/yy",names:["交易日历","交易提示"]};
    });


