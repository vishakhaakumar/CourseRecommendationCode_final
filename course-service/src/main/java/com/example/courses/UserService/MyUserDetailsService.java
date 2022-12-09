package com.example.courses.UserService;

import com.example.courses.entity.LoginCreds;
import com.example.courses.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info(" inside load by user");
            //need to return a UserDetails instance here, hence create a class to get that instance
            // pass the username entered while login and get all other details corresponding to that user.
        Optional<LoginCreds> user = userRepository.findByUserName(username);
        log.info(" after repo user "+user.toString());
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));   //since the user is optional here if it is null -> throw exception
        MyUserDetails val = user.map(MyUserDetails::new).get();
        log.info("hello heree -----> "+val.getUsername());

        return user.map(MyUserDetails::new).get();    //map the user obj from DB to MyUserDetails type
    }
}
