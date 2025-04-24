package com.unitbv.in_pay.entities.facilities;

import com.unitbv.in_pay.entities.Facility;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "electricity_entries")
public class Electricity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "electricity_id")
    private Integer electricityId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "facility_id", referencedColumnName = "facility_id")
    private Facility facility;

    @Column(nullable = false)
    private Double pricePerKwh;
}
