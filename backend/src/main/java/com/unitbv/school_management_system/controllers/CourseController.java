package com.unitbv.school_management_system.controllers;

import com.unitbv.school_management_system.entities.Course;
import com.unitbv.school_management_system.services.CourseService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/course")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping("/{teacherId}")
    public Course addCourse(@RequestBody Course course, @PathVariable Integer teacherId) {
        return courseService.createCourse(course, teacherId);
    }

    @GetMapping("/{courseId}")
    public Course getCourse(@PathVariable Integer courseId) {
        return courseService.getCourse(courseId);
    }

    @GetMapping
    public List<Course> getCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/all/{teacherId}")
    public List<Course> getTeacherCourses(@PathVariable Integer teacherId) {
        return courseService.getTeacherCourses(teacherId);
    }

    @PutMapping("/{courseId}")
    public Course updateCourse(@PathVariable Integer courseId, @RequestBody Course course) {
        return courseService.updateCourse(courseId, course);
    }

    @DeleteMapping("/{courseId}")
    public void deleteCourse(@PathVariable Integer courseId) {
        courseService.deleteCourse(courseId);
    }
}
