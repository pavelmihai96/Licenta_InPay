package com.unitbv.in_pay.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // auto-generates the primary key
    public Integer user_id;

    @Column(unique = true, nullable = false)
    public String email;

    @Column(unique = true, nullable = false)
    public String username;

    @Column(nullable = false)
    public String password;

    @Column(length = 2000)
    public String token;

    @Enumerated(EnumType.STRING)
    public Role role;

    @Column(nullable = false, updatable = false)
    public java.sql.Timestamp createdAt;

    public enum Role {
        CONSUMER, PROVIDER
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }
}
