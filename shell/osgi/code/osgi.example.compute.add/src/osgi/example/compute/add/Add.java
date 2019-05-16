package osgi.example.compute.add;

import osgi.example.compute.Compute;

public class Add implements Compute {

	public String computeNums(int x, int y) {
		int s = x + y;
		String result = "The Sum is---" + String.valueOf(s);
		return result;
	}
}
