package com.unitbv.school_management_system.controllers;

import com.unitbv.school_management_system.entities.Enrollment;
import com.unitbv.school_management_system.entities.Student;
import com.unitbv.school_management_system.request.EnrollmentRequest;
import com.unitbv.school_management_system.services.EnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/enrollment")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    public Enrollment addEnrollment(@RequestBody EnrollmentRequest request) {
        return enrollmentService.createEnrollment(request);
    }

    @GetMapping("/{enrollmentId}")
    public Enrollment getEnrollment(@PathVariable Integer enrollmentId) {
        return enrollmentService.getEnrollment(enrollmentId);
    }

    @GetMapping("/all/{courseId}")
    public List<Enrollment> getStudentsFromEnrollment(@PathVariable Integer courseId) {
        return enrollmentService.getEnrollments(courseId);
    }

    @GetMapping("/student/{studentId}")
    public List<Enrollment> getEnrollmentsforStudent(@PathVariable Integer studentId) {
        return enrollmentService.getStudentEnrollments(studentId);
    }

    @GetMapping
    public List<Enrollment> getEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

//    @PutMapping("/{enrollmentId}")
//    public Enrollment updateEnrollment(@PathVariable Integer enrollmentId, @RequestBody Enrollment enrollment) {
//        return enrollmentService.updateEnrollment(enrollmentId, enrollment);
//    }

    @DeleteMapping("/{enrollmentId}")
    public void deleteEnrollment(@PathVariable Integer enrollmentId) {
        enrollmentService.deleteEnrollment(enrollmentId);
    }
}
