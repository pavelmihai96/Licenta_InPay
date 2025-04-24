package com.unitbv.in_pay.controllers;

import com.unitbv.in_pay.authdtos.CredentialsDto;
import com.unitbv.in_pay.authdtos.SignUpDto;
import com.unitbv.in_pay.config.UserAuthenticationProvider;
import com.unitbv.in_pay.entities.User;
import com.unitbv.in_pay.repositories.UserRepository;
import com.unitbv.in_pay.services.UserService;
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
        return ResponseEntity.created(URI.create("/users/" + user.getUser_id())).body(user);
    }
}
