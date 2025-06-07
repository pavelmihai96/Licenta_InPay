package com.unitbv.in_pay.controllers;

import com.unitbv.in_pay.entities.Invoice;
import com.unitbv.in_pay.request.InvoiceRequest;
import com.unitbv.in_pay.request.PDFRequest;
import com.unitbv.in_pay.request.StripeResponse;
import com.unitbv.in_pay.services.InvoiceService;
import com.unitbv.in_pay.services.StripeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/invoice")
public class InvoiceController {
    @Autowired
    private final InvoiceService invoiceService;

    @Autowired
    private StripeService stripeService;

    @GetMapping("/{invoiceId}")
    public Invoice getInvoice(@PathVariable Integer invoiceId) {
        return invoiceService.getInvoice(invoiceId);
    }

    @GetMapping("/by-consumerId/{consumerId}")
    public List<Invoice> getAllInvoicesByConsumerId(@PathVariable Integer consumerId) {
        return invoiceService.getAllInvoicesByConsumerId(consumerId);
    }

    @GetMapping("/by-consumerId/unpaid/{consumerId}")
    public List<Invoice> getAllInvoicesByConsumerIdUnpaid(@PathVariable Integer consumerId) {
        return invoiceService.getAllInvoicesByConsumerIdUnpaid(consumerId);
    }

    @GetMapping("/by-subscriptionId/{subscriptionId}")
    public List<Invoice> getAllInvoicesBySubscriptionId(@PathVariable Integer subscriptionId) {
        return invoiceService.getAllInvoicesBySubscriptionId(subscriptionId);
    }

    @PutMapping("/{invoiceId}")
    public Invoice updateInvoiceStatus(@PathVariable Integer invoiceId) {
        return invoiceService.updateInvoiceStatus(invoiceId);
    }

    @PostMapping("/checkout/{userId}")
    public ResponseEntity<StripeResponse> payInvoice(@PathVariable Integer userId, @RequestBody InvoiceRequest invoiceRequest) {
        StripeResponse stripeResponse = stripeService.payInvoice(userId, invoiceRequest);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(stripeResponse);
    }

    @PostMapping("/pdf/{invoiceId}")
    public ResponseEntity<byte[]> generatePDF(@PathVariable Integer invoiceId) throws IOException {
        byte[] invoicePDF = invoiceService.generatePDF(invoiceId);

        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=INV{invoiceId}.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(invoicePDF);
    }
}
