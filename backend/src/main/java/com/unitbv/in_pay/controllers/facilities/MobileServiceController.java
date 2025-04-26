package com.unitbv.in_pay.controllers.facilities;

import com.unitbv.in_pay.entities.facilities.Internet;
import com.unitbv.in_pay.entities.facilities.MobileService;
import com.unitbv.in_pay.request.facilities.InternetRequest;
import com.unitbv.in_pay.request.facilities.MobileServiceRequest;
import com.unitbv.in_pay.services.facilities.InternetService;
import com.unitbv.in_pay.services.facilities.MobileServiceService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("api/mobileservice")
public class MobileServiceController {
    @Autowired
    private final MobileServiceService mobileServiceService;

    @PostMapping
    public MobileService addMobileService(@RequestBody MobileServiceRequest request) {
        return mobileServiceService.addMobileService(request);
    }

    @GetMapping("/by-facilityId/{facilityId}")
    public MobileService getMobileServiceByFacilityId(@PathVariable Integer facilityId) {
        return mobileServiceService.getMobileServiceByFacilityId(facilityId);
    }
}
