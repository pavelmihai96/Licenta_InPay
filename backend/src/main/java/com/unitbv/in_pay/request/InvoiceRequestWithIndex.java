package com.unitbv.in_pay.request;

import com.unitbv.in_pay.entities.Invoice;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceRequestWithIndex {

    private Integer subscriptionId;

    private Integer startId;

    private Integer endId;

    private Double amount;

    private Invoice.Status status;

    private java.sql.Timestamp createdAt;
}
