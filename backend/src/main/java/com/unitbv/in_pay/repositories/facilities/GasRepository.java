package com.unitbv.in_pay.repositories.facilities;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.facilities.Electricity;
import com.unitbv.in_pay.entities.facilities.Gas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GasRepository extends JpaRepository<Gas, Integer> {
    boolean existsByFacility(Facility facility);

    @Query("select g from Gas g where g.facility.facilityId = ?1")
    Gas findGasByFacilityId(Integer facilityId);
}
