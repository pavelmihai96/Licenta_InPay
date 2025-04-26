package com.unitbv.in_pay.services.facilities;

import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.facilities.Electricity;
import com.unitbv.in_pay.entities.facilities.Gas;
import com.unitbv.in_pay.repositories.FacilityRepository;
import com.unitbv.in_pay.repositories.facilities.ElectricityRepository;
import com.unitbv.in_pay.repositories.facilities.GasRepository;
import com.unitbv.in_pay.request.facilities.ElectricityRequest;
import com.unitbv.in_pay.request.facilities.GasRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class GasService {
    @Autowired
    private final GasRepository gasRepository;

    @Autowired
    private FacilityRepository facilityRepository;

    public Gas addGas(GasRequest request) {
        Facility facility = facilityRepository.findById(request.getFacilityId())
                .orElseThrow(() -> new RuntimeException("This facility doesn't exist"));

        boolean isAlready = gasRepository.existsByFacility(facility);
        if (isAlready) {
            throw new RuntimeException("This facility is already present in the database.");
        }

        Gas gas = new Gas();
        gas.setFacility(facility);
        gas.setPrice(request.getPrice());

        return gasRepository.save(gas);
    }

    public Gas getGasByFacilityId(Integer facilityId) {
        return gasRepository.findGasByFacilityId(facilityId);
    }
}
