package com.unitbv.school_management_system.services;

import com.unitbv.school_management_system.entities.Course;
import com.unitbv.school_management_system.repositories.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course createCourse(Course course, Integer teacherId) {
        course.setTeacherId(teacherId);

        return courseRepository.save(course);
    }

    public Course getCourse(Integer courseId) {
        return courseRepository.findById(courseId).orElseThrow(() -> new IllegalArgumentException(String.format("Course with ID %s doesn't exist", courseId)));
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course updateCourse(Integer courseId, Course course) {
        Course courseToUpdate = courseRepository.findById(courseId).orElseThrow(() -> new IllegalStateException(String.format("Course with ID %s doesn't exist", courseId)));

        courseToUpdate.setCourseName(course.getCourseName());
        courseToUpdate.setTeacherId(course.getTeacherId());
        courseToUpdate.setUpdatedAt(course.getUpdatedAt());


        return courseRepository.save(courseToUpdate);
    }

    public void deleteCourse(Integer courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new IllegalStateException(String.format("Course with ID %s doesn't exist", courseId));
        }
        courseRepository.deleteById(courseId);
    }

    public List<Course> getTeacherCourses(Integer teacherId) {
        return courseRepository.getAllByTeacherId(teacherId);
    }
}