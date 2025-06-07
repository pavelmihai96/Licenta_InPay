package com.unitbv.in_pay.request;

import com.unitbv.in_pay.entities.Provider;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderRequest {

    private Integer contractId;

    private String companyName;

    private String serviceArea;

    private String facilityName;

    public Provider.Type type;

    private Double price;

    private java.sql.Timestamp createdAt;
}
