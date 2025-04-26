package com.unitbv.in_pay.services.facilities;

import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.facilities.Gas;
import com.unitbv.in_pay.entities.facilities.Internet;
import com.unitbv.in_pay.repositories.FacilityRepository;
import com.unitbv.in_pay.repositories.facilities.GasRepository;
import com.unitbv.in_pay.repositories.facilities.InternetRepository;
import com.unitbv.in_pay.request.facilities.GasRequest;
import com.unitbv.in_pay.request.facilities.InternetRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class InternetService {
    @Autowired
    private final InternetRepository internetRepository;

    @Autowired
    private FacilityRepository facilityRepository;

    public Internet addInternet(InternetRequest request) {
        Facility facility = facilityRepository.findById(request.getFacilityId())
                .orElseThrow(() -> new RuntimeException("This facility doesn't exist"));

        boolean isAlready = internetRepository.existsByFacility(facility);
        if (isAlready) {
            throw new RuntimeException("This facility is already present in the database.");
        }

        Internet internet = new Internet();
        internet.setFacility(facility);
        internet.setPrice(request.getPrice());

        return internetRepository.save(internet);
    }

    public Internet getInternetByFacilityId(Integer facilityId) {
        return internetRepository.findInternetByFacilityId(facilityId);
    }
}
