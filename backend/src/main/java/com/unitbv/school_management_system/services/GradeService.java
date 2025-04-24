package com.unitbv.school_management_system.services;

import com.unitbv.school_management_system.entities.Grade;
import com.unitbv.school_management_system.repositories.GradeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService {

    private final GradeRepository gradeRepository;

    public GradeService(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    public Grade createGrade(Grade grade) {
        return gradeRepository.save(grade);
    }


    public Grade getGrade(Integer gradeId) {
        return gradeRepository.findById(gradeId).orElseThrow(() -> new IllegalArgumentException(String.format("Grade with ID %s doesn't exist", gradeId)));
    }

    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    public Grade updateGrade(Integer gradeId, Grade grade) {
        Grade gradeToUpdate = gradeRepository.findById(gradeId).orElseThrow(() -> new IllegalStateException(String.format("Grade with ID %s doesn't exist", gradeId)));

        gradeToUpdate.setScore(grade.getScore());
        gradeToUpdate.setUpdatedAt(grade.getUpdatedAt());

        return gradeRepository.save(gradeToUpdate);
    }


    public void deleteGrade(Integer gradeId) {
        if (!gradeRepository.existsById(gradeId)) {
            throw new IllegalStateException(String.format("Grade with ID %s doesn't exist", gradeId));
        }
        gradeRepository.deleteById(gradeId);
    }

    public Grade getGradeByAssignmentAndStudent(Integer assignmentId, Integer studentId) {
        return gradeRepository.findGradeByAssignmentIdAndStudentId(assignmentId, studentId);
    }



}
