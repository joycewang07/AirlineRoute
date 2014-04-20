package org.joyce.algorithm;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by Administrator on 14-4-12.
 */

@EnableAutoConfiguration
@ComponentScan
public class Application extends WebMvcConfigurerAdapter {
    public static void main(String[] args) {
        new SpringApplicationBuilder(Application.class).run();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("images/**").addResourceLocations("images/");
        registry.addResourceHandler("css/**").addResourceLocations("css/");
        registry.addResourceHandler("js/**").addResourceLocations("js/");
        registry.addResourceHandler("extjs/**").addResourceLocations("extjs/");
        //registry.addResourceHandler("extjs5/**").addResourceLocations("WEB-INF/extjs5/");
        //registry.addResourceHandler("views/**").addResourceLocations("WEB-INF/views/");
    }
}
