package com.unitbv.school_management_system.controllers;

import com.unitbv.school_management_system.entities.PasswordReset;
import com.unitbv.school_management_system.services.PasswordResetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/password-reset")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    public PasswordResetController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

    @PostMapping
    public PasswordReset requestPasswordReset(@RequestBody PasswordReset passwordReset) {
        return passwordResetService.createPasswordReset(passwordReset);
    }

    @GetMapping("/{passwordResetId}")
    public PasswordReset getPasswordReset(@PathVariable Integer passwordResetId) {
        return passwordResetService.getPasswordReset(passwordResetId);
    }

    @GetMapping
    public List<PasswordReset> getPasswordResetRequests() {
        return passwordResetService.getAllPasswordResets();
    }

    @PutMapping("/{passwordResetId}")
    public PasswordReset updatePasswordReset(@PathVariable Integer passwordResetId, @RequestBody PasswordReset passwordReset) {
        return passwordResetService.updatePasswordReset(passwordResetId, passwordReset);
    }

    @DeleteMapping("/{passwordResetId}")
    public void deletePasswordReset(@PathVariable Integer passwordResetId) {
        passwordResetService.deletePasswordReset(passwordResetId);
    }
}
