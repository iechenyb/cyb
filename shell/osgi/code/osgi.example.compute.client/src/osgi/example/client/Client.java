package osgi.example.client;

import org.osgi.framework.ServiceReference;

import osgi.example.compute.Compute;

public class Client {
	ServiceReference serviceReference;
	/**
	 * Ϊ�˷�����ԣ�����Spring�Ĺ���ע�뷽ʽ��ֱ���ڹ��캯���е���Compute����
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
