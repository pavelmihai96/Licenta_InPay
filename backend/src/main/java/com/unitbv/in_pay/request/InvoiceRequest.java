package com.unitbv.in_pay.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceRequest {
    private Long amount;
    private Long quantity;
    private String name;
    private String currency;
    private Integer invoiceId;
}
