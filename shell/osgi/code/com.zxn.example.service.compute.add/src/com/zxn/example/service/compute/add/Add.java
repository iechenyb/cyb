package com.zxn.example.service.compute.add;

import com.zxn.example.service.compute.Compute;

public class Add implements Compute
{
	public String computeNums(int x, int y)
	{
		int s = x + y;
        String sum = (new Integer(s)).toString();
		String result = "The sum of the 2 numbers is : " + sum;
		
		return result;
	}
}
