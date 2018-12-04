/**
 * Created by DHUser on 2018/11/21.
 */
var fs = require("fs");
var fileName="readme.txt";

//非阻塞代码实例
fs.readFile(fileName, function (err, data) {
    if (err) {
        console.log(err.stack);
        return ;
    }
    console.log(data.toString());
});
console.log("程序执行结束!");

//阻塞代码实例
var data = fs.readFileSync(fileName);
console.log(data.toString());
console.log("程序执行结束!");
