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
@Table(name = "internet_entries")
public class Internet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "internet_id")
    private Integer internetId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "facility_id", referencedColumnName = "facility_id")
    private Facility facility;

    @Column(nullable = false)
    private Double price;
}
