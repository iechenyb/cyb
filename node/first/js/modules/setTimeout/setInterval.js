/**
 * Created by DHUser on 2018/11/21.
 */
function printHello(){
    console.log( "Hello, World!");
}
// 两秒后执行以上函数，并且没两秒执行一次
setInterval(printHello, 2000);