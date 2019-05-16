package com.zxn.example.web;

import com.zxn.example.service.compute.Compute;


public class ComputeServiceRef
{
	private static Compute computeService = null;
	
	public void setComputeService(Compute computeImpl)
	{
		computeService = computeImpl;
	}
	
	public Compute getComputeService()
	{
		return computeService;
	}
	
	public static String compute(int x, int y)
	{
		String result = "No compute service is available now !";
		if ( computeService != null )
		{
			result = computeService.computeNums(x, y);
		}
		
		return result;
	}

}
