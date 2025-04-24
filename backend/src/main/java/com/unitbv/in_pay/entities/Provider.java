package com.unitbv.in_pay.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "providers")
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer provider_id;

    @Column(nullable = false)
    private String company_name;

    @Column(nullable = false)
    private java.sql.Timestamp created_at;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @PrePersist
    protected void onCreate() {
        this.created_at = new Timestamp(System.currentTimeMillis());
    }
}
