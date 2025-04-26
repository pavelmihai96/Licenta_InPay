package com.unitbv.in_pay.controllers.facilities;

import com.unitbv.in_pay.entities.facilities.Gas;
import com.unitbv.in_pay.entities.facilities.Internet;
import com.unitbv.in_pay.request.facilities.GasRequest;
import com.unitbv.in_pay.request.facilities.InternetRequest;
import com.unitbv.in_pay.services.facilities.GasService;
import com.unitbv.in_pay.services.facilities.InternetService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("api/internet")
public class InternetController {
    @Autowired
    private final InternetService internetService;

    @PostMapping
    public Internet addInternet(@RequestBody InternetRequest request) {
        return internetService.addInternet(request);
    }

    @GetMapping("/by-facilityId/{facilityId}")
    public Internet getInternetByFacilityId(@PathVariable Integer facilityId) {
        return internetService.getInternetByFacilityId(facilityId);
    }
}
