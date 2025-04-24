package com.unitbv.school_management_system.controllers;

import com.unitbv.school_management_system.entities.Assignment;
import com.unitbv.school_management_system.services.AssignmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/assignment")
public class AssignmentController {

    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping
    public Assignment addAssignment(@RequestBody Assignment assignment) {
        return assignmentService.createAssignment(assignment);
    }

    @GetMapping("/{assignmentId}")
    public Assignment getAssignment(@PathVariable Integer assignmentId) {
        return assignmentService.getAssignment(assignmentId);
    }

    @GetMapping("/all/{courseId}")
    public List<Assignment> getAssignments(@PathVariable Integer courseId) {
        return assignmentService.getAllAssignments(courseId);
    }

    @PutMapping("/{assignmentId}")
    public Assignment updateAssignment(@PathVariable Integer assignmentId, @RequestBody Assignment assignment) {
        return assignmentService.updateAssignment(assignmentId, assignment);
    }

    @DeleteMapping("/{assignmentId}")
    public void deleteAssignment(@PathVariable Integer assignmentId) {
        assignmentService.deleteAssignment(assignmentId);
    }
}
