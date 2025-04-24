package com.unitbv.in_pay.entities.Facilities;

import com.unitbv.in_pay.entities.Facility;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "mobileservice_entries")
public class MobileService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mobileservice_id")
    private Integer mobileserviceId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "facility_id", referencedColumnName = "facility_id")
    private Facility facility;

    @Column(nullable = false)
    private Double price;
}
