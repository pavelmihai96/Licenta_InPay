package com.unitbv.in_pay.services.facilities;

import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.facilities.Internet;
import com.unitbv.in_pay.entities.facilities.MobileService;
import com.unitbv.in_pay.repositories.FacilityRepository;
import com.unitbv.in_pay.repositories.facilities.InternetRepository;
import com.unitbv.in_pay.repositories.facilities.MobileServiceRepository;
import com.unitbv.in_pay.request.facilities.InternetRequest;
import com.unitbv.in_pay.request.facilities.MobileServiceRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class MobileServiceService {
    @Autowired
    private final MobileServiceRepository mobileServiceRepository;

    @Autowired
    private FacilityRepository facilityRepository;

    public MobileService addMobileService(MobileServiceRequest request) {
        Facility facility = facilityRepository.findById(request.getFacilityId())
                .orElseThrow(() -> new RuntimeException("This facility doesn't exist"));

        boolean isAlready = mobileServiceRepository.existsByFacility(facility);
        if (isAlready) {
            throw new RuntimeException("This facility is already present in the database.");
        }

        MobileService mobileService = new MobileService();
        mobileService.setFacility(facility);
        mobileService.setPrice(request.getPrice());

        return mobileServiceRepository.save(mobileService);
    }

    public MobileService getMobileServiceByFacilityId(Integer facilityId) {
        return mobileServiceRepository.findMobileServiceByFacilityId(facilityId);
    }
}
