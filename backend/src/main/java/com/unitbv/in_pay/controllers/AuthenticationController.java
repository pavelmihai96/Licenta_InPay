package com.unitbv.in_pay.controllers;

import com.unitbv.in_pay.authdtos.CredentialsDto;
import com.unitbv.in_pay.authdtos.SignUpDto;
import com.unitbv.in_pay.config.UserAuthenticationProvider;
import com.unitbv.in_pay.entities.User;
import com.unitbv.in_pay.repositories.UserRepository;
import com.unitbv.in_pay.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class AuthenticationController {

    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;
    private final UserRepository userRepository;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        User user = userService.login(credentialsDto);

        if (user != null) {
            user.setToken(userAuthenticationProvider.createToken(user));
            return ResponseEntity.ok().body(user);
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Wrong username or password."));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid SignUpDto signUpDto) {
        User user = userService.register(signUpDto);

        if (user != null) {
            return ResponseEntity.created(URI.create("/users/" + user.getUserId())).body(user);
        } else {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "There is already an account with this email."));
        }

    }
}
