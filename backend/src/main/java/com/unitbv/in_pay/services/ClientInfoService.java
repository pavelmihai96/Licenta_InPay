package com.unitbv.in_pay.services;

import com.unitbv.in_pay.mappers.ClientInfo;
import com.unitbv.in_pay.repositories.ClientInfoRepository;
import com.unitbv.in_pay.request.ClientInfoRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ClientInfoService {
    @Autowired
    private final ClientInfoRepository clientInfoRepository;

    public List<ClientInfo> getAllClientInfoByProviderId(Integer contractId) {
        return clientInfoRepository.loadClientInfoByProviderId(contractId);
    }

    public ResponseEntity<?> checkClientInfo(Integer contractId, ClientInfoRequest request) {
        return ResponseEntity.ok().body(clientInfoRepository.checkClientInfo(contractId, request));
    }
}
