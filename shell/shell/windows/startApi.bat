@echo off
set projectAddr=%1
echo ����������˽ӿڣ���ȷ���������ӿ�֮ǰ�Ѿ�ִ�й�1��...
cd %projectAddr%/api
If exist node_modules (
   echo "node���Ѱ�װ..."
) Else (
    cnpm install
)
node .
If errorlevel 1 (
    echo ��˽ӿ��Ѿ�����������������д�localhost:3000/explorer���鿴��...
) Else (
    echo ��˽ӿ�����ʧ��...
)