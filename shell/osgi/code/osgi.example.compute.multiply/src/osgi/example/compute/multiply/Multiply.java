package osgi.example.compute.multiply;

import osgi.example.compute.Compute;

public class Multiply implements Compute {

	public String computeNums(int x, int y) {
		// TODO Auto-generated method stub
		int s = x * y;
		String result = "The Multiply is---" + String.valueOf(s);
		return result;
	}
	public static void main(String[] args) {
		
		System.out.println(new Multiply().computeNums(1, 2));
	}

}
