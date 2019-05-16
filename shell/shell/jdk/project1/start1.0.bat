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
::输入要查找的文件根目录
set fileRoot=d:/data
java -Xmx256m -Djava.ext.dirs=%lib% %MainClass% jdbc:mysql://localhost:3306/test com.mysql.jdbc.Driver root 111111
pause