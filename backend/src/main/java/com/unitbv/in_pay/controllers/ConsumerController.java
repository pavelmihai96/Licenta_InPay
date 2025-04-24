package com.unitbv.in_pay.controllers;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.request.ConsumerRequest;
import com.unitbv.in_pay.services.ConsumerService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("api/consumer")
public class ConsumerController {
    @Autowired
    private final ConsumerService consumerService;

    @PostMapping
    public Consumer addConsumer(@RequestBody ConsumerRequest request) {
        return consumerService.addConsumer(request);
    }
}
