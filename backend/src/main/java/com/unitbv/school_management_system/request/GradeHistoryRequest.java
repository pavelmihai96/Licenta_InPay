package com.unitbv.school_management_system.request;

import com.unitbv.school_management_system.entities.Grade;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GradeHistoryRequest {

    private Integer gradeId;

    private Double oldScore;

    private Double newScore;

    private java.sql.Timestamp changedAt;
}
