package com.unitbv.in_pay.request;

import com.unitbv.in_pay.entities.Subscription;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionRequest {

    private Integer consumerId;

    private Integer providerId;

    private Integer contractId;

    private Integer clientId;

    private Subscription.Status status;

    private java.sql.Timestamp createdAt;
}
