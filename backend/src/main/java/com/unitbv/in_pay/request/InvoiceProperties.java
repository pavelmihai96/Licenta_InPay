package com.unitbv.in_pay.request;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class InvoiceProperties {
    private String fileName;
    private Long creationTime;
}
