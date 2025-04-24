package com.unitbv.in_pay.repositories;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsumerRepository extends JpaRepository<Consumer, Integer> {
    boolean existsByUser(User user);
}
