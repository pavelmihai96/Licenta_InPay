package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.Grade;
import com.unitbv.school_management_system.entities.GradeHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import  java.util.List;


public interface GradeHistoryRepository extends JpaRepository<GradeHistory, Integer> {

    List<GradeHistory> findByGrade_AssignmentIdAndGrade_StudentId(Integer assignmentId, Integer studentId);

    List<GradeHistory> findByGrade_StudentId(Integer studentId);
}
