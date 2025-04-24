package com.unitbv.in_pay.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollmentRequest {

    private Integer studentId;

    private Integer courseId;

    private java.sql.Timestamp createdAt;
}
