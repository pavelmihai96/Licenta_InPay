package com.unitbv.in_pay.request;

import com.unitbv.in_pay.entities.Subscription;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IndexRequest {

    private Integer subscriptionId;

    private Integer readingValue;

    private java.sql.Timestamp createdAt;
}
