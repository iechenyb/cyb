package com.zxn.example.web;

import java.util.Dictionary;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.eclipse.equinox.jsp.jasper.JspServlet;
import org.osgi.framework.BundleContext;
import org.osgi.framework.Constants;
import org.osgi.framework.Filter;
import org.osgi.framework.FrameworkUtil;
import org.osgi.service.http.HttpContext;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;
import org.osgi.util.tracker.ServiceTracker;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.osgi.context.BundleContextAware;
import org.springframework.web.servlet.DispatcherServlet;
//, ApplicationContextAware
public class HTTPContextRegistry implements BundleContextAware
{
    /**
     * this bean is used to register your spring-loaded 'WebContent' directory,
     * resources, the mappings for your 'jsp' pages etc.
     */
    
    protected String webRoot = "/";
    
    protected String alias = "/test";
    
    protected String contextConfigFile = "WEB-INF/defaultConfig.xml";
    
    protected String dispatcherID = null;
    
    protected String controllerAliasPattern = "/*";

    protected BundleContext bundleContext = null;
    protected ApplicationContext applicationContext = null;
    
    public BundleContext getBundleContext()
    {
        return bundleContext;
    }
    public void setBundleContext(BundleContext bundleContext)
    {
        this.bundleContext = bundleContext;
    }
    public ApplicationContext getApplicationContext()
    {
        return applicationContext;
    }
    public void setApplicationContext(ApplicationContext applicationContext)
    {
        this.applicationContext = applicationContext;
    }

    public String getWebRoot()
    {
        return webRoot;
    }
    
    public void setWebRoot(String rootContextPath)
    {
        this.webRoot = rootContextPath;
    }
    
    public String getContextConfigFile()
    {
        return contextConfigFile;
    }
    
    public void setContextConfigFile(String contextConfigFile)
    {
        this.contextConfigFile = contextConfigFile;
    }
    
    public String getDispatcherID()
    {
        return dispatcherID;
    }
    
    public void setDispatcherID(String dispatcherID)
    {
        this.dispatcherID = dispatcherID;
    }
    
    public String getControllerAliasPattern()
    {
        return controllerAliasPattern;
    }
    
    public void setControllerAliasPattern(String controllerAliasPattern)
    {
        this.controllerAliasPattern = controllerAliasPattern;
    }
    
    public String getAlias()
    {
        return alias;
    }
    
    public void setAlias(String alias)
    {
        this.alias = alias;
    }
    
    /**
     *  called by Spring after this bean has been instantiated
     */
    public void init()
    {
        if (null == dispatcherID)
        {
            setDispatcherID(getWebRoot());
        }
        
        HttpService httpService = (HttpService)getHTTPService(getBundleContext(), 
        		HttpService.class, null, 0);
        HttpContext commonContext = httpService.createDefaultHttpContext();
        
        DispatcherServlet dispatcherServlet = new DispatcherServlet();
        dispatcherServlet.setContextConfigLocation(
        		getWebRoot() + "/" + getContextConfigFile());
        
        Dictionary<String, String> initparams = new Hashtable<String, String>();
        initparams.put("load-on-startup", "1");
        initparams.put("servlet-name", dispatcherID);
        
        Servlet jspServlet = new JspServlet(getBundleContext().getBundle(), 
        		getWebRoot(), getAlias());
        Dictionary<String, String> jspInitParams = new Hashtable<String, String>();
        jspInitParams = new Hashtable<String, String>();
        jspInitParams.put("load-on-startup", "1");
        jspInitParams.put("servlet-name", getWebRoot() + "_jspServlet");
        
        try
        {
            httpService.registerResources(getAlias(), getWebRoot(), commonContext);
            httpService.registerServlet(getControllerAliasPattern(), 
            		dispatcherServlet, initparams, commonContext);
            httpService.registerServlet(getAlias() + "/*.jsp", 
            		jspServlet, jspInitParams,commonContext);
        }
        catch (ServletException e)
        {
            e.printStackTrace();
        }
        catch (NamespaceException e)
        {
            e.printStackTrace();
        }
    }
    
    public void stop()
    {
        HttpService httpService = (HttpService)getHTTPService(getBundleContext(), HttpService.class, null, 0);
        httpService.unregister(getAlias());
        httpService.unregister(getControllerAliasPattern());
        httpService.unregister(getAlias() + "/*.jsp");
    }
    
    public void start()
    {
        init();
    }
    
    public static Object getHTTPService(BundleContext bundleContext, 
    		Class cls, Map<String, String> propertyValueMatch, long timeOut)
    {
        ServiceTracker tracker = new ServiceTracker(bundleContext, cls.getName(), null);
        tracker.open();

        try
        {
            tracker.waitForService(timeOut);
        }
        catch (InterruptedException e)
        {
        	e.printStackTrace();
        }
        
        Object service = tracker.getService();
        return service;
    }
   
}
