package com.example.courses.repository;

import com.example.courses.entity.Course;
import com.example.courses.entity.CourseDets;
import com.example.courses.entity.CourseFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Course findByCourseId(long courseId);
    void deleteById(long courseId);
}
