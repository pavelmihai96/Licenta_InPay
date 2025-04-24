package com.unitbv.in_pay.controllers;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Provider;
import com.unitbv.in_pay.request.ConsumerRequest;
import com.unitbv.in_pay.services.ConsumerService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{userId}")
    public Consumer getConsumer(@PathVariable Integer userId) {
        return consumerService.getConsumer(userId);
    }
}
