/**
 * Created by DHUser on 2017/7/12.
 */
var app = angular.module('app',[]);
app.controller('controller',main);
var page;
function main($scope,$q,$http){
    $scope.fisrt=1;
    $scope.cur=1;
    page=$scope;
    $scope.show=function (x,y,someone) {
        console.log("#"+x+"#"+y);
        if(!over){
            if($scope.cur==1){// 1是人下
                if($("#"+x+"-"+y).attr('able')==-1){
                    $("#"+x+"-"+y).css('background','url(black.jpg) no-repeat center center');
                    //$("#"+x+"-"+y).css('background-repeat','none');
                    //$("#"+x+"-"+y).css('filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='black.jpg', sizingMethod='scale')");
                    $("#"+x+"-"+y).attr("able",1);
                }
                $scope.cur=0;
            }/*else{
                if($("#"+x+"-"+y).attr('able')==-1) {
                    $("#" + x + "-" + y).css('background-color', 'black');
                    $("#"+x+"-"+y).css('background','url(white.jpg) no-repeat center center');
                    $scope.cur = 1;
                    $("#" + x + "-" + y).attr("able", 0);
                }
            }*/
            checkVin(x,y,$scope.cur);//判断人下棋是否胜利！
            if(!over){
                doNextByComputer();
            }
        }else{
            alert(person[winPeron]+"已经获胜，游戏结束！");
        }
    };
    $scope.xArr=new Array(ROW);
    $scope.yArr=new Array(ROW);
    for(var i=1;i<=ROW;i++){
        $scope.xArr[i-1]=i;
        $scope.yArr[i-1]=i;
    }
    test();
    $scope.downByComputertest = downByComputertest;
}
function doNextByComputer(){
    var fourArr = map0.get("four");
    var threeArr = map0.get("three");
    var twoArr = map0.get("two");
    var oneArr = map0.get("one");
    var fourHas = false;
    var threeHas = false;
    var twoHas = false;

    for(i=0;i<fourArr.length;i++){
        if($("#"+fourArr[i]).attr("able")!==-1){
            downByComputer(fourArr[i]);
            fourHas=true;
            break;
        }
    }
    if(!fourHas) {
        for (i = 0; i < threeArr.length; i++) {
            if ($("#"+threeArr[i]).attr("able") == -1) {
                downByComputer(threeArr[i]);
                threeHas=true;
                break;
            }
        }
    }else{
        return ;
    }
    if(!threeHas) {
        for (i = 0; i < twoArr.length; i++) {
            if ($("#"+twoArr[i]).attr("able") == -1) {
                downByComputer(twoArr[i]);
                two=true;
                break;
            }
        }
    }else{
        return ;
    }
    if(!twoHas) {
        for (i = 0; i < oneArr.length; i++) {
            if ($("#"+oneArr[i]).attr("able") == -1) {
                downByComputer(oneArr[i]);
                break;
            }
        }
    }else{
        return ;
    }
}

function downByComputer(id){
    console.log(id);
    idr="#"+id;
    if($(idr).attr('able')==-1) {//空白棋
        $(idr).css('background-color', 'black');
        $(idr).css('background','url(white.jpg) no-repeat center center');
        page.cur = 1;//下一个棋手  人
        $(idr).attr("able", 0);
    }
    checkVin(id.split("-")[0],id.split("-")[1],page.cur);
}
//测试方法
function downByComputertest(){
    console.log(page.xW+","+page.yW);
    var id="#"+page.xW+"-"+page.yW;
    if($(id).attr('able')==-1) {//空白棋
        $(id).css('background-color', 'black');
        $(id).css('background','url(white.jpg) no-repeat center center');
        page.cur = 1;//下一个棋手  人
        $(id).attr("able", 0);
    }
    checkVin(page.xW,page.yW,page.cur);
}
function test() {
    var map = new Map();
    map.put("a", "aaa");
    map.put("b","bbb");
    map.put("cc","cccc");
    map.put("c","ccc");
    map.put("list",page.xArr);
    map.remove("cc");
    var array = map.keySet();
    for(var i in array) {
        console.log("key:(" + array[i] +") <br>value: ("+map.get(array[i])+") <br>");
    }
    console.log(map.get("b"));
    console.log(map.get("list").splice(map.get("list").indexOf(10),1));
    console.log(map.get("list"));
    console.log(page.xArr.splice(page.xArr.indexOf(10),1));
    console.log(page.xArr);
    var arr = new Array()
    arr[0] = "George"
    arr[1] = "John"
    arr[2] = "Thomas"
    arr[3] = "James"
    arr[4] = "Adrew"
    arr[5] = "Martin"
    console.log(arr.length);
}
   