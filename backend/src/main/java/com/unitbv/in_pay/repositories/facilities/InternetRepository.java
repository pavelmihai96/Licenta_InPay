package com.unitbv.in_pay.repositories.facilities;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.facilities.Gas;
import com.unitbv.in_pay.entities.facilities.Internet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InternetRepository extends JpaRepository<Internet, Integer> {
    boolean existsByFacility(Facility facility);

    @Query("select i from Internet i where i.facility.facilityId = ?1")
    Internet findInternetByFacilityId(Integer facilityId);
}
