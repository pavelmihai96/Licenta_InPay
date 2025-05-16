package com.unitbv.in_pay.request;

import com.unitbv.in_pay.entities.Invoice;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceRequestNoIndex {

    private Integer subscriptionId;

    private Double amount;

    private Invoice.Status status;

    private java.sql.Timestamp createdAt;
}
