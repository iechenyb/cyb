#!/bin/bash
value=1
if [ ! -n "$value" ]
then
echo 'value is empty'
else
echo 'value is '${value}
fi
