package com.user.demo.repository;

import com.user.demo.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByStudentId(long studentId);
    void deleteById(long studentId);

    @Query(value = "select count(*) from student where email_id=?1",nativeQuery = true)
    int findStudentsByEmail(String emailId);

    @Query(value = "select student_id from student where email_id=?1",nativeQuery = true)
    long findByStudentUsername(String emailId);

    @Query(value = "SELECT CONCAT_WS(\" \", first_name, last_name) AS full_name FROM student where email_id=?1",nativeQuery = true)
    String findNameByStudentUsername(String emailId);

    @Query(value = "SELECT MAX(student_id)+1 FROM student", nativeQuery = true)
    long findMaxStudID();
}
