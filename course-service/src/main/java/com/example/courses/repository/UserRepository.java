package com.example.courses.repository;

import com.example.courses.entity.LoginCreds;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<LoginCreds, Integer> {

    Optional<LoginCreds> findByUserName(String userName);
    //JPA will create the implementation for the above method using the hints - method name and params passed.
}
