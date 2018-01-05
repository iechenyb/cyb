/**
 * Created by DHUser on 2017/12/28.
 */
var myApp = angular.module("myApp", ["ui.router"]);
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("","/PageTab");
    $stateProvider
        .state("PageTab", {
            url: "/PageTab",
            templateUrl: "main.html",
            controller:function () {
                drawDateInput();
                loadPageBar();
            }
        });
    $urlRouterProvider.otherwise( "/PageTab");
});

function drawDateInput() {
    var nowTemp = new Date();
    var nowDay = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0).valueOf();
    var nowMoth = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), 1, 0, 0, 0, 0).valueOf();
    var nowYear = new Date(nowTemp.getFullYear(), 0, 1, 0, 0, 0, 0).valueOf();
    $('#query-rq')
        .datepicker({
            onRender: function(date, viewMode) {
                // 默认 days 视图，与当前日期比较
                var viewDate = nowDay;
                switch (viewMode) {
                    // moths 视图，与当前月份比较
                    case 1:
                        viewDate = nowMoth;
                        break;
                    // years 视图，与当前年份比较
                    case 2:
                        viewDate = nowYear;
                        break;
                }
                return date.valueOf() > viewDate ? 'am-disabled' : '';
            }
        }).
        on('changeDate.datepicker.amui', function(event) {
            $('#query-rq').text($('#query-rq').data('date'));
            $(this).datepicker('close');
        });
}
//加载分页工具
function  loadPageBar() {
    $("#page").page({
        pages:20, //页数
        curr: 1, //当前页
        type: 'default', //主题
        groups: 5, //连续显示分页数
        prev: '<', //若不显示，设置false即可
        next: '>', //若不显示，设置false即可
        first: "首页",
        last: "尾页", //false则不显示
        render: function(context, $el, index) { //渲染[context：对this的引用，$el：当前元素，index：当前索引]
            //逻辑处理
            if (index == 'last') { //虽然上面设置了last的文字为尾页，但是经过render处理，结果变为最后一页
                $el.find('a').html('最后一页');
                return $el; //如果有返回值则使用返回值渲染
            }
            return false; //没有返回值则按默认处理
        },
        jump: function(context, first) {
            if (first)return;
            console.log('当前第：' + context.option.curr + "页!");
        }
    });
}