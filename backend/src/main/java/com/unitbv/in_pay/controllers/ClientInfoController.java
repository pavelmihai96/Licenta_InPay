package com.unitbv.in_pay.controllers;

import com.unitbv.in_pay.mappers.ClientInfo;
import com.unitbv.in_pay.request.ClientInfoRequest;
import com.unitbv.in_pay.services.ClientInfoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/clientinfo")
public class ClientInfoController {
    @Autowired
    private final ClientInfoService clientInfoService;

    @GetMapping("/{contractId}")
    public List<ClientInfo> getAllClientInfoByProviderId(@PathVariable Integer contractId) {
        return clientInfoService.getAllClientInfoByProviderId(contractId);
    }

    @PostMapping("/{contractId}")
    public ResponseEntity<?> checkClientInfo(@PathVariable Integer contractId, @RequestBody ClientInfoRequest request) {
        return ResponseEntity.ok().body(clientInfoService.checkClientInfo(contractId, request));
    }
}
