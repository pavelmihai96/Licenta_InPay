package com.unitbv.school_management_system.services;

import com.unitbv.school_management_system.entities.Teacher;
import com.unitbv.school_management_system.repositories.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public Teacher createTeacher(Teacher teacher, Integer userId) {
        teacher.setUserId(userId);

        return teacherRepository.save(teacher);
    }

    public Teacher getTeacher(Integer teacherId) {
        return teacherRepository.findTeacherByUserId(teacherId);
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher updateTeacher(Integer teacherId, Teacher teacher) {
        Teacher teacherToUpdate = teacherRepository.findById(teacherId).orElseThrow(() -> new IllegalStateException(String.format("Teacher with ID %s doesn't exist", teacherId)));

        teacherToUpdate.setUserId(teacher.getUserId());
        teacherToUpdate.setFirstName(teacher.getFirstName());
        teacherToUpdate.setLastName(teacher.getLastName());
        teacherToUpdate.setUpdatedAt(teacher.getUpdatedAt());

        return teacherRepository.save(teacherToUpdate);
    }

    public void deleteTeacher(Integer teacherId) {
        if (!teacherRepository.existsById(teacherId)) {
            throw new IllegalStateException(String.format("Teacher with ID %s doesn't exist", teacherId));
        }
        teacherRepository.deleteById(teacherId);
    }
}
