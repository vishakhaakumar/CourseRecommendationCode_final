package com.example.courses.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class CourseFeedbackData {
        long studentId;
        long courseId;
        long rating;
        String jobRole;
        long workload;
}
