package com.zxn.example.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.mvc.Controller;

public class ComputeControler implements Controller
{
    public ModelAndView handleRequest(HttpServletRequest request, 
    								  HttpServletResponse response) throws Exception 
    {
        String n1 = request.getParameter("numOne");
        String n2 = request.getParameter("numTwo");
        
        int x = Integer.parseInt(n1);
        int y = Integer.parseInt(n2);
        
       	String result = ComputeServiceRef.compute(x, y);

        return new ModelAndView(new MessageResponseView(result));
    }
    
    private static class MessageResponseView implements View 
    {
        private String responseText;

        public MessageResponseView(String resp) 
        {
        	responseText = resp;
        }

        public String getContentType() 
        {
            return "text/html";
        }

        public void render(Map map, HttpServletRequest request, HttpServletResponse response) throws IOException 
        {
            response.setContentType(getContentType());
            PrintWriter out = response.getWriter();

            out.println("<html>");
            out.println("<head><title>OSGi Spring Test</title></head>");
            out.println("<body>");
            out.println(responseText);
            out.println("</body>");
            out.println("</html>");
      }
    }
}
