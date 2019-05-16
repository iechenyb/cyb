package com.cyb.helloworld;

import java.util.ArrayList;
import java.util.List;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceRegistration;

import com.cyb.helloworld.impl.HelloImpl;

public class Activator implements BundleActivator {

	private static BundleContext context;
    @SuppressWarnings("rawtypes")
	private List<ServiceRegistration> registrations = new ArrayList<ServiceRegistration>();
	static BundleContext getContext() {
		return context;
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#start(org.osgi.framework.BundleContext)
	 */
	public void start(BundleContext bundleContext) throws Exception {
		Activator.context = bundleContext;
		HelloImpl service = new HelloImpl("hello,iechenyb!");
		registrations.add(bundleContext.registerService(Hello.class.getName(), service, null));
		System.out.println("×¢²á·þÎñ£º"+service);
		service  = null;
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext bundleContext) throws Exception {
		Activator.context = null;
		for(ServiceRegistration<?> ser:registrations){
			System.out.println("unregister:"+ser);
			ser.unregister();
		}
	}

}
