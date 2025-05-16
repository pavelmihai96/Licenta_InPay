package com.unitbv.in_pay.repositories;

import com.unitbv.in_pay.entities.Index;
import com.unitbv.in_pay.entities.Invoice;
import com.unitbv.in_pay.entities.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IndexRepository extends JpaRepository<Index, Integer> {
    Index findTopBySubscriptionOrderByCreatedAtDesc(Subscription subscription);

    List<Index> findTop2BySubscriptionOrderByCreatedAtDesc(Subscription subscription);
}
