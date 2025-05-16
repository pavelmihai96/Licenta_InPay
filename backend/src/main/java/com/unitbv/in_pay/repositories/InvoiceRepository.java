package com.unitbv.in_pay.repositories;

import com.unitbv.in_pay.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    boolean existsBySubscriptionAndStartAndEnd(Subscription subscription, Index index1, Index index2);

    @Query("select i from Invoice i join Subscription s on i.subscription.subscriptionId = s.subscriptionId where s.consumer.consumerId = ?1")
    List<Invoice> getAllInvoicesByConsumerId(Integer consumerId);

    Invoice findTopBySubscriptionOrderByCreatedAtDesc(Subscription subscription);
}
