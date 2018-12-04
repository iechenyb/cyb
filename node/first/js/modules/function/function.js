/**
 * Created by DHUser on 2018/11/21.
 */
//声明式函数
function say(word) {
    console.log(word);
}

function execute(someFunction, value) {
    someFunction(value);
}

execute(say, "Hello");//直接调用，结果看控制台

//匿名函数
function execute(someFunction, value) {
    someFunction(value);
}

execute(function(word){ console.log(word) }, "Hello");