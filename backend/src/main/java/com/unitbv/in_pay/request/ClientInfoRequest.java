package com.unitbv.in_pay.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientInfoRequest {
    private Integer clientId;

    private String email;
}
