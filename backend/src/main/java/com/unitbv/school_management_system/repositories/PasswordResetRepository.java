package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.PasswordReset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetRepository extends JpaRepository<PasswordReset, Integer> {
}
