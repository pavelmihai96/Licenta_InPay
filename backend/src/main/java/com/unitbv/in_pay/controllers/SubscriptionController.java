package com.unitbv.in_pay.controllers;

import com.unitbv.in_pay.entities.Subscription;
import com.unitbv.in_pay.request.SubscriptionRequest;
import com.unitbv.in_pay.services.SubscriptionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/subscription")
public class SubscriptionController {
    @Autowired
    private final SubscriptionService subscriptionService;

    @PostMapping
    public ResponseEntity<?> addSubscription(@RequestBody SubscriptionRequest subscription) {
        return subscriptionService.addSubscription(subscription);
    }

    @GetMapping("/{subscriptionId}")
    public Subscription getSubscription(@PathVariable Integer subscriptionId) {
        return subscriptionService.getSubscription(subscriptionId);
    }

    @GetMapping
    public List<Subscription> getSubscriptions() {
        return subscriptionService.getAllSubscriptions();
    }

    @GetMapping("/all/{consumerId}")
    public List<Subscription> getConsumerSubscriptions(@PathVariable Integer consumerId) {
        return subscriptionService.getConsumerSubscriptions(consumerId);
    }

    @GetMapping("/by-ids/{consumerId}/{providerId}")
    public Subscription getSubscriptionByConsumerIdAndProviderId(@PathVariable Integer consumerId, @PathVariable Integer providerId) {
        return subscriptionService.getSubscriptionByConsumerIdAndProviderId(consumerId, providerId);
    }
}
