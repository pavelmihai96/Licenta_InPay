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
@Table(name = "invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private Integer invoiceId;

    /*
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "consumer_id", referencedColumnName = "consumer_id")
    private Consumer consumer;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "facility_id", referencedColumnName = "facility_id")
    private Facility facility;
     */

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "subscription_id", referencedColumnName = "subscription_id")
    private Subscription subscription;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "start_id", referencedColumnName = "index_id")
    private Index start;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "end_id", referencedColumnName = "index_id")
    private Index end;

    @Column(nullable = false)
    private Double amount;

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
