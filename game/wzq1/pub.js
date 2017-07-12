/**
 * Created by DHUser on 2017/7/12.
 */
var ROW=15;
var person = new Array(2);
person[1]="甲方";person[0]="乙方";
var qz = new Array(2);
qz[1]="黑球";qz[0]="白球";
var alia = new Array(2);
alia[0]="#";alia[1]="*";
var winStr = new Array(2);
winStr[0]="#####";
winStr[1]="*****";
var win4Str = new Array(2);
win4Str[0]="####";
win4Str[1]="****";
var win3Str = new Array(2);
win3Str[0]="###";
win3Str[1]="***";
var win2Str = new Array(2);
win2Str[0]="##";
win2Str[1]="**";
var win1Str = new Array(2);
win1Str[0]="#";
win1Str[1]="*";
var over = false;
var winPeron = -1 ;
var map0 = new Map();
var map1 = new Map();
var nullArr=new Array();
//只需要存机器下一步 乙方
//下步可以走  乙方
map0.put("one",nullArr);
map0.put("two",nullArr);
map0.put("three",nullArr);
map0.put("four",nullArr);
//下步可以走 甲方
map1.put("one",nullArr);
map1.put("two",nullArr);
map1.put("three",nullArr);
map1.put("four",nullArr);
