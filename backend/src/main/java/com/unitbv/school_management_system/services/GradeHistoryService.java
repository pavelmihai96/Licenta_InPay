package com.unitbv.school_management_system.services;


import com.unitbv.school_management_system.entities.Grade;
import com.unitbv.school_management_system.entities.GradeHistory;
import com.unitbv.school_management_system.repositories.GradeHistoryRepository;
import com.unitbv.school_management_system.repositories.GradeRepository;
import com.unitbv.school_management_system.request.GradeHistoryRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeHistoryService {

    private final GradeHistoryRepository gradeHistoryRepository;

    private final GradeRepository gradeRepository;

    public GradeHistoryService(GradeHistoryRepository gradeHistoryRepository,
                               GradeRepository gradeRepository) {
        this.gradeHistoryRepository = gradeHistoryRepository;
        this.gradeRepository = gradeRepository;
    }

    public GradeHistory createGradeHistory(GradeHistoryRequest request) {
        Grade grade = gradeRepository.findById(request.getGradeId())
                .orElseThrow(() -> new RuntimeException("This grade doesn't exist!"));

        GradeHistory gradeHistory = new GradeHistory();
        gradeHistory.setGrade(grade);
        gradeHistory.setOldScore(request.getOldScore());
        gradeHistory.setNewScore(request.getNewScore());
        gradeHistory.setChangedAt(request.getChangedAt());

        return gradeHistoryRepository.save(gradeHistory);
    }

    public GradeHistory getGradeHistory(Integer gradeHistoryId) {
        return gradeHistoryRepository.findById(gradeHistoryId).orElseThrow(() -> new IllegalArgumentException(String.format("GradeHistory with ID %s doesn't exist", gradeHistoryId)));
    }

    public List<GradeHistory> getAllGradeHistories() {
        return gradeHistoryRepository.findAll();
    }

    public GradeHistory updateGradeHistory(Integer gradeHistoryId, GradeHistory gradeHistory) {
        GradeHistory gradeHistoryToUpdate = gradeHistoryRepository.findById(gradeHistoryId).orElseThrow(() -> new IllegalStateException(String.format("GradeHistory with ID %s doesn't exist", gradeHistoryId)));

        gradeHistoryToUpdate.setOldScore(gradeHistory.getOldScore());
        gradeHistoryToUpdate.setNewScore(gradeHistory.getNewScore());
        gradeHistoryToUpdate.setChangedAt(gradeHistory.getChangedAt());

        return gradeHistoryRepository.save(gradeHistoryToUpdate);
    }

    public void deleteGradeHistory(Integer gradeHistoryId) {
        if (!gradeHistoryRepository.existsById(gradeHistoryId)) {
            throw new IllegalStateException(String.format("GradeHistory with ID %s doesn't exist", gradeHistoryId));
        }
        gradeHistoryRepository.deleteById(gradeHistoryId);
    }

    public List<GradeHistory> getAllGradeHistoriesByAssignmentAndStudent(Integer assignmentId, Integer studentId) {
        return gradeHistoryRepository.findByGrade_AssignmentIdAndGrade_StudentId(assignmentId, studentId);
    }
}


