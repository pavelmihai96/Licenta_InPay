package com.unitbv.in_pay.services;

import com.unitbv.in_pay.authdtos.CredentialsDto;
import com.unitbv.in_pay.authdtos.SignUpDto;
import com.unitbv.in_pay.config.UserAuthenticationProvider;
import com.unitbv.in_pay.entities.User;
import com.unitbv.in_pay.exceptions.AppException;
//import com.unitbv.school_management_system.mappers.UserMapper;
import com.unitbv.in_pay.mappers.UserMapper;
import com.unitbv.in_pay.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public User findByEmail(String login) {
        User user = userRepository.findByEmail(login);
        return user;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUser(Integer userId) {
        return userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException(String.format("User with ID %s doesn't exist", userId)));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Integer userId, User user) {
        User userToUpdate = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException(String.format("User with ID %s doesn't exist", userId)));

        userToUpdate.setEmail(user.getEmail());
        //userToUpdate.setUsername(user.getUsername());
        userToUpdate.setPassword(user.getPassword());
        userToUpdate.setRole(user.getRole());

        return userRepository.save(userToUpdate);
    }


    public void deleteUser(Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalStateException(String.format("User with ID %s doesn't exist", userId));
        }
        userRepository.deleteById(userId);
    }

    //auth functions
    public User login(CredentialsDto credentialsDto) {
        User user = userRepository.findByEmail(credentialsDto.getEmail());

        if (user != null && (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword()))) {
            return user;
        }

        return null;
    }

    public User register(SignUpDto userDto) {
        User optionalUser = userRepository.findByEmail(userDto.getEmail());

        if (optionalUser != null) {
            return null;
        }

        User user = userMapper.signUpToUser(userDto);
        System.out.println(user.toString());
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        User savedUser = userRepository.save(user);
        return savedUser;
    }
}
