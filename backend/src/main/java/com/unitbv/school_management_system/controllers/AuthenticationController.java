package com.unitbv.school_management_system.controllers;

import com.unitbv.school_management_system.authdtos.CredentialsDto;
import com.unitbv.school_management_system.authdtos.SignUpDto;
import com.unitbv.school_management_system.config.UserAuthenticationProvider;
import com.unitbv.school_management_system.entities.User;
import com.unitbv.school_management_system.repositories.UserRepository;
import com.unitbv.school_management_system.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthenticationController {

    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;
    private final UserRepository userRepository;


    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        User user = userService.login(credentialsDto);

        user.setToken(userAuthenticationProvider.createToken(user)); //once logged in, return a fresh, new JWT
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody @Valid SignUpDto signUpDto) {
        User user = userService.register(signUpDto);
        System.out.println(signUpDto);

        user.setToken(userAuthenticationProvider.createToken(user)); //once registered in, return a fresh, new JWT
        return ResponseEntity.created(URI.create("/users/" + user.getUserId())).body(user);
    }
}
