package com.unitbv.in_pay.authdtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpDto {

    public String email;
    public Role role;
    public String token;
    public java.sql.Timestamp createdAt;
    public char[] password;

    public enum Role {
        CONSUMER, ADMIN
    }

}
