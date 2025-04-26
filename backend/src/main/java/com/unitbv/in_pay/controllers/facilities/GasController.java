package com.unitbv.in_pay.controllers.facilities;

import com.unitbv.in_pay.entities.facilities.Electricity;
import com.unitbv.in_pay.entities.facilities.Gas;
import com.unitbv.in_pay.request.facilities.ElectricityRequest;
import com.unitbv.in_pay.request.facilities.GasRequest;
import com.unitbv.in_pay.services.facilities.ElectricityService;
import com.unitbv.in_pay.services.facilities.GasService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("api/gas")
public class GasController {
    @Autowired
    private final GasService gasService;

    @PostMapping
    public Gas addGas(@RequestBody GasRequest request) {
        return gasService.addGas(request);
    }

    @GetMapping("/by-facilityId/{facilityId}")
    public Gas getGasByFacilityId(@PathVariable Integer facilityId) {
        return gasService.getGasByFacilityId(facilityId);
    }
}
