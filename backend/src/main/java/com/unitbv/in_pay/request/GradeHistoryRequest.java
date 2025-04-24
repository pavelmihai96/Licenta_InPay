package com.unitbv.in_pay.request;

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
