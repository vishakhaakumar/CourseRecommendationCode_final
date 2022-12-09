package com.example.courses.controller;

import com.example.courses.entity.*;
import com.example.courses.repository.CourseHistoryRepository;
import com.example.courses.repository.CourseRegRepository;
import com.example.courses.repository.CourseRepository;
import com.example.courses.service.CourseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/courses")
@Slf4j
public class CourseController {

    @Autowired
    private CourseService courseService;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseRegRepository courseRegRepository;
    @Autowired
    private CourseHistoryRepository courseHistoryRepository;

    //get user details
    @GetMapping("/byId/{id}")
    @ResponseBody
    public CourseDets findCourseById(@PathVariable("id") long courseId) {
        log.info("Inside findCourseById controller"+courseId);
        return courseService.findCourseDetsById(courseId);
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<CourseDets> getAllCourses() {
        log.info("Inside find all controller");
        return courseService.findCourseDetails();
    }

    @GetMapping("/available/all/{id}")
    public @ResponseBody Iterable<CourseDets> getAllAvailableCourses() {
        log.info("Inside find all available controller");
        return courseService.findAvailableCourseDetails();
    }

    @GetMapping("/studDets/course/{id}")
    public @ResponseBody Iterable<StudentDets> getStudDetails(@PathVariable("id") long courseId) {
        log.info("Inside find StudDetails controller");
        return courseService.getStudDetails(courseId);
    }

    //add new user
    @PostMapping("/")
    public Course saveCourse(@RequestBody Course course) {
        log.info("Inside saveCourse controller");
        return courseService.saveCourse(course);
    }

    @PutMapping("/update/{id}")
    public Course updateStudent(@PathVariable("id") long courseId, @RequestBody Course course){
        Course currentCourse = courseService.findCourseById(courseId);
        log.info("data found here");
        currentCourse.setCourseName(course.getCourseName());
        currentCourse.setDescription(course.getDescription());
        currentCourse.setPreRequisites(course.getPreRequisites());
        currentCourse.setProfessorName(course.getProfessorName());
        return courseService.saveCourse(currentCourse);
}

    //delete a course
    @DeleteMapping("/delete/{id}")
    public void deleteCourse(@PathVariable("id") long courseId){
         courseService.deleteById(courseId);
    }

    // ------------------------ courses registered ------------------------
    //get all registered courses
    @GetMapping("/reg/all/{sid}")
    public @ResponseBody Iterable<CourseReg> getAllCoursesRegistered(@PathVariable("sid") long studentId) {
        log.info("Inside find all registered courses controller");
        return courseRegRepository.findAllCoursesRegistered(studentId);
    }

    @GetMapping("/reg/all/number/{sid}")
    public long getAllCoursesRegisteredNumber(@PathVariable("sid") long studentId) {
        log.info("Inside find number of all registered courses controller");
        return courseRegRepository.findAllCount(studentId);
    }

    //get particular registered course
    @GetMapping("/reg/student/{sid}/course/{cid}")
    public @ResponseBody boolean getCoursesRegisteredById
        (@PathVariable("sid") long studentId, @PathVariable("cid") long courseId) {
        log.info("Inside find registered courses by ID controller");
        return courseService.findRegCourseById(studentId, courseId);
    }

    //add a course to register
    @PostMapping("/reg/")
    public CourseReg addCourseReg(@RequestBody CourseReg coursereg) {
        log.info("Inside saveCourseReg controller");
        return courseService.saveCourseReg(coursereg);
    }

    //remove the registered course
    @DeleteMapping("/reg/delete/student/{sid}/course/{cid}")
    public void deleteCourseReg(@PathVariable("sid") long studentId, @PathVariable("cid") long courseId){
        log.info("Inside delete the registered courses");
        courseService.deleteByIdReg(studentId,courseId);
    }

    //------------------------------ get all previous course history ----------------
    @GetMapping("/history/{sid}/all")
    public @ResponseBody Iterable<CourseHistoryData> getAllCourseHistory(@PathVariable("sid") long studentId) {
        log.info("Inside find all previous registered courses history");
        return courseService.findHistory(studentId);
    }

    //get particular previously registered course
    @GetMapping("/history/student/{sid}/course/{cid}")
    public @ResponseBody boolean getCoursesHistoryById
    (@PathVariable("sid") long studentId, @PathVariable("cid") long courseId) {
        log.info("Inside find previous history of courses by ID");
        return courseService.findHistoryCourseById(studentId, courseId);
    }
    //------------------------------ get all previous course feedback ----------------

    @GetMapping("/feedback/student/{sid}/course/{cid}")
    public @ResponseBody CourseFeedback getAllCourseHistory(@PathVariable("sid") long studentId, @PathVariable("cid") long courseId) {
        log.info("Inside find all previous registered courses history");
        return courseService.getFeedback(studentId, courseId);
    }

    /*@PutMapping("/feedback/update/student/{sid}/course/{cid}")
    public CourseFeedback updateFeedback(@PathVariable("sid") long studentId, @PathVariable("cid") long courseId,
                                         @RequestBody CourseFeedback coursefeedback){
        CourseFeedback currentFeedback = courseService.getFeedback(studentId, courseId);
        log.info("data found here");
        currentFeedback.setRating(coursefeedback.getRating());
        currentFeedback.setJobRole(coursefeedback.getJobRole());
        currentFeedback.setWorkload(coursefeedback.getWorkload());
        return courseService.saveCourseFeedback(currentFeedback);
    }*/

    @PostMapping("/feedback/new")
    public Boolean saveCourse(@RequestBody CourseFeedbackData courseFeedbackData) {
        log.info("Inside saveCourseFeedback controller");
        return courseService.saveCourseFeedback(courseFeedbackData);
    }
}
