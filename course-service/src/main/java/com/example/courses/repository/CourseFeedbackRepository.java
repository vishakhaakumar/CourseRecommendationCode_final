package com.example.courses.repository;

import com.example.courses.entity.Course;
import com.example.courses.entity.CourseFeedback;
import com.example.courses.entity.FeedbackId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseFeedbackRepository extends JpaRepository<CourseFeedback, FeedbackId> {
    @Query(value = "select * from course_feedback where student_id=?1 and course_id=?2",nativeQuery = true)
    CourseFeedback getFeedback(long studentId, long courseId);
}
