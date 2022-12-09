package com.example.courses.repository;

import com.example.courses.entity.StudentDets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StudentDetsRepository extends JpaRepository<StudentDets, Long> {

    @Query(value = "select s.student_id, s.first_name, s.last_name, s.email_id, s.phone_number \n" +
            "from course_history c, student s \n" +
            "where c.student_id = s.student_id\n" +
            "and course_id=?1",nativeQuery = true)
    Iterable<StudentDets> getStudDetails(long courseId);
}
