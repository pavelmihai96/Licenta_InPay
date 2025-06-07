package com.unitbv.in_pay.repositories;

import com.unitbv.in_pay.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    @Query("select i from Invoice i join Subscription s on i.subscription.subscriptionId = s.subscriptionId where s.consumer.consumerId = ?1")
    List<Invoice> getAllInvoicesByConsumerId(Integer consumerId);

    @Query("select i from Invoice i join Subscription s on i.subscription.subscriptionId = s.subscriptionId where s.consumer.consumerId = ?1 and i.status='UNPAID'")
    List<Invoice> getAllInvoicesByConsumerIdUnpaid(Integer consumerId);

    @Query("select i from Invoice i where i.subscription.subscriptionId = ?1")
    List<Invoice> getAllInvoicesBySubscriptionId(Integer subscriptionId);

    Invoice findTopBySubscriptionOrderByCreatedAtDesc(Subscription subscription);

    @Query("select i from Invoice i where i.idFromProvider = ?1 and i.clientId = ?2")
    Optional<Invoice> getInvoiceByIdFromProviderAndClientId(Integer idFromProvider, Integer clientId);
}
