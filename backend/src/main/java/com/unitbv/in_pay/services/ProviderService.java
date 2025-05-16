package com.unitbv.in_pay.services;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Provider;
import com.unitbv.in_pay.entities.User;
import com.unitbv.in_pay.repositories.ConsumerRepository;
import com.unitbv.in_pay.repositories.ProviderRepository;
import com.unitbv.in_pay.repositories.UserRepository;
import com.unitbv.in_pay.request.ConsumerRequest;
import com.unitbv.in_pay.request.ProviderRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ProviderService {
    @Autowired
    private final ProviderRepository providerRepository;

    @Autowired
    private UserRepository userRepository;

    public Provider addProvider(ProviderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("This provider doesn't exist"));

        boolean isAlready = providerRepository.existsByUser(user);
        if (isAlready) {
            throw new RuntimeException("This user is already present in the database.");
        }

        Provider provider = new Provider();
        provider.setUser(user);
        provider.setCompanyName(request.getCompanyName());
        provider.setServiceArea(request.getServiceArea());
        provider.setCreatedAt(request.getCreatedAt());

        return providerRepository.save(provider);
    }

    public Provider getProvider(Integer providerId) {
        return providerRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("This provider doesn't exist"));
    }

    public Provider getProviderByUserId(Integer userId) {
        return providerRepository.findProviderByUserId(userId);
    }
}
