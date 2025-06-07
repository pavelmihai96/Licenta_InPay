package com.unitbv.in_pay.services;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Invoice;
import com.unitbv.in_pay.entities.Provider;
import com.unitbv.in_pay.entities.Subscription;
import com.unitbv.in_pay.repositories.*;
import com.unitbv.in_pay.request.SubscriptionRequest;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class SubscriptionService {
    @Autowired
    private final SubscriptionRepository subscriptionRepository;

    @Autowired
    private final ConsumerRepository consumerRepository;

    @Autowired
    private final ProviderRepository providerRepository;

    @Autowired
    private final ClientInfoRepository clientInfoRepository;

    @Autowired
    private final InvoiceRepository invoiceRepository;

    @Autowired
    private final InvoiceInfoRepository invoiceInfoRepository;

    @Autowired
    private final EmailService emailService;

    @Autowired
    private final InvoiceService invoiceService;

    public ResponseEntity<?> addSubscription(SubscriptionRequest request) {
        Consumer consumer = consumerRepository.findById(request.getConsumerId()).orElseThrow(() -> new IllegalArgumentException(String.format("Consumer with ID %s doesn't exist", request.getConsumerId())));
        Provider provider = providerRepository.findById(request.getProviderId()).orElseThrow(() -> new IllegalArgumentException(String.format("Provider with ID %s doesn't exist", request.getProviderId())));

        if (subscriptionRepository.existsByProviderAndClientIdAndContractId(provider, request.getClientId(), request.getContractId())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "This subscription already exists with this client ID and contract ID."));
        }

        Subscription subscription = new Subscription();
        subscription.setConsumer(consumer);
        subscription.setProvider(provider);
        subscription.setClientId(request.getClientId());
        subscription.setContractId(request.getContractId());
        subscription.setStatus(request.getStatus());
        subscription.setCreatedAt(request.getCreatedAt());
        subscriptionRepository.save(subscription);

        List<Invoice> listI = invoiceInfoRepository.loadInvoicesBySubscription(subscription);

        if (!listI.isEmpty()) {
            listI.forEach(invoice -> {
                invoiceRepository.save(invoice);
                try {
                    emailService.sendInvoiceEmail("pavelmihailungu@gmail.com", "Invoice", "This is an invoice", invoiceService.generatePDF(invoice.getInvoiceId()));
                } catch (MessagingException | IOException e) {
                    throw new RuntimeException(e);
                }
            });
        }

        return listI.isEmpty() ? ResponseEntity.ok().body("Subscription was added but you currently have no invoices.") : ResponseEntity.ok().body("Subscription was added, please check your invoices.");
    }

    public Subscription getSubscription(Integer subscriptionId) {
        return subscriptionRepository.findById(subscriptionId).orElseThrow(() -> new IllegalArgumentException(String.format("Subscription with ID %s doesn't exist", subscriptionId)));
    }

    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public List<Subscription> getConsumerSubscriptions(Integer consumerId) {
        return subscriptionRepository.getAllByConsumerId(consumerId);
    }

    public Subscription getSubscriptionByConsumerIdAndProviderId(Integer consumerId, Integer providerId) {
        return subscriptionRepository.getSubscriptionByConsumerIdAndProviderId(consumerId, providerId);
    }
}
