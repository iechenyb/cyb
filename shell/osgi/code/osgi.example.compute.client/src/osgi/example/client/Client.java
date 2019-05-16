package osgi.example.client;

import org.osgi.framework.ServiceReference;

import osgi.example.compute.Compute;

public class Client {
	ServiceReference serviceReference;
	/**
	 * 为了方便测试，采用Spring的构造注入方式，直接在构造函数中调用Compute服务
	 * @param compute
	 */
	public Client(Compute compute){
		System.out.println(compute.computeNums(5, 6));
	}
	
	public ServiceReference getServiceReference() {
		return serviceReference;
	}
	public void setServiceReference(ServiceReference serviceReference) {
		this.serviceReference = serviceReference;
	}
}
