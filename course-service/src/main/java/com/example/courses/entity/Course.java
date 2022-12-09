package com.example.courses.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "courses_all")
public class Course {
    @Id
    private long courseId;
    private String courseName;
    private String description;
    private String preRequisites;
    private String professorName;
    private String term;
    private String courseType;
}
