package com.unitbv.in_pay.repositories;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FacilityRepository extends JpaRepository<Facility, Integer> {
    @Query("select f from Facility f where f.provider.providerId = ?1")
    List<Facility> getAllByProviderId(Integer providerId);
}
