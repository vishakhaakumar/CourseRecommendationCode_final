package com.example.courses.service;

import com.example.courses.entity.FilteredCourseDetails;
import com.example.courses.repository.CourseFilterRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CourseFilterService {

    @Autowired
    private CourseFilterRepository courseFilterRepository;

    public Iterable<FilteredCourseDetails> getCourseFilterByRating(long rating) {
        return courseFilterRepository.findCourseFilterByRating(rating);
    }
}
