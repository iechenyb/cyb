#!/bin/bash
read -t 30 -p 'please input your name in 30 seconds:' name
echo -e '\n'
echo 'your name is '$name

echo '---------------------------------'
psd=123456
read -t 30 -s -p 'please input your password in 30 seconds:' password
echo -e '\n'
echo 'your password is '$password
if [[ $password -eq $psd ]]
then 
   echo 'your password is right!'
else
   echo 'your password is wrong!'
fi
echo '------------------------------------'

read -t 30 -n 1 -p 'please input any char :' ch
echo -e '\n'
echo 'the char you input is ' $ch

