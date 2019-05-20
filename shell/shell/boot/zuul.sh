#!/bin/bash
jmxport=8090
JVM_OPTS="-Duser.timezone=Asia/Shanghai -Xms2048M -Xmx2048M -XX:PermSize=512M -XX:MaxPermSize=512M -XX:+HeapDumpOnOutOfMemoryError -XX:+PrintGCDateStamps -Xloggc:$GC_LOG_PATH -XX:+PrintGCDetails -XX:NewRatio=1 -XX:SurvivorRatio=30 -XX:+UseParallelGC -XX:+UseParallelOldGC"

JMX="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=$jmxport -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false"

nohup java -jar -Dspring.profiles.active=prod -Dserver.port=8080 $JVM_OPTS $JMX  zuul-1.1.jar  >./logs/zuul1.1.log 2>&1 &
