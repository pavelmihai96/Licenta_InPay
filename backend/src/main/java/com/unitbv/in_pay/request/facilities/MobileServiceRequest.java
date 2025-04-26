package com.unitbv.in_pay.request.facilities;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MobileServiceRequest {
    private Integer facilityId;

    private Double price;
}
