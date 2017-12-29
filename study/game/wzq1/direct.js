/**
 * Created by DHUser on 2017/7/12.
 */
//东西线
function checkZLZR(x,y,curVal){
    var ZL=""+alia[curVal]; var ZR="";
    var idL,idR;
    for (var num = 1; num <= 4; num++) {
        var cury = Number(y) - num;
        var val = $("#" + x + "-" + cury).attr("able");
        if (cury >= 1 && curVal == val) {
            ZL = ZL + alia[val];
        } else {
            console.log("#"+x+"-"+cury);
            idL =x+"-"+cury;
            break;
        }
    }
    for (var num = 1; num <= 4; num++) {
        var cury = Number(y) + num;
        var val = $("#" + x + "-" + cury).attr("able");
        if (cury <= ROW && curVal == val) {
            ZR = ZR + alia[val];
        } else {
            console.log(x+","+cury);
            idR = x+"-"+cury;
            break;
        }
    }
    saveNextStop(ZL+ZR,curVal,idL,idR);
    return ZL+ZR;
}
//id1 左侧 ；id2 右侧
function saveNextStop(line,curVal,id1,id2){
    id11="#"+id1;
    id22="#"+id2;
    if(line.indexOf(win4Str[curVal])>=0){
        if(curVal==0){
            if($(id11).attr("able")==-1){
                map0.get("four").push(id1);
            }
            if($(id22).attr("able")==-1){
                map0.get("four").push(id2);
            }
        }else{
            if($(id11).attr("able")==-1){
               map1.get("four").push(id1);
            }
            if($(id22).attr("able")==-1){
                map1.get("four").push(id2);
            }
        }
    }else if(line.indexOf(win3Str[curVal])>=0){
        if(curVal==0){
            if($(id11).attr("able")==-1){
                map0.get("three").push(id1);
            }
            if($(id22).attr("able")==-1){
                map0.get("three").push(id2);
            }
        }else{
            if($(id11).attr("able")==-1){
                map1.get("three").push(id1);
            }
            if($(id22).attr("able")==-1){
                map1.get("three").push(id2);
            }
        }
    }else if(line.indexOf(win2Str[curVal])>=0){
        if(curVal==0){
            if($(id11).attr("able")==-1){
                map0.get("two").push(id1);
            }
            if($(id22).attr("able")==-1){
                map0.get("two").push(id2);
            }
        }else{
            if($(id11).attr("able")==-1){
                map1.get("two").push(id1);
            }
            if($(id22).attr("able")==-1){
                map1.get("two").push(id2);
            }
        }
    }else if(line.indexOf(win1Str[curVal])>=0){
        if(curVal==0){
            if($(id11).attr("able")==-1){
                map0.get("one").push(id1);
            }
            if($(id22).attr("able")==-1){
                map0.get("one").push(id2);
            }
        }else{
            if($(id11).attr("able")==-1){
                map1.get("one").push(id1);
            }
            if($(id22).attr("able")==-1){
                map1.get("one").push(id2);
            }
        }
    }
}
//西北-东南线
function checkLURD(x,y,curVal){
    var LU=""+alia[curVal];var RD="";
    for (var num = 1; num <= 4; num++) {
        var curx = Number(x) - num;
        var cury=Number(y)-num;
        var val = $("#" + curx + "-" + cury).attr("able");
        if (curx >= 1 &&cury>=1 && curVal == val) {
            LU = LU + alia[val];
        } else {
            console.log(curx+","+cury);
            break;
        }
    }
    for (var num = 1; num <= 4; num++) {
        var curx = Number(x)+ num;
        var cury = Number(y) + num;
        var val = $("#" + curx + "-" + cury).attr("able");
        if (curx <= ROW && cury<=ROW && curVal == val) {
            RD = RD + alia[val];
        } else {
            console.log(curx+","+cury);
            break;
        }
    }
    return LU+RD;
}
//东北-西南线
function checkRULD(x,y,curVal){
    var RU=""+alia[curVal];var LD="";
    for (var num = 1; num <= 4; num++) {
        var curx = Number(x) - num;
        var cury= Number(y) + num;
        var val = $("#" + curx + "-" + cury).attr("able");
        if (curx >= 1 &&cury>=1 && curVal == val) {
            RU = RU + alia[val];
        } else {
            console.log(curx+","+cury);
            break;
        }
    }
    for (var num = 1; num <= 4; num++) {
        var curx = Number(x) + num;
        var cury = Number(y) - num;
        var val = $("#" + curx + "-" + cury).attr("able");
        if (curx <= ROW && cury<=ROW && curVal == val) {
            LD = LD + alia[val];
        } else {
            console.log(curx+","+cury);
            break;
        }
    }
    return RU+LD;
}
//南北线
function checkZUZD(x,y,curVal){
    var ZU=""+alia[curVal];var ZD="";
    for (var num = 1; num <= 4; num++) {
        var curx = Number(x) - num;
        var val = $("#" + curx + "-" + y).attr("able");
        if (curx >= 1 && curVal == val) {
            ZU = ZU + alia[val];
        } else {
            console.log(curx+","+y);
            break;
        }
    }
    for (var num = 1; num <= 4; num++) {
        var curx = Number(x) + num;
        var val = $("#" + curx + "-" + y).attr("able");
        if (curx <= ROW && curVal == val) {
            ZD = ZD + alia[val];
        } else {
            console.log(curx+","+y);
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