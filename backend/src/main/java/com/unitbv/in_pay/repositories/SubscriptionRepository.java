package com.unitbv.in_pay.repositories;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.Subscription;
import com.unitbv.in_pay.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {
    @Query("select s from Subscription s where s.consumer.consumerId = ?1")
    List<Subscription> getAllByConsumerId(Integer consumerId);

    @Query("select s from Subscription s where s.consumer.consumerId = ?1 and s.facility.facilityId = ?2")
    Subscription getSubscriptionByConsumerIdAndFacilityId(Integer consumerId, Integer facilityId);

    @Query("select s from Subscription s where s.facility.facilityId = ?1")
    List<Subscription> getSubscriptionsByFacilityId(Integer facilityId);

    @Query("select s from Subscription s JOIN Facility f ON s.facility.facilityId = f.facilityId WHERE f.provider.providerId = ?1")
    List<Subscription> getSubscriptionsByProviderId(Integer providerId);

    boolean existsByConsumerAndFacility(Consumer consumer, Facility facility);
}
