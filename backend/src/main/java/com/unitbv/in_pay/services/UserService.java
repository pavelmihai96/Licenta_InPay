package com.unitbv.in_pay.services;

import com.unitbv.in_pay.authdtos.CredentialsDto;
import com.unitbv.in_pay.authdtos.SignUpDto;
import com.unitbv.in_pay.entities.User;
import com.unitbv.in_pay.exceptions.AppException;
//import com.unitbv.school_management_system.mappers.UserMapper;
import com.unitbv.in_pay.mappers.UserMapper;
import com.unitbv.in_pay.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public User findByUsername(String login) {
        User user = userRepository.findByEmail(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
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
        userToUpdate.setUsername(user.getUsername());
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
        User user = userRepository.findByEmail(credentialsDto.getEmail())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return user;
        }

        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public User register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getUsername());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);
        System.out.println(user.toString());
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        User savedUser = userRepository.save(user);
        return savedUser;
    }
}
