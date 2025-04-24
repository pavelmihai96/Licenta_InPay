package com.unitbv.in_pay.request;

import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsumerRequest {

    private Integer userId;

    private String firstName;

    private String lastName;

    private String address;

    private java.sql.Timestamp createdAt;
}
