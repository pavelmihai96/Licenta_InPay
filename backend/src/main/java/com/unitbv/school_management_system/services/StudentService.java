package com.unitbv.school_management_system.services;

import com.unitbv.school_management_system.entities.Student;
import com.unitbv.school_management_system.entities.User;
import com.unitbv.school_management_system.repositories.StudentRepository;
import com.unitbv.school_management_system.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    private final UserRepository userRepository;

    public StudentService(StudentRepository studentRepository,
                          UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    public Student createStudent(Student student, Integer userId) {
        student.setUserId(userId);

        return studentRepository.save(student);
    }

    public Student getStudent(Integer studentId) {
        return studentRepository.findStudentByUserId(studentId);
    }

    public Student getStudentByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return studentRepository.findByUserId(user.getUserId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student updateStudent(Integer studentId, Student student) {
        Student studentToUpdate = studentRepository.findById(studentId).orElseThrow(() -> new IllegalStateException(String.format("Student with ID %s doesn't exist", studentId)));

        studentToUpdate.setUserId(student.getUserId());
        studentToUpdate.setFirstName(student.getFirstName());
        studentToUpdate.setLastName(student.getLastName());
        studentToUpdate.setUpdatedAt(student.getUpdatedAt());

        return studentRepository.save(studentToUpdate);
    }

    public void deleteStudent(Integer studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new IllegalStateException(String.format("Student with ID %s doesn't exist", studentId));
        }
        studentRepository.deleteById(studentId);
    }
}
