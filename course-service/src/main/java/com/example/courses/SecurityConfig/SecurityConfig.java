package com.example.courses.SecurityConfig;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

// this method is for JPA-Mysql AUTHENTICATION Config
   /* @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        log.info(" inside configure");
        auth.userDetailsService(myuserDetailsService);
    }*/
// this method is for AUTHORIZATION config
    protected void configure(HttpSecurity http) throws Exception {
         //add access from most restrictive to least restrictive
        /*http
                .authorizeRequests()
                .antMatchers("/student/login").hasAnyRole("USER")
               // .antMatchers("/").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();*/

        http.csrf().
                disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
       /* http.authorizeRequests()
                .antMatchers("/student").hasAnyRole("USER","ADMIN")
                .antMatchers("/student/login").hasAnyRole("USER")
                .antMatchers("/").permitAll()
                .and().formLogin();*/
        // .antMatchers("/**") - for all paths  //.hasRole() - use this for single role  //.hasAnyRole("ADMIN")
    }

    @Bean
    public PasswordEncoder getPasswordEncoder(){
        log.info("inside the password encoder");
        return NoOpPasswordEncoder.getInstance();
        // do not use Noop - this will not encode the pwd, but send it as is.
        // for demo purpose its used here, in real apps dont use it.

    }
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH",
                "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type"));
        UrlBasedCorsConfigurationSource source = new
                UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
