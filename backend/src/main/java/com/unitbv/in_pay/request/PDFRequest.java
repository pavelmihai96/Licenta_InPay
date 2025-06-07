package com.unitbv.in_pay.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PDFRequest {
    private Integer idFromProvider;
    private String invoiceName;
}
