package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {

    List<Assignment> findAllByCourseId(Integer courseId);

    boolean existsByCourseIdAndAssignmentName(Integer courseId, String assignmentName);
}
