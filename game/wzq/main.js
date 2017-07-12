/**
 * Created by DHUser on 2017/7/12.
 */
var app = angular.module('app',[]);
app.controller('controller',main);
function main($scope,$q,$http){
    $scope.fisrt=1;
    $scope.cur=1;
    $scope.show=function (x,y) {
        console.log("#"+x+"#"+y);
        if(!over){
            if($scope.cur==1){
                if($("#"+x+"-"+y).attr('able')==-1){
                    $("#"+x+"-"+y).css('background','url(black.jpg) no-repeat center center');
                    //$("#"+x+"-"+y).css('background-repeat','none');
                    //$("#"+x+"-"+y).css('filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='black.jpg', sizingMethod='scale')");
                    $("#"+x+"-"+y).attr("able",1);
                }
                $scope.cur=0;
            }else{
                if($("#"+x+"-"+y).attr('able')==-1) {
                    $("#" + x + "-" + y).css('background-color', 'black');
                    $("#"+x+"-"+y).css('background','url(white.jpg) no-repeat center center');
                    $scope.cur = 1;
                    $("#" + x + "-" + y).attr("able", 0);
                }
            }
            checkVin(x,y,$scope.cur);
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
}
   