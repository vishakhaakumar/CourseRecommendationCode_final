package com.example.courses.repository;

import com.example.courses.entity.CourseDets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RecommendationRepository extends JpaRepository<CourseDets, Long> {
    @Query(value = "SELECT c.*, coalesce(cft.rating, 0) as rating, coalesce(cft.workload, 0) as workload\n" +
            "    FROM courses_all as c LEFT JOIN (\n" +
            "            SELECT\n" +
            "                    cf.course_id,\n" +
            "            AVG(DISTINCT cf.rating) as rating,\n" +
            "    AVG(DISTINCT cf.workload) as workload\n" +
            "    FROM course_feedback cf\n" +
            "    GROUP BY cf.course_id\n" +
            "    ) cft\n" +
            "    ON c.course_id = cft.course_id WHERE c.course_id in (?1)",nativeQuery = true)
    Iterable<CourseDets> findRecommendedCourseDetails(long[] courseIds);

}
