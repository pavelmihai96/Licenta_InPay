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
    @Column(name = "provider_id")
    private Integer providerId;

    @Column(nullable = false)
    private Integer contractId;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String serviceArea;

    @Column(nullable = false)
    private String facilityName;

    @Enumerated(EnumType.STRING)
    public Provider.Type type;

    @Column(nullable = false)
    private Double price;

    @Column
    private String wifi;

    @Column
    private String hdd;

    @Column
    private String parental;

    @Column
    private String phone;

    @Column
    private String signal;

    @Column
    private String discount;

    @Column
    private String pump;

    @Column
    private String bolt;

    @Column(nullable = false)
    private java.sql.Timestamp createdAt;

    public enum Type {
        GAS, ELECTRICITY, INTERNET, MOBILE
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }
}
