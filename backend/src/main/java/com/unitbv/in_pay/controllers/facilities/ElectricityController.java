package com.unitbv.in_pay.controllers.facilities;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Provider;
import com.unitbv.in_pay.entities.facilities.Electricity;
import com.unitbv.in_pay.request.ConsumerRequest;
import com.unitbv.in_pay.request.facilities.ElectricityRequest;
import com.unitbv.in_pay.services.ConsumerService;
import com.unitbv.in_pay.services.facilities.ElectricityService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("api/electricity")
public class ElectricityController {
    @Autowired
    private final ElectricityService electricityService;

    @PostMapping
    public Electricity addElectricity(@RequestBody ElectricityRequest request) {
        return electricityService.addElectricity(request);
    }

    @GetMapping("/by-facilityId/{facilityId}")
    public Electricity getElectricityByFacilityId(@PathVariable Integer facilityId) {
        return electricityService.getElectricityByFacilityId(facilityId);
    }
}
