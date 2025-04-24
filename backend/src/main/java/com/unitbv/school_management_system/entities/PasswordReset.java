package com.unitbv.school_management_system.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "password_resets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordReset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer resetId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(unique = true, nullable = false)
    private String resetToken;

    @Column(nullable = false)
    private java.sql.Timestamp expiresAt;

    @Column(nullable = false, updatable = false)
    private java.sql.Timestamp createdAt;
}

