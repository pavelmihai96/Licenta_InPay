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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.List;

@AllArgsConstructor
@Service
public class ProviderService {
    @Autowired
    private final ProviderRepository providerRepository;

    public ResponseEntity<?> addProvider(ProviderRequest request) {

        if (providerRepository.existsByCompanyNameAndServiceAreaAndFacilityNameAndType(
                request.getCompanyName(), request.getServiceArea(), request.getFacilityName(), request.getType()
        ) || providerRepository.existsByContractId(request.getContractId())) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "A provider with this ID already exists."));
        } else {
            Provider provider = new Provider();
            provider.setContractId(request.getContractId());
            provider.setCompanyName(request.getCompanyName());
            provider.setServiceArea(request.getServiceArea());
            provider.setFacilityName(request.getFacilityName());
            provider.setType(request.getType());
            provider.setPrice(request.getPrice());
            provider.setCreatedAt(request.getCreatedAt());

            return ResponseEntity.ok().body(providerRepository.save(provider));
        }
    }

    public Provider getProvider(Integer providerId) {
        return providerRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("This provider doesn't exist"));
    }

    public Provider getProviderByContractId(Integer contractId) {
        return providerRepository.getProviderByContractId(contractId);
    }

    public List<Provider> getAllProviders() {
        return providerRepository.findAll();
    }
}
