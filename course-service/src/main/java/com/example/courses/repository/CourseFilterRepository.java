package com.example.courses.repository;

import com.example.courses.entity.FilteredCourseDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseFilterRepository extends JpaRepository<FilteredCourseDetails, Long> {

    @Query(value = "select c.course_id, c.course_name, c.description, c.pre_requisites, c.professor_name, c.term, c.course_type, cf.rating, cf.job_role, cf.workload from courses_all c, course_feedback cf where\n" +
            "c.course_id=cf.course_id and cf.rating=?1",nativeQuery = true)
    Iterable<FilteredCourseDetails> findCourseFilterByRating(long rating);
}
