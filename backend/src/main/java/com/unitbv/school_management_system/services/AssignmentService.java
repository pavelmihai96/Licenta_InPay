package com.unitbv.school_management_system.services;

import com.unitbv.school_management_system.entities.Assignment;
import com.unitbv.school_management_system.repositories.AssignmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    public AssignmentService(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    public Assignment createAssignment(Assignment assignment) {
        boolean exists = assignmentRepository.existsByCourseIdAndAssignmentName(
                assignment.getCourseId(), assignment.getAssignmentName());

        if (exists) {
            throw new RuntimeException("An assignment with the same name already exists for this course.");
        }

        return assignmentRepository.save(assignment);
    }

    public Assignment getAssignment(Integer assignmentId) {
        return assignmentRepository.findById(assignmentId).orElseThrow(() -> new IllegalArgumentException(String.format("Assignment with ID %s doesn't exist", assignmentId)));
    }

    public List<Assignment> getAllAssignments(Integer courseId) {
        return assignmentRepository.findAllByCourseId(courseId);
    }

    public Assignment updateAssignment(Integer assignmentId, Assignment assignment) {
        Assignment assignmentToUpdate = assignmentRepository.findById(assignmentId).orElseThrow(() -> new IllegalStateException(String.format("Assignment with ID %s doesn't exist", assignmentId)));

        assignmentToUpdate.setAssignmentName(assignment.getAssignmentName());
        assignmentToUpdate.setCourseId(assignment.getCourseId());
        assignmentToUpdate.setUpdatedAt(assignment.getUpdatedAt());
        assignmentToUpdate.setMaxScore(assignment.getMaxScore());

        return assignmentRepository.save(assignmentToUpdate);
    }

    public void deleteAssignment(Integer assignmentId) {

        if (!assignmentRepository.existsById(assignmentId)) {
            throw new IllegalStateException(String.format("Assignment with ID %s doesn't exist", assignmentId));
        }
        assignmentRepository.deleteById(assignmentId);
    }
}
