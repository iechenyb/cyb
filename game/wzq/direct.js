/**
 * Created by DHUser on 2017/7/12.
 */
function checkZLZR(x,y,curVal){
    var ZL=""+alia[curVal]; var ZR="";
    for (var num = 1; num <= 4; num++) {
        var cury = y - num;
        var val = $("#" + x + "-" + cury).attr("able");
        if (cury >= 1 && curVal == val) {
            ZL = ZL + alia[val];
        } else {
            break;
        }
    }
    for (var num = 1; num <= 4; num++) {
        var cury = y + num;
        var val = $("#" + x + "-" + cury).attr("able");
        if (cury <= ROW && curVal == val) {
            ZR = ZR + alia[val];
        } else {
            break;
        }
    }
    return ZL+ZR;
}
function checkVin(x,y,cur){
    /*1-ZL 2-LU45 3-ZU 4-RU45 5-ZR  6-RD45 7-ZD 8-LD45
     * ZL+ZR
     * LU45+RD45
     * ZU+ZD
     * LD45+RU45
     * */
    var divTop = $("#"+x+"-"+y).position().top;
    var divLeft = $("#"+x+"-"+y).position().left;
    $("#obj").css("top",divTop-20);
    $("#obj").css("left",divLeft-20);
    //var div = "<div style='width:50px;height:50px;border-radius:50px;border:solid rgb(100,100,100) 1px;z-index:999;top:"+(divTop-20)+";left:"+(divLeft-20)+";position:absolute'></div>";
    console.log("棋子坐标：TOP="+divTop+"，left="+divLeft);
    // $(document.body).append(div);
    var curVal= $("#"+x+"-"+y).attr("able");
    var LU45=""+alia[curVal];var ZU=""+alia[curVal]; var RU45=""+alia[curVal];
    var RD45="";var ZD=""; var LD45="";
    for(var direct=1;direct<=8;direct++) {
        if (direct == 1) {
            if(checkWinStr(checkZLZR(x,y,curVal),curVal)) return ;//游戏结束
        }
    }
}
function checkWinStr(finalStr,curVal){
    console.log(winStr[curVal] + "-水平方向-：" + finalStr + ",win=" + finalStr.indexOf(winStr[curVal]));
    if (finalStr.indexOf(winStr[curVal]) >= 0) {
        alert(person[curVal] + "获胜");
        over = true;
        winPeron = curVal;
        return true;
    }else{
        return false;
    }
}