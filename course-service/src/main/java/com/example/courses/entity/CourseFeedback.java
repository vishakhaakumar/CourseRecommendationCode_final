package com.example.courses.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "course_feedback")
public class CourseFeedback {
        @EmbeddedId
        FeedbackId feedId;
        long rating;
        String jobRole;
        long workload;
}
