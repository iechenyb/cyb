/**
 * Created by DHUser on 2018/11/21.
 */
//第一种使用方式
var hello1 = require('./hello1.0');
hello1.world();//使用模块hello

//第二种使用模块的方式
var Hello = require('./hello1.1');
hello = new Hello();
hello.setName('BYVoid');
hello.sayHello();

