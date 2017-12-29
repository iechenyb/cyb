/**
 * Created by DHUser on 2017/7/12.
 */
//东西线
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
//西北-东南线
function checkLURD(x,y,curVal){
    var LU=""+alia[curVal];var RD="";
    for (var num = 1; num <= 4; num++) {
        var curx = x - num;
        var cury=y-num;
        var val = $("#" + curx + "-" + cury).attr("able");
        if (curx >= 1 &&cury>=1 && curVal == val) {
            LU = LU + alia[val];
        } else {
            break;
        }
    }
    for (var num = 1; num <= 4; num++) {
        var curx = x + num;
        var cury = y + num;
        var val = $("#" + curx + "-" + cury).attr("able");
        if (curx <= ROW && cury<=ROW && curVal == val) {
            RD = RD + alia[val];
        } else {
            break;
        }
    }
    return LU+RD;
}
//东北-西南线
function checkRULD(x,y,curVal){
    var RU=""+alia[curVal];var LD="";
    for (var num = 1; num <= 4; num++) {
        var curx = x - num;
        var cury= y + num;
        var val = $("#" + curx + "-" + cury).attr("able");
        if (curx >= 1 &&cury>=1 && curVal == val) {
            RU = RU + alia[val];
        } else {
            break;
        }
    }
    for (var num = 1; num <= 4; num++) {
        var curx = x + num;
        var cury = y - num;
        var val = $("#" + curx + "-" + cury).attr("able");
        if (curx <= ROW && cury<=ROW && curVal == val) {
            LD = LD + alia[val];
        } else {
            break;
        }
    }
    return RU+LD;
}
//南北线
function checkZUZD(x,y,curVal){
    var ZU=""+alia[curVal];var ZD="";
    for (var num = 1; num <= 4; num++) {
        var curx = x - num;
        var val = $("#" + curx + "-" + y).attr("able");
        if (curx >= 1 && curVal == val) {
            ZU = ZU + alia[val];
        } else {
            break;
        }
    }
    for (var num = 1; num <= 4; num++) {
        var curx = x + num;
        var val = $("#" + curx + "-" + y).attr("able");
        if (curx <= ROW && curVal == val) {
            ZD = ZD + alia[val];
        } else {
            break;
        }
    }
    return ZU+ZD;
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
    $("#obj").css("top",divTop);
    $("#obj").css("left",divLeft);
    console.log("棋子坐标：TOP="+divTop+"，left="+divLeft);
    var curVal= $("#"+x+"-"+y).attr("able");
    for(var direct=1;direct<=4;direct++) {
        if (direct == 1) {
            if (checkWinStr(checkZLZR(x, y, curVal), curVal,"东西")) return;//游戏结束
        } else if (direct == 2){
            if (checkWinStr(checkZUZD(x, y, curVal), curVal,"南北")) return;//游戏结束
        }else if (direct == 3){
            if (checkWinStr(checkLURD(x, y, curVal), curVal,"西北东南")) return;//游戏结束
        }else if (direct == 4){
            if (checkWinStr(checkRULD(x, y, curVal), curVal,"东北西南")) return;//游戏结束
        }
    }
}
function checkWinStr(finalStr,curVal,direct){
    console.log(qz[curVal] + "-"+direct+"-：" + finalStr + ",win=" + finalStr.indexOf(winStr[curVal]));
    if (finalStr.indexOf(winStr[curVal]) >= 0) {
        alert(person[curVal] + "获胜");
        over = true;
        winPeron = curVal;
        return true;
    }else{
        return false;
    }
}