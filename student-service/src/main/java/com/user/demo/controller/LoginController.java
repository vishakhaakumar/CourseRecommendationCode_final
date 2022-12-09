package com.user.demo.controller;

import com.user.demo.entity.LoginCreds;
import com.user.demo.model.AuthenticationBean;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RestController
//@RequestMapping("/login")
public class LoginController {

    @GetMapping("/student") //accessible by user, admin, guest
    public AuthenticationBean printWelcome(){
        log.info("here printingggggg ");
        return new AuthenticationBean("You are authenticated");
    }

    @GetMapping("/student/login") //accessible by user, admin, guest
    public AuthenticationBean studentLogin(){
        log.info("here printingggggg ");
        return new AuthenticationBean("You are authenticated");
    }



   }
