package com.unitbv.in_pay.entities.Facilities;

import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.Provider;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "gas_entries")
public class Gas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gas_id")
    private Integer gasId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "facility_id", referencedColumnName = "facility_id")
    private Facility facility;

    @Column(nullable = false)
    private Double pricePerKwh;
}
