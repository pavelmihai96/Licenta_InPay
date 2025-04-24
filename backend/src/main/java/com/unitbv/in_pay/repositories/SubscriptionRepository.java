package com.unitbv.in_pay.repositories;

import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {
    @Query("select s from Subscription s where s.consumer.consumerId = ?1")
    List<Subscription> getAllByConsumerId(Integer consumerId);
}
