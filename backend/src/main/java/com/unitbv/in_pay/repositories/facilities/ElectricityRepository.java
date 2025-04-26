package com.unitbv.in_pay.repositories.facilities;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.facilities.Electricity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectricityRepository extends JpaRepository<Electricity, Integer> {
    boolean existsByFacility(Facility facility);

    @Query("select e from Electricity e where e.facility.facilityId = ?1")
    Electricity findElectricityByFacilityId(Integer facilityId);
}
