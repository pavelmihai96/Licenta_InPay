package com.unitbv.in_pay.services;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.Provider;
import com.unitbv.in_pay.entities.Subscription;
import com.unitbv.in_pay.repositories.ConsumerRepository;
import com.unitbv.in_pay.repositories.FacilityRepository;
import com.unitbv.in_pay.repositories.ProviderRepository;
import com.unitbv.in_pay.repositories.SubscriptionRepository;
import com.unitbv.in_pay.request.FacilityRequest;
import com.unitbv.in_pay.request.SubscriptionRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SubscriptionService {
    @Autowired
    private final SubscriptionRepository subscriptionRepository;

    @Autowired
    private final ConsumerRepository consumerRepository;

    @Autowired
    private final FacilityRepository facilityRepository;

    public Subscription addSubscription(SubscriptionRequest request) {
        Consumer consumer = consumerRepository.findById(request.getConsumerId()).orElseThrow(() -> new IllegalArgumentException(String.format("Consumer with ID %s doesn't exist", request.getConsumerId())));

        Facility facility = facilityRepository.findById(request.getFacilityId()).orElseThrow(() -> new IllegalArgumentException(String.format("Facility with ID %s doesn't exist", request.getFacilityId())));

        Subscription subscription = new Subscription();
        subscription.setConsumer(consumer);
        subscription.setFacility(facility);
        subscription.setStatus(request.getStatus());
        subscription.setCreatedAt(request.getCreatedAt());

        return subscriptionRepository.save(subscription);
    }

    public Subscription getSubscription(Integer subscriptionId) {
        return subscriptionRepository.findById(subscriptionId).orElseThrow(() -> new IllegalArgumentException(String.format("Subscription with ID %s doesn't exist", subscriptionId)));
    }

    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public List<Subscription> getConsumerSubscriptions(Integer consumerId) {
        return subscriptionRepository.getAllByConsumerId(consumerId);
    }
}
