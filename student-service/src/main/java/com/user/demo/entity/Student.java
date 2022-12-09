package com.user.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @Id
    private long studentId;
   // @Column(name="first_name")
    private String firstName;
    private String lastName;
    private String address;
    private String emailId;
    private long phoneNumber;
    private long semester;
}
