package com.example.courses.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "courses_filter")
@SecondaryTable(name = "course_feedback", pkJoinColumns = @PrimaryKeyJoinColumn(name = "courseId"))
public class FilteredCourseDetails {
    @Id
    private long courseId;
    private String courseName;
    private String description;
    private String preRequisites;
    private String professorName;
    private String term;
    private String courseType;
    private long rating;
    private String jobRole;
    private long workload;
}
