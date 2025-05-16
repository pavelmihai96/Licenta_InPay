package com.unitbv.in_pay.controllers;

import com.unitbv.in_pay.entities.Index;
import com.unitbv.in_pay.request.IndexRequest;
import com.unitbv.in_pay.services.IndexService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("api/index")
public class IndexController {
    @Autowired
    private final IndexService indexService;

    @PostMapping
    public ResponseEntity<?> addIndex(@RequestBody IndexRequest index) {
        return indexService.addIndex(index);
    }

    @GetMapping("/{indexId}")
    public Index getIndex(@PathVariable Integer indexId) {
        return indexService.getIndex(indexId);
    }

    @GetMapping("/by-subscription/{subscriptionId}")
    public ResponseEntity<?> getLast2Indexes(@PathVariable Integer subscriptionId) {
        return indexService.getLast2Indexes(subscriptionId);
    }
}
