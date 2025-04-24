package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Integer> {
    Grade findGradeByAssignmentIdAndStudentId(Integer assignmentId, Integer studentId);

    List<Grade> findByStudentId(Integer studentId);
}
