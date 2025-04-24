package com.unitbv.school_management_system.services;

import com.unitbv.school_management_system.entities.*;
import com.unitbv.school_management_system.repositories.*;
import com.unitbv.school_management_system.request.EnrollmentRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    private final CourseRepository courseRepository;

    private final StudentRepository studentRepository;

    private final GradeHistoryRepository gradeHistoryRepository;

    private final GradeRepository gradeRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                             CourseRepository courseRepository,
                             StudentRepository studentRepository,
                             GradeHistoryRepository gradeHistoryRepository,
                             GradeRepository gradeRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
        this.gradeHistoryRepository = gradeHistoryRepository;
        this.gradeRepository = gradeRepository;
    }

    public Enrollment createEnrollment(EnrollmentRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("This course doesn't exist"));

        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("This student doesn't exist"));

        boolean isAlreadyEnrolled = enrollmentRepository.existsByStudentAndCourse(student, course);
        if (isAlreadyEnrolled) {
            throw new RuntimeException("This student is already enrolled in the course.");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setCourse(course);
        enrollment.setStudent(student);
        enrollment.setCreatedAt(request.getCreatedAt());

        return enrollmentRepository.save(enrollment);
    }

    public Enrollment getEnrollment(Integer enrollmentId) {
        return enrollmentRepository.findById(enrollmentId).orElseThrow(() -> new IllegalArgumentException(String.format("Enrollment with ID %s doesn't exist", enrollmentId)));
    }

    public List<Enrollment> getEnrollments(Integer courseId) {
        return enrollmentRepository.findAllByCourse_CourseId(courseId);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

//    public Enrollment updateEnrollment(Integer enrollmentId, Enrollment enrollment) {
//        Enrollment enrollmentToUpdate = enrollmentRepository.findById(enrollmentId).orElseThrow(() -> new IllegalStateException(String.format("Enrollment with ID %s doesn't exist", enrollmentId)));
//
//        enrollmentToUpdate.setStudentId(enrollment.getStudentId());
//        enrollmentToUpdate.setCourseId(enrollment.getCourseId());
//        enrollmentToUpdate.setUpdatedAt(enrollment.getUpdatedAt());
//
//
//        return enrollmentRepository.save(enrollmentToUpdate);
//    }

    public void deleteEnrollment(Integer enrollmentId) {
        if (!enrollmentRepository.existsById(enrollmentId)) {
            throw new IllegalStateException(String.format("Enrollment with ID %s doesn't exist", enrollmentId));
        }

        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new IllegalStateException("Enrollment not found"));

        Integer studentId = enrollment.getStudent().getStudentId();

        deleteGradeHistories(studentId);

        deleteGrades(studentId);

        enrollmentRepository.deleteById(enrollmentId);
    }

    public void deleteGradeHistories(Integer studentId) {
        List<GradeHistory> gradeHistories = gradeHistoryRepository.findByGrade_StudentId(studentId);

        if (!gradeHistories.isEmpty()) {
            gradeHistoryRepository.deleteAll(gradeHistories);
        }
    }

    public void deleteGrades(Integer studentId) {
        List<Grade> grades = gradeRepository.findByStudentId(studentId);

        if (!grades.isEmpty()) {
            gradeRepository.deleteAll(grades);
        }
    }

    public List<Enrollment> getStudentEnrollments(Integer studentId) {
        return enrollmentRepository.findByStudent_StudentId(studentId);
    }

}
