package com.cyb.helloworld.client;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;

import com.cyb.helloworld.Hello;

public class HelloUser implements BundleActivator {
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void start(BundleContext bundleContext) throws Exception {
		ServiceReference ref=bundleContext.getServiceReference(Hello.class.getName());
		if(ref!=null){
			Hello hello = null;
			try{
				hello = (Hello)bundleContext.getService(ref);
				if(hello!=null){
					hello.sayHello();
				}else{
					System.out.println("Service Hell object is null!");
				}
			}catch(Exception e){
				e.printStackTrace();
			}finally{
				bundleContext.ungetService(ref);
				hello = null;
			}
		}else{
			System.out.println("Service hello not exists!");
		}
	}

	public void stop(BundleContext bundleContext) throws Exception {
		System.out.println("say hello client unload!");
	}

}
