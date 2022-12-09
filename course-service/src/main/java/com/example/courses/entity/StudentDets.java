package com.example.courses.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "student_dets")
public class StudentDets {
        @Id
        private long studentId;
        private String firstName;
        private String lastName;
        private String emailId;
        private String phoneNumber;
}
