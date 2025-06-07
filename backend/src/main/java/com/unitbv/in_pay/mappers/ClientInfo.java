package com.unitbv.in_pay.mappers;

import com.unitbv.in_pay.entities.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientInfo {
    private Integer id;

    private Integer clientId;

    private String email;

    private String name;

    public String type;
}
