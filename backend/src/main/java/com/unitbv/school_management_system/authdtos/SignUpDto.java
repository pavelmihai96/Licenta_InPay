package com.unitbv.school_management_system.authdtos;

import com.unitbv.school_management_system.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpDto {

    public String username;
    public String email;
    public Role role;
    public String token;
    public java.sql.Timestamp createdAt;
    public char[] password;

    public enum Role {
        TEACHER, STUDENT
    }

}
