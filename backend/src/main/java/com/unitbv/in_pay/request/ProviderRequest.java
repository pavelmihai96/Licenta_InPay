package com.unitbv.in_pay.request;

import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderRequest {

    private Integer userId;

    private String companyName;

    private String serviceArea;

    private java.sql.Timestamp createdAt;
}
