package com.user.demo.service;

import com.user.demo.entity.Student;
import com.user.demo.repository.StudentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public long findMaxStudID() {
        log.info("Inside findMaxStudID Service");
        long studId = studentRepository.findMaxStudID();
        log.info("Student id is -------------------===========>> "+studId);
        return studentRepository.findMaxStudID();
    }
    public Student findStudentById(long studentId) {
        log.info("Inside findStudentById Service");
        return studentRepository.findByStudentId(studentId);
    }

    public long findStudentByUsername(String emailId) {
        log.info("Inside findStudentByUsername Service");
        try {
            return studentRepository.findByStudentUsername(emailId);
        }catch (Exception e){
            return 000000;
        }
    }

    public Boolean saveStudent(Student student) {
        int count = findStudentByEmail(student.getEmailId());
        log.info("count of students is ====> "+count);
        if(count==0){
            log.info("Student does not exist");
            try {
                studentRepository.save(student);
                log.info("Student saved");
                return true;
            }catch (Exception ex){
                log.info("Exception occurred");
                return false;
            }
        }else{
            log.info("Student already exist");
            return false;
        }
    }

    public Boolean updateStudent(Student currentStudent) {
        log.info("Inside updateStudent service");
        try {
            studentRepository.save(currentStudent);
            log.info("Student saved");
            return true;
        }catch (Exception ex){
            log.info("Exception occurred");
            return false;
    }
}

    public void deleteById(long studentId) {
        studentRepository.deleteById(studentId);
    }

    public int findStudentByEmail(String emailId) {
        return studentRepository.findStudentsByEmail(emailId);
    }

    public String findStudentNameByUsername(String emailId) {
        String name = studentRepository.findNameByStudentUsername(emailId);
        log.info("name is here ===============>"+name);
        return name;
    }
}
