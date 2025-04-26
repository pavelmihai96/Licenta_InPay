package com.unitbv.in_pay.request.facilities;

import com.unitbv.in_pay.entities.Facility;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GasRequest {
    private Integer facilityId;

    private Double price;
}
