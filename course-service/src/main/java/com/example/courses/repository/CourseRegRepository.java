package com.example.courses.repository;

import com.example.courses.entity.CourseReg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface CourseRegRepository extends JpaRepository<CourseReg, Long> {
    CourseReg findByCourseId(long courseId);
    void deleteById(long courseId);

    @Modifying
    @Transactional
    @Query(value = "delete from course_registered where student_id=?1 and course_id=?2",nativeQuery = true)
    void deleteByStudentId(long studentId, long courseId);


    @Query(value = "select count(*) from course_registered where student_id=?1 and course_id=?2",nativeQuery = true)
    int findCourseById(long studentId, long courseId);

    @Query(value = "select count(*) from course_registered where student_id=?1", nativeQuery = true)
    long findAllCount(long studentId);

    @Query(value = "select * from course_registered where student_id=?1", nativeQuery = true)
    Iterable<CourseReg> findAllCoursesRegistered(long studentId);
}
