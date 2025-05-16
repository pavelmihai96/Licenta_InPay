package com.unitbv.in_pay.request;

import com.unitbv.in_pay.entities.Facility;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacilityRequest {

    private Integer providerId;

    private String facilityName;

    public Facility.Type type;

    private java.sql.Timestamp createdAt;
}
