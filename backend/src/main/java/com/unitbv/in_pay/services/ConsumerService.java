package com.unitbv.in_pay.services;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Provider;
import com.unitbv.in_pay.entities.User;
import com.unitbv.in_pay.repositories.ConsumerRepository;
import com.unitbv.in_pay.repositories.UserRepository;
import com.unitbv.in_pay.request.ConsumerRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ConsumerService {
    @Autowired
    private final ConsumerRepository consumerRepository;

    @Autowired
    private UserRepository userRepository;

    public Consumer addConsumer(ConsumerRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("This user doesn't exist"));

        boolean isAlready = consumerRepository.existsByUser(user);
        if (isAlready) {
            throw new RuntimeException("This user is already present in the database.");
        }

        Consumer consumer = new Consumer();
        consumer.setUser(user);
        consumer.setAddress(request.getAddress());
        consumer.setLastName(request.getLastName());
        consumer.setFirstName(request.getFirstName());
        consumer.setCreatedAt(request.getCreatedAt());

        return consumerRepository.save(consumer);
    }

    public Consumer getConsumer(Integer userId) {
        return consumerRepository.findConsumerByUserId(userId);
    }
}
