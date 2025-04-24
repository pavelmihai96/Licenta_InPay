package com.unitbv.school_management_system.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "grades")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gradeId;

    @Column(name = "student_id", nullable = false)
    private Integer studentId;

    @Column(name = "assignment_id", nullable = false)
    private Integer assignmentId;

    @Column(nullable = false)
    private Double score;

    @Column(nullable = false)
    private java.sql.Timestamp gradedAt;

    private java.sql.Timestamp updatedAt;
}

