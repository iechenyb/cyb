package com.cyb.helloworld.impl;

import com.cyb.helloworld.Hello;


public class HelloImpl implements Hello{
    final String helloString;
	@Override
	public void sayHello() {
		System.out.println(this.helloString);
	}
	public  HelloImpl(String helloString) {
		this.helloString = helloString;
	}
}
