package com.unitbv.in_pay.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private Integer invoiceId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "subscription_id", referencedColumnName = "subscription_id")
    private Subscription subscription;

    @Column(nullable = false)
    private Integer idFromProvider;

    @Column(nullable = false)
    private Integer clientId;

    @Column(nullable = false)
    private String clientName;

    @Column(nullable = false)
    private String clientAddress;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDate issueDate;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private String period;

    @Column(nullable = false)
    private String invoiceName;

    @Column(nullable = false)
    private String providerInfo;

    @Column
    private String kwHConsumed;

    @Enumerated(EnumType.STRING)
    private Invoice.Status status;

    @Column(nullable = false)
    private java.sql.Timestamp createdAt;

    public enum Status {
        UNPAID, PAID
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }
}
