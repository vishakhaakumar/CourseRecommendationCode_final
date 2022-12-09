package com.example.courses.repository;

import com.example.courses.entity.Course;
import com.example.courses.entity.CourseHistory;
import com.example.courses.entity.CourseHistoryData;
import com.example.courses.entity.HistoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CourseHistoryRepository extends JpaRepository<CourseHistory, HistoryId> {

    @Query(value = "select count(*) from course_history where student_id=?1 and course_id=?2",nativeQuery = true)
    int findCourseHistoryById(long studentId, long courseId);

    @Query(value = "select * from course_history where student_id=?1",nativeQuery = true)
    Iterable<CourseHistory> findHistory(long studentId);
}
