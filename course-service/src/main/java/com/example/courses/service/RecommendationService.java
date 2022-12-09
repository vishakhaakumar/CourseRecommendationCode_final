package com.example.courses.service;

import com.example.courses.entity.*;
import com.example.courses.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    public Iterable<CourseDets> findCoursesDetsByIds(long[] courseIds) {
        return recommendationRepository.findRecommendedCourseDetails(courseIds);
    }
}
