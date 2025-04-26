package com.unitbv.in_pay.controllers;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Provider;
import com.unitbv.in_pay.request.ConsumerRequest;
import com.unitbv.in_pay.request.ProviderRequest;
import com.unitbv.in_pay.services.ConsumerService;
import com.unitbv.in_pay.services.ProviderService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("api/provider")
public class ProviderController {
    @Autowired
    private final ProviderService providerService;

    @PostMapping
    public Provider addProvider(@RequestBody ProviderRequest request) {
        return providerService.addProvider(request);
    }

    @GetMapping("/by-userId/{userId}")
    public Provider getProviderByUserId(@PathVariable Integer userId) {
        return providerService.getProviderByUserId(userId);
    }

    @GetMapping("/{providerId}")
    public Provider getProvider(@PathVariable Integer providerId) {
        return providerService.getProvider(providerId);
    }
}
