package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    List<Course> getAllByTeacherId(Integer teacherId);

}
