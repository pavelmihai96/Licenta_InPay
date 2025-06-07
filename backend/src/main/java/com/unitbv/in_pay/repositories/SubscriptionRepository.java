package com.unitbv.in_pay.repositories;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Provider;
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

    @Query("select s from Subscription s where s.consumer.consumerId = ?1 and s.provider.providerId = ?2")
    Subscription getSubscriptionByConsumerIdAndProviderId(Integer consumerId, Integer providerId);

    boolean existsByProviderAndClientIdAndContractId(Provider p, Integer clientId, Integer contractId);

    Subscription getSubscriptionByClientId(Integer clientId);
}
