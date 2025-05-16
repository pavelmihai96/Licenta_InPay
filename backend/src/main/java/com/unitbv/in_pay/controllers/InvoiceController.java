package com.unitbv.in_pay.controllers;

import com.unitbv.in_pay.entities.Invoice;
import com.unitbv.in_pay.request.InvoiceRequestNoIndex;
import com.unitbv.in_pay.request.InvoiceRequestWithIndex;
import com.unitbv.in_pay.services.InvoiceService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/invoice")
public class InvoiceController {
    @Autowired
    private final InvoiceService invoiceService;

    @PostMapping("/with-index")
    public ResponseEntity<?> addInvoiceWithIndex(@RequestBody InvoiceRequestWithIndex invoice) {
        return invoiceService.addInvoiceWithIndex(invoice);
    }

    @PostMapping("/no-index")
    public ResponseEntity<?> addInvoiceNoIndex(@RequestBody InvoiceRequestNoIndex invoice) {
        return invoiceService.addInvoiceNoIndex(invoice);
    }

    @GetMapping("/{invoiceId}")
    public Invoice getInvoice(@PathVariable Integer invoiceId) {
        return invoiceService.getInvoice(invoiceId);
    }

    @GetMapping("/by-consumerId/{consumerId}")
    public List<Invoice> getAllInvoicesByConsumerId(@PathVariable Integer consumerId) {
        return invoiceService.getAllInvoicesByConsumerId(consumerId);
    }
}
