#!/bin/bash
java -cp h2-1.3.176.jar org.h2.tools.Server -web -webAllowOthers -tcp -tcpPort 19200 -tcpAllowOthers