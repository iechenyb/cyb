::工程的根目录
::set base=D:/chenyb/myproject/finally/doc/shell/jdk/project1
@echo off
set base=%cd%
echo current file path is %base%
::库扩展包
set lib=%base%/lib
::运行主类
set MainClass=com.cyb.dbpool.connection.DataBaseConnectionTest
echo The main class is %MainClass%
::基础配置文件根目录
set baseConfigFile=%base%/config/
echo config path is %baseConfigFile%
set baseOutPut=%base%/output/
::执行日志目录
set logFile=%baseOutPut%md5.log
echo output log file  is %logFile% 
::目标md5码信息
set targetFilePath=%baseConfigFile%target
echo target md5 file  is %targetFilePath% 
::查找结果
set resultFile=%baseOutPut%result

::输入要查找的文件根目录
set fileRoot=d:/data
java -Xmx256m -Djava.ext.dirs=%lib% %MainClass% jdbc:mysql://localhost:3306/test com.mysql.jdbc.Driver root 111111
echo output result file  is %resultFile% 
echo output log file  is %logFile% 
pause