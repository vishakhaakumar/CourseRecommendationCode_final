package com.example.courses.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class CourseHistoryData {
        long studentId;
        long courseId;
        long semester;
        String courseName;
        String description;
}
