package com.unitbv.in_pay.services.facilities;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.entities.User;
import com.unitbv.in_pay.entities.facilities.Electricity;
import com.unitbv.in_pay.repositories.ConsumerRepository;
import com.unitbv.in_pay.repositories.FacilityRepository;
import com.unitbv.in_pay.repositories.UserRepository;
import com.unitbv.in_pay.repositories.facilities.ElectricityRepository;
import com.unitbv.in_pay.request.ConsumerRequest;
import com.unitbv.in_pay.request.facilities.ElectricityRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ElectricityService {
    @Autowired
    private final ElectricityRepository electricityRepository;

    @Autowired
    private FacilityRepository facilityRepository;

    public Electricity addElectricity(ElectricityRequest request) {
        Facility facility = facilityRepository.findById(request.getFacilityId())
                .orElseThrow(() -> new RuntimeException("This facility doesn't exist"));

        boolean isAlready = electricityRepository.existsByFacility(facility);
        if (isAlready) {
            throw new RuntimeException("This facility is already present in the database.");
        }

        Electricity electricity = new Electricity();
        electricity.setFacility(facility);
        electricity.setPrice(request.getPrice());

        return electricityRepository.save(electricity);
    }

    public Electricity getElectricityByFacilityId(Integer facilityId) {
        return electricityRepository.findElectricityByFacilityId(facilityId);
    }
}
