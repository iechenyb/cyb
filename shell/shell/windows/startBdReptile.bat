@echo off
set projectAddr=%1
echo �������аٶ���������...
cd %projectAddr%/reptile
If exist node_modules (
   echo node���Ѱ�װ...
) Else (
   cnpm install
)