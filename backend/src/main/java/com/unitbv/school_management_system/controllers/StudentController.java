package com.unitbv.school_management_system.controllers;

import com.unitbv.school_management_system.entities.Grade;
import com.unitbv.school_management_system.entities.Student;
import com.unitbv.school_management_system.services.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/{userId}")
    public Student addStudent(@RequestBody Student student, @PathVariable Integer userId) {
        return studentService.createStudent(student, userId);
    }

    @GetMapping("/{studentId}")
    public Student getStudent(@PathVariable Integer studentId) {
        return studentService.getStudent(studentId);
    }

    @GetMapping("/by/{email}")
    public Student getStudentByEmail(@PathVariable String email) {
        return studentService.getStudentByEmail(email);
    }

    @GetMapping
    public List<Student> getStudents() {
        return studentService.getAllStudents();
    }


    @PutMapping("/{studentId}")
    public Student updateStudent(@PathVariable Integer studentId, @RequestBody Student student) {
        return studentService.updateStudent(studentId, student);
    }

    @DeleteMapping("/{studentId}")
    public void deleteStudent(@PathVariable Integer studentId) {
        studentService.deleteStudent(studentId);
    }

//    @GetMapping("/course/{courseId}/student/{teacherId}")
//    public List<Student> getStudentsByCourseAndTeacher(
//            @PathVariable String courseId,
//            @PathVariable String teacherId) {
//        return studentService.getAllStudentsByCourseAndTeacher(courseId, teacherId);
//    }
}
