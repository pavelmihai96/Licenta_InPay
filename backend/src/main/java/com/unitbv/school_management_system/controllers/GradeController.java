package com.unitbv.school_management_system.controllers;

import com.unitbv.school_management_system.entities.Grade;
import com.unitbv.school_management_system.services.GradeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/grade")
public class GradeController {

    private final GradeService gradeService;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @PostMapping
    public Grade addGrade(@RequestBody Grade grade) {
        return gradeService.createGrade(grade);
    }


    @GetMapping("/{gradeId}")
    public Grade getGrade(@PathVariable Integer gradeId) {
        return gradeService.getGrade(gradeId);
    }

    @GetMapping
    public List<Grade> getGrades() {
        return gradeService.getAllGrades();
    }

    @PutMapping("/{gradeId}")
    public Grade updateGrade(@PathVariable Integer gradeId, @RequestBody Grade grade) {
        return gradeService.updateGrade(gradeId, grade);
    }

    @DeleteMapping("/{gradeId}")
    public void deleteGrade(@PathVariable Integer gradeId) {
        gradeService.deleteGrade(gradeId);
    }

    @GetMapping("/{assignmentId}/{studentId}")
    public Grade getGradeByAssignmentAndStudent(@PathVariable Integer assignmentId, @PathVariable Integer studentId) {
        return gradeService.getGradeByAssignmentAndStudent(assignmentId, studentId);
    }


}
