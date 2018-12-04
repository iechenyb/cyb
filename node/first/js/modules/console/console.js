/**
 * Created by DHUser on 2018/11/21.
 */
console.log('Hello world');
console.log('byvoid%diovyb');
console.log('byvoid%diovyb', 1991);
console.error("error message!")
console.warn("warn 警告信息！")
//console.trace();
console.info("程序开始执行：");
var counter = 10;
console.log("计数: %d", counter);
console.time("获取数据");//统计执行时间开始点
// 执行一些代码
console.timeEnd('获取数据');//统计执行时间结束点

// 输出当前目录
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());
console.info("程序执行完毕。")