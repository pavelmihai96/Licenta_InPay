package com.unitbv.school_management_system.services;

import com.unitbv.school_management_system.entities.PasswordReset;
import com.unitbv.school_management_system.repositories.PasswordResetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordResetService {

    private final PasswordResetRepository passwordResetRepository;

    public PasswordResetService(PasswordResetRepository passwordResetRepository) {
        this.passwordResetRepository = passwordResetRepository;
    }

    public PasswordReset createPasswordReset(PasswordReset passwordReset) {
        return passwordResetRepository.save(passwordReset);
    }

    public PasswordReset getPasswordReset(Integer resetId) {
        return passwordResetRepository.findById(resetId).orElseThrow(() -> new IllegalArgumentException(String.format("Password reset with ID %s doesn't exist", resetId)));
    }

    public List<PasswordReset> getAllPasswordResets() {
        return passwordResetRepository.findAll();
    }

    public PasswordReset updatePasswordReset(Integer resetId, PasswordReset passwordReset) {
        PasswordReset passwordResetToUpdate = passwordResetRepository.findById(resetId).orElseThrow(() -> new IllegalStateException(String.format("Password reset with ID %s doesn't exist", resetId)));

        passwordResetToUpdate.setUserId(passwordReset.getUserId());
        passwordResetToUpdate.setResetToken(passwordReset.getResetToken());
        passwordResetToUpdate.setExpiresAt(passwordReset.getExpiresAt());

        return passwordResetRepository.save(passwordResetToUpdate);
    }

    public void deletePasswordReset(Integer resetId) {
        if (!passwordResetRepository.existsById(resetId)) {
            throw new IllegalStateException(String.format("Password reset with ID %s doesn't exist", resetId));
        }
        passwordResetRepository.deleteById(resetId);
    }
}
