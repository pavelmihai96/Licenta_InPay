package com.unitbv.in_pay.services;

import com.unitbv.in_pay.entities.*;
import com.unitbv.in_pay.repositories.*;
import com.unitbv.in_pay.request.InvoiceRequestNoIndex;
import com.unitbv.in_pay.request.InvoiceRequestWithIndex;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Service
public class InvoiceService {
    @Autowired
    private final InvoiceRepository invoiceRepository;

    @Autowired
    private final SubscriptionRepository subscriptionRepository;

    @Autowired
    private final IndexRepository indexRepository;

    public ResponseEntity<?> addInvoiceWithIndex(InvoiceRequestWithIndex request) {
        Subscription subscription = subscriptionRepository.findById(request.getSubscriptionId()).orElseThrow(() -> new IllegalArgumentException(String.format("Subscription with ID %s doesn't exist", request.getSubscriptionId())));

        Index index1 = indexRepository.findById(request.getStartId()).orElseThrow(() -> new IllegalArgumentException(String.format("Index with ID %s doesn't exist", request.getStartId())));

        Index index2 = indexRepository.findById(request.getEndId()).orElseThrow(() -> new IllegalArgumentException(String.format("Index with ID %s doesn't exist", request.getEndId())));

        boolean existsAlready = invoiceRepository.existsBySubscriptionAndStartAndEnd(subscription, index1, index2);

        if (existsAlready) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "This invoice is already present in the database."));
        }

        Invoice invoice = new Invoice();
        invoice.setSubscription(subscription);
        invoice.setStart(index1);
        invoice.setEnd(index2);
        invoice.setAmount(request.getAmount());
        invoice.setStatus(request.getStatus());
        invoice.setCreatedAt(request.getCreatedAt());

        return ResponseEntity.ok(invoiceRepository.save(invoice));
    }

    public ResponseEntity<?> addInvoiceNoIndex(InvoiceRequestNoIndex request) {
        Subscription subscription = subscriptionRepository.findById(request.getSubscriptionId()).orElseThrow(() -> new IllegalArgumentException(String.format("Subscription with ID %s doesn't exist", request.getSubscriptionId())));

        Invoice lastInvoice = invoiceRepository.findTopBySubscriptionOrderByCreatedAtDesc(subscription);

        // daca exista o factura pe un subscriptionId, si se incearca adaugare uneia noi fara sa fi trecut cel putin 21 de zile
        // atunci nu o sa se adauge o factura noua in baza de date
        if (lastInvoice != null && ((request.getCreatedAt().getTime() - lastInvoice.getCreatedAt().getTime()) / (24 * 60 * 60 * 1000) < 21)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "It is too early to generate another invoice for this facility."));
        }

        Invoice invoice = new Invoice();
        invoice.setSubscription(subscription);
        invoice.setAmount(request.getAmount());
        invoice.setStatus(request.getStatus());
        invoice.setCreatedAt(request.getCreatedAt());

        return ResponseEntity.ok(invoiceRepository.save(invoice));
    }

    public Invoice getInvoice(Integer invoiceId) {
        return invoiceRepository.findById(invoiceId).orElseThrow(() -> new IllegalArgumentException(String.format("Invoice with ID %s doesn't exist", invoiceId)));
    }

    public List<Invoice> getAllInvoicesByConsumerId(Integer consumerId) {
        return invoiceRepository.getAllInvoicesByConsumerId(consumerId);
    }
}
