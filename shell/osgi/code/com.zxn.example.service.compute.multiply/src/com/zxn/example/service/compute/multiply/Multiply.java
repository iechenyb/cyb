package com.zxn.example.service.compute.multiply;

import com.zxn.example.service.compute.Compute;

public class Multiply implements Compute
{
	public String computeNums(int x, int y)
	{
		int s = x * y;
        String multiply = (new Integer(s)).toString();
		String result = "The multiply of the 2 numbers is : " + multiply;
		
		return result;
	}
}
