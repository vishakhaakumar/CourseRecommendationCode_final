package com.example.courses.UserService;

import com.example.courses.entity.LoginCreds;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class MyUserDetails implements UserDetails {
    private String userName;
    private String password;
    private Boolean active;
    private List<GrantedAuthority> authorities;

//constructor
    public MyUserDetails(LoginCreds user) {
        this.userName = user.getUserName();
        this.password = user.getPassword();
        this.active = user.getActive();
        this.authorities = Arrays.stream(user.getRoles().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        log.info("Authorities val is "+authorities.toString());
        return authorities;
    }

    @Override
    public String getPassword() {
        log.info("pwd val is "+password);
        return password;
    }

    @Override
    public String getUsername() {
        log.info("pwd val is "+userName);
        return userName;
    }
    @Override
    public boolean isEnabled() {
        return active;
    }

    //-----------------------  set all to true below as we dont have these fields in users table

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
