package com.user.demo.controller;

import com.user.demo.entity.Student;
import com.user.demo.repository.StudentRepository;
import com.user.demo.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/users")
@Slf4j
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentRepository studentRepository;


    @GetMapping("/maxStudID")
    @ResponseBody
    public long findMaxStudID() {
        log.info("Inside findMaxStudID controller");
        return studentService.findMaxStudID();
    }
    //get user details
    @GetMapping("/byId/{id}")
    @ResponseBody
    public Student findStudentById(@PathVariable("id") long studentId) {
        log.info("Inside findUserById controller");
        return studentService.findStudentById(studentId);
    }

    //get user details for login
    @GetMapping("/byUsername/{emailId}")
    public long findStudentByUsername(@PathVariable("emailId") String emailId) {
        log.info("Inside findUserByUsername controller");
        return studentService.findStudentByUsername(emailId);
    }

    @GetMapping("/namebyEmail/{emailId}")
    public String findStudentNameByUsername(@PathVariable("emailId") String emailId) {
        log.info("Inside findUserNameByUsername controller");
        return studentService.findStudentNameByUsername(emailId);
    }

    @GetMapping("/all")
    public @ResponseBody
    Iterable<Student> getAllUsers() {
        log.info("Inside find all controller");
        return studentRepository.findAll();
    }

    //add new user
    @PostMapping("/new")
    public Boolean saveStudent(@RequestBody Student student) {
        log.info("Inside saveStudent controller");
        log.info("Inside saveStudent controller"+student.getEmailId());
        //studentService.findStudentByEmail(student.getEmailId());
        return studentService.saveStudent(student);
    }

    @PutMapping("/update/{id}")
    public Boolean updateStudent(@PathVariable("id") long studentId, @RequestBody Student student){
        log.info("Inside updateStudent controller");
        Student currentStudent = studentService.findStudentById(studentId);
        currentStudent.setAddress(student.getAddress());
        currentStudent.setEmailId(student.getEmailId());
        currentStudent.setFirstName(student.getFirstName());
        currentStudent.setLastName(student.getLastName());
        currentStudent.setSemester(student.getSemester());
        currentStudent.setPhoneNumber(student.getPhoneNumber());
        return studentService.updateStudent(currentStudent);
    }

    //delete a student
    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable("id") long studentId){
         studentService.deleteById(studentId);

    }


}
