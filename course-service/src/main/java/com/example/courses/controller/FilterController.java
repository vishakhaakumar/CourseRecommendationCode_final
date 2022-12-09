package com.example.courses.controller;

import com.example.courses.entity.FilteredCourseDetails;
import com.example.courses.service.CourseFilterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/courses/filter")
@Slf4j
public class FilterController {

    @Autowired
    private CourseFilterService courseFilterService;

    @GetMapping("/byRating/{rid}")
    public @ResponseBody
    Iterable<FilteredCourseDetails> getAllCourseHistory(@PathVariable("rid") long rating) {
        log.info("Inside find all previous registered courses history");
        return courseFilterService.getCourseFilterByRating(rating);
    }
}
