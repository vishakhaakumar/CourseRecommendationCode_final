package com.example.courses.controller;

import com.example.courses.entity.*;
import com.example.courses.repository.CourseHistoryRepository;
import com.example.courses.repository.CourseRegRepository;
import com.example.courses.repository.CourseRepository;
import com.example.courses.service.CourseService;
import com.example.courses.service.RecommendationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/recommendations")
@Slf4j
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    //get user details
    @GetMapping("/byIds/{ids}")
    @ResponseBody
    public Iterable<CourseDets> findCoursesByIds(@PathVariable("ids") long courseIds[]) {
        log.info("Inside findCoursesByIds controller"+courseIds);
        return recommendationService.findCoursesDetsByIds(courseIds);
    }
}
