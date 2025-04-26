package com.unitbv.in_pay.repositories.facilities;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.facilities.Internet;
import com.unitbv.in_pay.entities.facilities.MobileService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MobileServiceRepository extends JpaRepository<MobileService, Integer> {
    boolean existsByFacility(Facility facility);

    @Query("select m from MobileService m where m.facility.facilityId = ?1")
    MobileService findMobileServiceByFacilityId(Integer facilityId);
}
