/**
 * Created by DHUser on 2018/11/21.
 */
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
// 创建事件处理程序(相当于回调函数)
var connectHandler = function connected() {
    console.log('连接成功。');
    // 触发 data_received 事件
    eventEmitter.emit('data_received','{"name":"chenyb"}');
}
// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(data){
    console.log('数据接收成功。'+data);
});
// 触发 connection 事件
eventEmitter.emit('connection');
console.log("程序执行完毕。");