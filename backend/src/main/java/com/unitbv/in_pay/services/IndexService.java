package com.unitbv.in_pay.services;

import com.unitbv.in_pay.entities.Index;
import com.unitbv.in_pay.entities.Subscription;
import com.unitbv.in_pay.repositories.IndexRepository;
import com.unitbv.in_pay.repositories.SubscriptionRepository;
import com.unitbv.in_pay.request.IndexRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Service
public class IndexService {
    @Autowired
    private final IndexRepository indexRepository;

    @Autowired
    private final SubscriptionRepository subscriptionRepository;

    public ResponseEntity<?> addIndex(IndexRequest request) {
        long diffInDays = -999L;

        Subscription subscription = subscriptionRepository.findById(request.getSubscriptionId()).orElseThrow(() -> new IllegalArgumentException(String.format("Subscription with ID %s doesn't exist", request.getSubscriptionId())));

        Index lastIndex = indexRepository.findTopBySubscriptionOrderByCreatedAtDesc(subscription);

        if (lastIndex != null) {
            if (request.getReadingValue() - lastIndex.getReadingValue() <= 0) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Index reading value is too small compared to last reading value!"));
            }

            diffInDays = (request.getCreatedAt().getTime() - lastIndex.getCreatedAt().getTime()) / (24 * 60 * 60 * 1000);
        }

        if (lastIndex != null && (diffInDays < 21)) {
            return ResponseEntity
                    .ok(updateIndex(lastIndex.getIndexId(), request));
        } else {
            Index index = new Index();
            index.setSubscription(subscription);
            index.setReadingValue(request.getReadingValue());
            index.setCreatedAt(request.getCreatedAt());
            return ResponseEntity.ok(indexRepository.save(index));
        }
    }

    public Index getIndex(Integer indexId) {
        return indexRepository.findById(indexId).orElseThrow(() -> new IllegalArgumentException(String.format("Index with ID %s doesn't exist", indexId)));
    }

    public ResponseEntity<?> getLast2Indexes(Integer subscriptionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId).orElseThrow(() -> new IllegalArgumentException(String.format("Subscription with ID %s doesn't exist", subscriptionId)));

        List<Index> last2Indexes = indexRepository.findTop2BySubscriptionOrderByCreatedAtDesc(subscription);

        if  (last2Indexes.size() < 2) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Not found at least 2 indexes!"));
        } else {
            return ResponseEntity.ok(last2Indexes);
        }
    }

    public Index updateIndex(Integer indexId, IndexRequest request) {
        Index indexToUpdate = indexRepository.findById(indexId).orElseThrow(() -> new IllegalStateException(String.format("Index with ID %s doesn't exist", indexId)));
        Subscription subscription = subscriptionRepository.findById(request.getSubscriptionId()).orElseThrow(() -> new IllegalArgumentException(String.format("Subscription with ID %s doesn't exist", request.getSubscriptionId())));

        indexToUpdate.setReadingValue(request.getReadingValue());
        indexToUpdate.setSubscription(subscription);
        indexToUpdate.setCreatedAt(request.getCreatedAt());

        return indexRepository.save(indexToUpdate);
    }
}
