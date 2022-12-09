package com.example.courses.service;

import com.example.courses.entity.*;
import com.example.courses.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@Slf4j
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseRegRepository courseRegRepository;
    @Autowired
    private CourseDetsRepository courseDetsRepository;
    @Autowired
    private CourseHistoryRepository courseHistoryRepository;
    @Autowired
    private CourseFeedbackRepository courseFeedbackRepository;
    @Autowired
    private StudentDetsRepository studentDetsRepository;

    public void deleteById(long courseId) {
        courseRepository.deleteById(courseId);
    }

    public Course findCourseById(long courseId) {
        log.info("Inside findCourseById Service");
        return courseRepository.findByCourseId(courseId);
    }

    public CourseDets findCourseDetsById(long courseId) {
        log.info("Inside findCourseDetsById Service");
        return courseDetsRepository.findByCourseDetailsId(courseId);
    }

    // get all courses with rating, workload details
    public Iterable<CourseDets> findCourseDetails() {
        return courseDetsRepository.findCourseDetails();
    }

    public Iterable<CourseDets> findAvailableCourseDetails() {
        return courseDetsRepository.findAvailableCourseDetails();
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    // ------------------------------ add/del registered courses ------------------------------
    public CourseReg saveCourseReg(CourseReg courseReg) {
        return courseRegRepository.save(courseReg);
    }

    public void deleteByIdReg(long studentId, long courseId) {
        courseRegRepository.deleteById(courseId);
        courseRegRepository.deleteByStudentId(studentId,courseId);
    }

    //get registered course by ID
    public boolean findRegCourseById(long studentId, long courseId) {
        log.info("find if the course is already registered");
        int val = courseRegRepository.findCourseById(studentId, courseId);
        if (val>0){ return true; }
        else{ return false; }
    }

    public boolean findHistoryCourseById(long studentId, long courseId) {
        log.info("find if the course is already taken in previous semester");
        int val = courseHistoryRepository.findCourseHistoryById(studentId, courseId);
        if (val>0){ return true; }
        else{ return false; }
    }

    public Iterable<CourseHistoryData> findHistory(long studentId) {
        log.info("student id: "+studentId);
        Iterable<CourseHistory> courseHistory = courseHistoryRepository.findHistory(studentId);
        Iterator<CourseHistory> itr=courseHistory.iterator();

        List<CourseHistoryData> list = new ArrayList <>();

        while(itr.hasNext())
        {
            CourseHistory courseHist = itr.next();
            CourseHistoryData courseHistoryData = new CourseHistoryData();

            courseHistoryData.setCourseId(courseHist.getHistoryId().getCourseId());
            courseHistoryData.setStudentId(courseHist.getHistoryId().getStudentId());
            courseHistoryData.setSemester(courseHist.getHistoryId().getSemester());

            courseHistoryData.setDescription(courseHist.getDescription());
            courseHistoryData.setCourseName(courseHist.getCourseName());

            System.out.print("age:"+courseHist.getHistoryId().getCourseId());
            list.add(courseHistoryData);
        }
        return list;
    }

    //--------------------------------------- feedback -------------------------------
    public CourseFeedback getFeedback(long studentId, long courseId) {
        return courseFeedbackRepository.getFeedback(studentId, courseId);
    }

    public Boolean saveCourseFeedback(CourseFeedbackData courseFeedbackData) {
        FeedbackId feedbackId = new FeedbackId(courseFeedbackData.getStudentId(), courseFeedbackData.getCourseId());
        CourseFeedback courseFeedback = new CourseFeedback(feedbackId,courseFeedbackData.getRating(),
                                            courseFeedbackData.getJobRole(),courseFeedbackData.getWorkload());
        try {
            courseFeedbackRepository.save(courseFeedback);
            log.info("Feedback saved");
            return true;
        }catch (Exception ex){
            log.info("Exception occurred");
            return false;
        }
    }

    public Iterable<StudentDets> getStudDetails(long courseId) {
        return studentDetsRepository.getStudDetails(courseId);
    }
}
