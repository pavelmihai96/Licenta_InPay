package com.unitbv.in_pay.mappers;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceInfo {
    private Integer id;
    private Integer clientId;
    private String clientName;
    private String clientAddress;
    private Double amount;
    private LocalDate dueDate;
    private LocalDate issueDate;
    private String period;
    private String status;
}
