package com.unitbv.in_pay.controllers;

import com.unitbv.in_pay.entities.Facility;
import com.unitbv.in_pay.request.FacilityRequest;
import com.unitbv.in_pay.services.FacilityService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/facility")
public class FacilityController {
    @Autowired
    private final FacilityService facilityService;

    @PostMapping
    public Facility addFacility(@RequestBody FacilityRequest facility) {
        return facilityService.addFacility(facility);
    }

    @GetMapping("/{facilityId}")
    public Facility getFacility(@PathVariable Integer facilityId) {
        return facilityService.getFacility(facilityId);
    }

    @GetMapping
    public List<Facility> getFacilities() {
        return facilityService.getAllFacilities();
    }

    @GetMapping("/all/{providerId}")
    public List<Facility> getProviderFacilities(@PathVariable Integer providerId) {
        return facilityService.getProviderFacilities(providerId);
    }

    @PutMapping("/{facilityId}")
    public Facility updateFacility(@PathVariable Integer facilityId, @RequestBody Facility facility) {
        return facilityService.updateFacility(facilityId, facility);
    }

    @DeleteMapping("/{facilityId}")
    public void deleteFacility(@PathVariable Integer facilityId) {
        facilityService.deleteFacility(facilityId);
    }
}
