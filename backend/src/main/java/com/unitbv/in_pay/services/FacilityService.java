package com.unitbv.in_pay.services;

import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.Provider;
import com.unitbv.in_pay.entities.Subscription;
import com.unitbv.in_pay.repositories.FacilityRepository;
import com.unitbv.in_pay.repositories.ProviderRepository;
import com.unitbv.in_pay.repositories.SubscriptionRepository;
import com.unitbv.in_pay.request.FacilityRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@Service
public class FacilityService {
    @Autowired
    private final FacilityRepository facilityRepository;

    @Autowired
    private final ProviderRepository providerRepository;

    @Autowired
    private final SubscriptionRepository subscriptionRepository;

    public Facility addFacility(FacilityRequest request) {
        Provider provider = providerRepository.findById(request.getProviderId()).orElseThrow(() -> new IllegalArgumentException(String.format("Provider with ID %s doesn't exist", request.getProviderId())));

        Facility facility = new Facility();
        facility.setFacilityName(request.getFacilityName());
        facility.setProvider(provider);
        facility.setType(request.getType());
        facility.setCreatedAt(request.getCreatedAt());

        return facilityRepository.save(facility);
    }

    public Facility getFacility(Integer facilityId) {
        return facilityRepository.findById(facilityId).orElseThrow(() -> new IllegalArgumentException(String.format("Facility with ID %s doesn't exist", facilityId)));
    }

    public List<Facility> getAllFacilities(Integer consumerId) {
        List<Facility> facilities =  facilityRepository.findAll();
        List<Subscription> subscriptions = subscriptionRepository.getAllByConsumerId(consumerId);
        Set<Facility> facilitiesSet = new HashSet<>();

        for (Facility f : facilities) {
            for (Subscription s: subscriptions) {
                if (Objects.equals(s.getFacility().getFacilityId(), f.getFacilityId())){
                    facilitiesSet.add(f);
                }
            }
        }

        facilities.removeAll(facilitiesSet);
        return facilities;
    }

    public List<Facility> getProviderFacilities(Integer providerId) {
        return facilityRepository.getAllByProviderId(providerId);
    }

    public Facility updateFacility(Integer facilityId, Facility facility) {
        Facility facilityToUpdate = facilityRepository.findById(facilityId).orElseThrow(() -> new IllegalStateException(String.format("Course with ID %s doesn't exist", facilityId)));

        facilityToUpdate.setFacilityName(facility.getFacilityName());
        facilityToUpdate.setType(facility.getType());
        facilityToUpdate.setProvider(facility.getProvider());


        return facilityRepository.save(facilityToUpdate);
    }

    public void deleteFacility(Integer facilityId) {
        if (!facilityRepository.existsById(facilityId)) {
            throw new IllegalStateException(String.format("Facility with ID %s doesn't exist", facilityId));
        }
        facilityRepository.deleteById(facilityId);
    }
}
